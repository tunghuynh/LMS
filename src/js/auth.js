/**
 * Authentication Utilities
 * Quản lý đăng nhập, đăng xuất và session
 */

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.loadCurrentUser();
    }

    /**
     * Đăng nhập người dùng
     */
    async login(username, password, role = null) {
        try {
            const users = await this.loadUsers();
            const user = users.find(u => 
                u.username === username && 
                u.password === password &&
                (role ? u.role === role : true)
            );

            if (user) {
                // Lưu user info vào localStorage
                const userSession = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    fullName: user.fullName,
                    avatar: user.avatar,
                    loginTime: new Date().toISOString()
                };

                localStorage.setItem('currentUser', JSON.stringify(userSession));
                this.currentUser = userSession;

                // Log activity
                this.logActivity('Login', `User ${username} logged in`);
                
                return { success: true, user: userSession };
            } else {
                return { 
                    success: false, 
                    error: role ? 
                        `Sai tên đăng nhập hoặc mật khẩu cho ${role}` : 
                        'Sai tên đăng nhập hoặc mật khẩu' 
                };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Có lỗi xảy ra khi đăng nhập' };
        }
    }

    /**
     * Đăng xuất
     */
    logout() {
        if (this.currentUser) {
            this.logActivity('Logout', `User ${this.currentUser.username} logged out`);
        }
        
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        
        // Chuyển về trang landing
        window.location.href = 'index.html';
    }

    /**
     * Đăng ký user mới
     */
    async register(userData) {
        try {
            const users = await this.loadUsers();
            
            // Kiểm tra username đã tồn tại
            if (users.find(u => u.username === userData.username)) {
                return { success: false, error: 'Tên đăng nhập đã tồn tại' };
            }

            // Kiểm tra email đã tồn tại
            if (users.find(u => u.email === userData.email)) {
                return { success: false, error: 'Email đã được sử dụng' };
            }

            // Tạo user mới
            const newUser = {
                id: Date.now(), // Simple ID generation
                username: userData.username,
                password: userData.password,
                email: userData.email,
                role: userData.role || 'student',
                fullName: userData.fullName,
                avatar: `assets/images/avatar-default.png`,
                goal: '',
                progress: userData.role === 'student' ? { courses: [], quizzes: [] } : {}
            };

            // Lưu vào localStorage (trong thực tế sẽ call API)
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            this.logActivity('Register', `New user ${userData.username} registered`);

            return { success: true, user: newUser };
        } catch (error) {
            console.error('Register error:', error);
            return { success: false, error: 'Có lỗi xảy ra khi đăng ký' };
        }
    }

    /**
     * Load danh sách users từ file hoặc localStorage
     */
    async loadUsers() {
        try {
            // Kiểm tra localStorage trước
            const localUsers = localStorage.getItem('users');
            if (localUsers) {
                return JSON.parse(localUsers);
            }

            // Nếu không có trong localStorage, load từ file mock
            const response = await fetch('data/mock-users.json');
            const users = await response.json();
            
            // Lưu vào localStorage để dùng cho lần sau
            localStorage.setItem('users', JSON.stringify(users));
            
            return users;
        } catch (error) {
            console.error('Error loading users:', error);
            return [];
        }
    }

    /**
     * Load thông tin user hiện tại từ localStorage
     */
    loadCurrentUser() {
        const userStr = localStorage.getItem('currentUser');
        if (userStr) {
            this.currentUser = JSON.parse(userStr);
        }
    }

    /**
     * Kiểm tra user đã đăng nhập chưa
     */
    isLoggedIn() {
        return this.currentUser !== null;
    }

    /**
     * Lấy thông tin user hiện tại
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * Kiểm tra role của user
     */
    hasRole(role) {
        return this.currentUser && this.currentUser.role === role;
    }

    /**
     * Kiểm tra quyền truy cập trang
     */
    checkPageAccess(allowedRoles = ['student', 'teacher', 'admin']) {
        if (!this.isLoggedIn()) {
            window.location.href = 'index.html';
            return false;
        }

        if (!allowedRoles.includes(this.currentUser.role)) {
            alert('Bạn không có quyền truy cập trang này');
            this.redirectToDashboard();
            return false;
        }

        return true;
    }

    /**
     * Chuyển hướng về dashboard tương ứng với role
     */
    redirectToDashboard() {
        if (!this.currentUser) {
            window.location.href = 'index.html';
            return;
        }

        switch (this.currentUser.role) {
            case 'student':
                window.location.href = 'dashboard-student.html';
                break;
            case 'teacher':
                window.location.href = 'dashboard-teacher.html';
                break;
            case 'admin':
                window.location.href = 'dashboard-admin.html';
                break;
            default:
                window.location.href = 'index.html';
        }
    }

    /**
     * Cập nhật thông tin user
     */
    async updateProfile(updates) {
        try {
            const users = await this.loadUsers();
            const userIndex = users.findIndex(u => u.id === this.currentUser.id);
            
            if (userIndex !== -1) {
                // Cập nhật trong danh sách users
                users[userIndex] = { ...users[userIndex], ...updates };
                localStorage.setItem('users', JSON.stringify(users));

                // Cập nhật current user
                this.currentUser = { ...this.currentUser, ...updates };
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

                this.logActivity('Profile Update', 'User updated profile information');
                
                return { success: true };
            } else {
                return { success: false, error: 'Không tìm thấy thông tin user' };
            }
        } catch (error) {
            console.error('Update profile error:', error);
            return { success: false, error: 'Có lỗi xảy ra khi cập nhật' };
        }
    }

    /**
     * Log hoạt động của user
     */
    logActivity(action, description) {
        try {
            const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
            const newLog = {
                user: this.currentUser ? this.currentUser.username : 'Unknown',
                action: action,
                description: description,
                timestamp: new Date().toISOString()
            };
            
            logs.push(newLog);
            
            // Giữ tối đa 1000 logs
            if (logs.length > 1000) {
                logs.splice(0, logs.length - 1000);
            }
            
            localStorage.setItem('activityLogs', JSON.stringify(logs));
        } catch (error) {
            console.error('Error logging activity:', error);
        }
    }

    /**
     * Quên mật khẩu (mock)
     */
    async forgotPassword(email) {
        try {
            const users = await this.loadUsers();
            const user = users.find(u => u.email === email);
            
            if (user) {
                // Mock gửi email reset
                console.log(`Reset password email sent to ${email}`);
                this.logActivity('Password Reset Request', `Reset password requested for ${email}`);
                
                return { 
                    success: true, 
                    message: 'Email reset mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư.' 
                };
            } else {
                return { 
                    success: false, 
                    error: 'Không tìm thấy email này trong hệ thống' 
                };
            }
        } catch (error) {
            console.error('Forgot password error:', error);
            return { success: false, error: 'Có lỗi xảy ra' };
        }
    }
}

// Khởi tạo AuthManager instance
const authManager = new AuthManager();

// Export cho sử dụng global
window.authManager = authManager; 
