/**
 * API Utils - E-Learning Platform
 * Handles mock data loading, localStorage operations, and data management
 * Author: Tùng Huynh 🎨💻
 */

class APIManager {
    constructor() {
        this.baseUrl = 'data/';
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
        this.endpoints = {
            users: 'mock-users.json',
            courses: 'mock-courses.json',
            quizzes: 'mock-quizzes.json',
            logs: 'mock-logs.json'
        };
        
        this.init();
    }

    init() {
        // Initialize localStorage keys if they don't exist
        this.initializeStorage();
        
        // Set up event listeners for storage changes
        this.setupStorageListeners();
    }

    // =====================================
    // STORAGE INITIALIZATION
    // =====================================

    initializeStorage() {
        const storageKeys = [
            'users',
            'courses', 
            'quizzes',
            'logs',
            'currentUser',
            'userSessions',
            'appSettings'
        ];

        storageKeys.forEach(key => {
            if (!localStorage.getItem(key)) {
                switch (key) {
                    case 'userSessions':
                        localStorage.setItem(key, JSON.stringify([]));
                        break;
                    case 'appSettings':
                        localStorage.setItem(key, JSON.stringify({
                            theme: 'light',
                            language: 'vi',
                            notifications: true,
                            autoSave: true
                        }));
                        break;
                    default:
                        localStorage.setItem(key, JSON.stringify([]));
                }
            }
        });
    }

    setupStorageListeners() {
        // Listen for storage changes from other tabs
        window.addEventListener('storage', (e) => {
            if (e.key && this.cache.has(e.key)) {
                // Clear cache when storage changes
                this.cache.delete(e.key);
            }
        });
    }

    // =====================================
    // DATA FETCHING
    // =====================================

    async fetchData(endpoint, useCache = true) {
        try {
            const cacheKey = endpoint;
            
            // Check cache first
            if (useCache && this.cache.has(cacheKey)) {
                const cached = this.cache.get(cacheKey);
                if (Date.now() - cached.timestamp < this.cacheTimeout) {
                    return cached.data;
                }
            }

            // Fetch from file
            const response = await fetch(this.baseUrl + endpoint);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Cache the result
            if (useCache) {
                this.cache.set(cacheKey, {
                    data: data,
                    timestamp: Date.now()
                });
            }
            
            return data;
            
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            
            // Fallback to localStorage if fetch fails
            const fallbackData = this.getFromStorage(endpoint.replace('.json', ''));
            if (fallbackData.length > 0) {
                console.warn(`Using fallback data for ${endpoint}`);
                return fallbackData;
            }
            
            throw error;
        }
    }

    // =====================================
    // SPECIFIC DATA LOADERS
    // =====================================

    async loadUsers(refresh = false) {
        try {
            // Try to load from storage first
            let users = this.getFromStorage('users');
            
            // If no users in storage or refresh requested, load from file
            if (users.length === 0 || refresh) {
                users = await this.fetchData(this.endpoints.users, !refresh);
                this.saveToStorage('users', users);
            }
            
            return users;
        } catch (error) {
            console.error('Error loading users:', error);
            return [];
        }
    }

    async loadCourses(refresh = false) {
        try {
            let courses = this.getFromStorage('courses');
            
            if (courses.length === 0 || refresh) {
                courses = await this.fetchData(this.endpoints.courses, !refresh);
                this.saveToStorage('courses', courses);
            }
            
            return courses;
        } catch (error) {
            console.error('Error loading courses:', error);
            return [];
        }
    }

    async loadQuizzes(refresh = false) {
        try {
            let quizzes = this.getFromStorage('quizzes');
            
            if (quizzes.length === 0 || refresh) {
                quizzes = await this.fetchData(this.endpoints.quizzes, !refresh);
                this.saveToStorage('quizzes', quizzes);
            }
            
            return quizzes;
        } catch (error) {
            console.error('Error loading quizzes:', error);
            return [];
        }
    }

    async loadLogs(refresh = false) {
        try {
            let logs = this.getFromStorage('logs');
            
            if (logs.length === 0 || refresh) {
                logs = await this.fetchData(this.endpoints.logs, !refresh);
                this.saveToStorage('logs', logs);
            }
            
            return logs;
        } catch (error) {
            console.error('Error loading logs:', error);
            return [];
        }
    }

    // =====================================
    // LOCALSTORAGE OPERATIONS
    // =====================================

    saveToStorage(key, data) {
        try {
            const serialized = JSON.stringify(data);
            localStorage.setItem(key, serialized);
            
            // Clear related cache
            this.cache.delete(key);
            
            return true;
        } catch (error) {
            console.error(`Error saving to storage (${key}):`, error);
            return false;
        }
    }

    getFromStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error(`Error reading from storage (${key}):`, error);
            return [];
        }
    }

    removeFromStorage(key) {
        try {
            localStorage.removeItem(key);
            this.cache.delete(key);
            return true;
        } catch (error) {
            console.error(`Error removing from storage (${key}):`, error);
            return false;
        }
    }

    clearStorage() {
        try {
            localStorage.clear();
            this.cache.clear();
            this.initializeStorage();
            return true;
        } catch (error) {
            console.error('Error clearing storage:', error);
            return false;
        }
    }

    // =====================================
    // DATA MANAGEMENT
    // =====================================

    // User Management
    async createUser(userData) {
        try {
            const users = await this.loadUsers();
            
            // Generate new ID
            const newId = Math.max(...users.map(u => u.id || 0), 0) + 1;
            
            const newUser = {
                id: newId,
                ...userData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            users.push(newUser);
            this.saveToStorage('users', users);
            
            return { success: true, data: newUser };
        } catch (error) {
            console.error('Error creating user:', error);
            return { success: false, error: error.message };
        }
    }

    async updateUser(userId, userData) {
        try {
            const users = await this.loadUsers();
            const userIndex = users.findIndex(u => u.id === userId);
            
            if (userIndex === -1) {
                throw new Error('User not found');
            }
            
            users[userIndex] = {
                ...users[userIndex],
                ...userData,
                updatedAt: new Date().toISOString()
            };
            
            this.saveToStorage('users', users);
            
            return { success: true, data: users[userIndex] };
        } catch (error) {
            console.error('Error updating user:', error);
            return { success: false, error: error.message };
        }
    }

    async deleteUser(userId) {
        try {
            const users = await this.loadUsers();
            const filteredUsers = users.filter(u => u.id !== userId);
            
            if (filteredUsers.length === users.length) {
                throw new Error('User not found');
            }
            
            this.saveToStorage('users', filteredUsers);
            
            return { success: true };
        } catch (error) {
            console.error('Error deleting user:', error);
            return { success: false, error: error.message };
        }
    }

    // Course Management
    async createCourse(courseData) {
        try {
            const courses = await this.loadCourses();
            
            const newId = 'course_' + (Date.now());
            const newCourse = {
                courseId: newId,
                ...courseData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            courses.push(newCourse);
            this.saveToStorage('courses', courses);
            
            return { success: true, data: newCourse };
        } catch (error) {
            console.error('Error creating course:', error);
            return { success: false, error: error.message };
        }
    }

    async updateCourse(courseId, courseData) {
        try {
            const courses = await this.loadCourses();
            const courseIndex = courses.findIndex(c => c.courseId === courseId);
            
            if (courseIndex === -1) {
                throw new Error('Course not found');
            }
            
            courses[courseIndex] = {
                ...courses[courseIndex],
                ...courseData,
                updatedAt: new Date().toISOString()
            };
            
            this.saveToStorage('courses', courses);
            
            return { success: true, data: courses[courseIndex] };
        } catch (error) {
            console.error('Error updating course:', error);
            return { success: false, error: error.message };
        }
    }

    // Quiz Management
    async createQuiz(quizData) {
        try {
            const quizzes = await this.loadQuizzes();
            
            const newId = 'quiz_' + Date.now();
            const newQuiz = {
                id: newId,
                ...quizData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            quizzes.push(newQuiz);
            this.saveToStorage('quizzes', quizzes);
            
            return { success: true, data: newQuiz };
        } catch (error) {
            console.error('Error creating quiz:', error);
            return { success: false, error: error.message };
        }
    }

    async updateQuiz(quizId, quizData) {
        try {
            const quizzes = await this.loadQuizzes();
            const quizIndex = quizzes.findIndex(q => q.id === quizId);
            
            if (quizIndex === -1) {
                throw new Error('Quiz not found');
            }
            
            quizzes[quizIndex] = {
                ...quizzes[quizIndex],
                ...quizData,
                updatedAt: new Date().toISOString()
            };
            
            this.saveToStorage('quizzes', quizzes);
            
            return { success: true, data: quizzes[quizIndex] };
        } catch (error) {
            console.error('Error updating quiz:', error);
            return { success: false, error: error.message };
        }
    }

    // Activity Logging
    async logActivity(action, description, userId = null) {
        try {
            const logs = await this.loadLogs();
            
            const newLog = {
                id: 'log_' + Date.now(),
                user: userId || 'system',
                action: action,
                description: description,
                timestamp: new Date().toISOString(),
                ipAddress: '192.168.1.100', // Mock IP
                userAgent: navigator.userAgent
            };
            
            logs.unshift(newLog); // Add to beginning
            
            // Keep only last 1000 logs
            if (logs.length > 1000) {
                logs.splice(1000);
            }
            
            this.saveToStorage('logs', logs);
            
            return { success: true, data: newLog };
        } catch (error) {
            console.error('Error logging activity:', error);
            return { success: false, error: error.message };
        }
    }

    // =====================================
    // SEARCH AND FILTERING
    // =====================================

    async searchUsers(query, filters = {}) {
        try {
            const users = await this.loadUsers();
            
            return users.filter(user => {
                const matchesQuery = !query || 
                    user.fullName?.toLowerCase().includes(query.toLowerCase()) ||
                    user.email?.toLowerCase().includes(query.toLowerCase()) ||
                    user.username?.toLowerCase().includes(query.toLowerCase());
                
                const matchesRole = !filters.role || user.role === filters.role;
                const matchesStatus = !filters.status || this.getUserStatus(user) === filters.status;
                
                return matchesQuery && matchesRole && matchesStatus;
            });
        } catch (error) {
            console.error('Error searching users:', error);
            return [];
        }
    }

    async searchCourses(query, filters = {}) {
        try {
            const courses = await this.loadCourses();
            
            return courses.filter(course => {
                const matchesQuery = !query ||
                    course.title?.toLowerCase().includes(query.toLowerCase()) ||
                    course.description?.toLowerCase().includes(query.toLowerCase()) ||
                    course.instructor?.toLowerCase().includes(query.toLowerCase());
                
                const matchesCategory = !filters.category || course.category === filters.category;
                const matchesLevel = !filters.level || course.level === filters.level;
                
                return matchesQuery && matchesCategory && matchesLevel;
            });
        } catch (error) {
            console.error('Error searching courses:', error);
            return [];
        }
    }

    // =====================================
    // UTILITY FUNCTIONS
    // =====================================

    getUserStatus(user) {
        // Mock status calculation
        const lastActivity = new Date(user.lastActivity || user.createdAt);
        const daysSinceActivity = (Date.now() - lastActivity.getTime()) / (1000 * 60 * 60 * 24);
        
        return daysSinceActivity <= 7 ? 'active' : 'inactive';
    }

    async getStatistics() {
        try {
            const [users, courses, quizzes, logs] = await Promise.all([
                this.loadUsers(),
                this.loadCourses(),
                this.loadQuizzes(),
                this.loadLogs()
            ]);

            return {
                users: {
                    total: users.length,
                    students: users.filter(u => u.role === 'student').length,
                    teachers: users.filter(u => u.role === 'teacher').length,
                    admins: users.filter(u => u.role === 'admin').length,
                    active: users.filter(u => this.getUserStatus(u) === 'active').length
                },
                courses: {
                    total: courses.length,
                    published: courses.filter(c => c.status === 'published').length,
                    draft: courses.filter(c => c.status === 'draft').length
                },
                quizzes: {
                    total: quizzes.length,
                    active: quizzes.filter(q => new Date(q.deadline) > new Date()).length
                },
                activities: {
                    total: logs.length,
                    today: logs.filter(l => {
                        const logDate = new Date(l.timestamp);
                        const today = new Date();
                        return logDate.toDateString() === today.toDateString();
                    }).length
                }
            };
        } catch (error) {
            console.error('Error getting statistics:', error);
            return null;
        }
    }

    // =====================================
    // BACKUP AND RESTORE
    // =====================================

    exportData() {
        try {
            const data = {
                users: this.getFromStorage('users'),
                courses: this.getFromStorage('courses'),
                quizzes: this.getFromStorage('quizzes'),
                logs: this.getFromStorage('logs'),
                settings: this.getFromStorage('appSettings'),
                exportDate: new Date().toISOString(),
                version: '1.0.0'
            };

            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `elearning-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            return { success: true };
        } catch (error) {
            console.error('Error exporting data:', error);
            return { success: false, error: error.message };
        }
    }

    async importData(file) {
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            
            // Validate data structure
            if (!data.users || !data.courses || !data.quizzes) {
                throw new Error('Invalid backup file format');
            }
            
            // Backup current data
            const currentData = {
                users: this.getFromStorage('users'),
                courses: this.getFromStorage('courses'),
                quizzes: this.getFromStorage('quizzes'),
                logs: this.getFromStorage('logs')
            };
            
            this.saveToStorage('backup_' + Date.now(), currentData);
            
            // Import new data
            this.saveToStorage('users', data.users);
            this.saveToStorage('courses', data.courses);
            this.saveToStorage('quizzes', data.quizzes);
            if (data.logs) this.saveToStorage('logs', data.logs);
            if (data.settings) this.saveToStorage('appSettings', data.settings);
            
            return { success: true };
        } catch (error) {
            console.error('Error importing data:', error);
            return { success: false, error: error.message };
        }
    }

    // =====================================
    // CACHE MANAGEMENT
    // =====================================

    clearCache() {
        this.cache.clear();
    }

    getCacheInfo() {
        const cacheEntries = Array.from(this.cache.entries()).map(([key, value]) => ({
            key,
            size: JSON.stringify(value.data).length,
            age: Date.now() - value.timestamp
        }));

        return {
            count: this.cache.size,
            entries: cacheEntries,
            totalSize: cacheEntries.reduce((sum, entry) => sum + entry.size, 0)
        };
    }
}

// Create global instance
const apiManager = new APIManager();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = APIManager;
} 
