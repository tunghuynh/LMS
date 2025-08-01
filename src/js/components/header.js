/**
 * Header Component - E-Learning Platform
 * Reusable header component with logo, user info, logout and responsive design
 * Author: Tùng Huynh 🎨💻
 */

class HeaderComponent {
    constructor(options = {}) {
        this.options = {
            containerId: options.containerId || 'header',
            logoText: options.logoText || '📚 EduPlatform',
            showUserInfo: options.showUserInfo !== false,
            showLogout: options.showLogout !== false,
            showHamburger: options.showHamburger !== false,
            onHamburgerClick: options.onHamburgerClick || null,
            onLogout: options.onLogout || null,
            customActions: options.customActions || [],
            ...options
        };

        this.currentUser = null;
        this.init();
    }

    init() {
        this.getCurrentUser();
        this.render();
        this.bindEvents();
    }

    getCurrentUser() {
        try {
            const userString = localStorage.getItem('currentUser');
            this.currentUser = userString ? JSON.parse(userString) : null;
        } catch (error) {
            console.error('Error getting current user:', error);
            this.currentUser = null;
        }
    }

    render() {
        const container = document.getElementById(this.options.containerId);
        if (!container) {
            console.error(`Header container with id '${this.options.containerId}' not found`);
            return;
        }

        container.innerHTML = this.getHeaderHTML();
        container.className = 'header';
    }

    getHeaderHTML() {
        return `
            <div class="header-left">
                ${this.options.showHamburger ? this.getHamburgerHTML() : ''}
                ${this.getLogoHTML()}
            </div>
            <div class="header-right">
                ${this.getCustomActionsHTML()}
                ${this.options.showUserInfo ? this.getUserInfoHTML() : ''}
                ${this.options.showLogout ? this.getLogoutButtonHTML() : ''}
            </div>
        `;
    }

    getHamburgerHTML() {
        return `
            <div class="hamburger" id="hamburgerBtn">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
    }

    getLogoHTML() {
        const logoHtml = this.options.logoHtml || `
            <div class="header-logo">${this.options.logoText}</div>
        `;
        
        if (this.options.logoLink) {
            return `<a href="${this.options.logoLink}" class="header-logo-link">${logoHtml}</a>`;
        }
        
        return logoHtml;
    }

    getUserInfoHTML() {
        if (!this.currentUser) {
            return `
                <div class="header-user">
                    <div class="header-avatar">?</div>
                    <span class="header-username">Guest</span>
                </div>
            `;
        }

        const avatar = this.getUserAvatar();
        const displayName = this.getUserDisplayName();

        return `
            <div class="header-user" id="userInfo">
                <div class="header-avatar" id="userAvatar">${avatar}</div>
                <span class="header-username" id="userName">${displayName}</span>
                ${this.options.showUserDropdown ? this.getUserDropdownHTML() : ''}
            </div>
        `;
    }

    getUserAvatar() {
        if (this.currentUser.avatar) {
            return `<img src="${this.currentUser.avatar}" alt="Avatar" />`;
        }
        
        const name = this.currentUser.fullName || this.currentUser.username || 'U';
        return name.charAt(0).toUpperCase();
    }

    getUserDisplayName() {
        return this.currentUser.fullName || this.currentUser.username || 'User';
    }

    getUserDropdownHTML() {
        return `
            <div class="header-dropdown" id="userDropdown">
                <div class="dropdown-arrow"></div>
                <div class="dropdown-content">
                    <a href="profile-student.html" class="dropdown-item">
                        <i>👤</i> Hồ sơ cá nhân
                    </a>
                    <a href="#" class="dropdown-item" onclick="headerComponent.changeTheme()">
                        <i>🌙</i> Chế độ tối
                    </a>
                    <a href="#" class="dropdown-item" onclick="headerComponent.showSettings()">
                        <i>⚙️</i> Cài đặt
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item logout" onclick="headerComponent.logout()">
                        <i>🚪</i> Đăng xuất
                    </a>
                </div>
            </div>
        `;
    }

    getLogoutButtonHTML() {
        return `
            <button class="btn btn-secondary btn-small header-logout-btn" id="logoutBtn">
                Đăng xuất
            </button>
        `;
    }

    getCustomActionsHTML() {
        if (!this.options.customActions || this.options.customActions.length === 0) {
            return '';
        }

        return `
            <div class="header-custom-actions">
                ${this.options.customActions.map(action => `
                    <button class="btn ${action.className || 'btn-secondary'} btn-small" 
                            onclick="${action.onClick}" 
                            title="${action.title || ''}">
                        ${action.icon ? `<i>${action.icon}</i>` : ''} ${action.text || ''}
                    </button>
                `).join('')}
            </div>
        `;
    }

    bindEvents() {
        // Hamburger menu
        if (this.options.showHamburger) {
            const hamburgerBtn = document.getElementById('hamburgerBtn');
            if (hamburgerBtn) {
                hamburgerBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleHamburger();
                });
            }
        }

        // Logout button
        if (this.options.showLogout) {
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.logout();
                });
            }
        }

        // User dropdown
        if (this.options.showUserDropdown) {
            const userInfo = document.getElementById('userInfo');
            const userDropdown = document.getElementById('userDropdown');
            
            if (userInfo && userDropdown) {
                userInfo.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleUserDropdown();
                });

                // Close dropdown when clicking outside
                document.addEventListener('click', () => {
                    this.hideUserDropdown();
                });
            }
        }

        // Responsive behavior
        this.setupResponsive();
    }

    setupResponsive() {
        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Handle mobile menu
        this.handleResize();
    }

    handleResize() {
        const header = document.querySelector('.header');
        if (!header) return;

        if (window.innerWidth <= 768) {
            header.classList.add('mobile');
        } else {
            header.classList.remove('mobile');
        }
    }

    // Event Handlers
    toggleHamburger() {
        const hamburger = document.getElementById('hamburgerBtn');
        if (hamburger) {
            hamburger.classList.toggle('active');
        }

        // Call custom handler if provided
        if (this.options.onHamburgerClick) {
            this.options.onHamburgerClick();
        }

        // Default sidebar toggle behavior
        this.toggleSidebar();
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const content = document.getElementById('content');
        const footer = document.getElementById('footer');

        if (!sidebar) return;

        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('mobile-open');
        } else {
            sidebar.classList.toggle('collapsed');
            if (content) content.classList.toggle('sidebar-collapsed');
            if (footer) footer.classList.toggle('sidebar-collapsed');
        }
    }

    toggleUserDropdown() {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.classList.toggle('show');
        }
    }

    hideUserDropdown() {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.classList.remove('show');
        }
    }

    logout() {
        // Call custom logout handler if provided
        if (this.options.onLogout) {
            this.options.onLogout();
            return;
        }

        // Default logout behavior
        if (typeof authManager !== 'undefined' && authManager.logout) {
            authManager.logout();
        } else {
            // Fallback logout
            localStorage.removeItem('currentUser');
            localStorage.removeItem('userSession');
            window.location.href = 'index.html';
        }
    }

    // Utility Methods
    updateUserInfo(user = null) {
        if (user) {
            this.currentUser = user;
        } else {
            this.getCurrentUser();
        }

        const userAvatar = document.getElementById('userAvatar');
        const userName = document.getElementById('userName');

        if (userAvatar && userName && this.currentUser) {
            userAvatar.textContent = this.getUserAvatar();
            userName.textContent = this.getUserDisplayName();
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `header-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${this.getNotificationIcon(type)}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        // Add to header
        const header = document.querySelector('.header');
        if (header) {
            header.appendChild(notification);

            // Auto remove after 5 seconds
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 5000);
        }
    }

    getNotificationIcon(type) {
        const icons = {
            'info': 'ℹ️',
            'success': '✅',
            'warning': '⚠️',
            'error': '❌'
        };
        return icons[type] || icons.info;
    }

    changeTheme() {
        const body = document.body;
        const isDark = body.classList.contains('dark-theme');
        
        if (isDark) {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    }

    showSettings() {
        // Implementation for settings modal
        if (typeof uiManager !== 'undefined' && uiManager.showToast) {
            uiManager.showToast('Cài đặt sẽ được triển khai trong phiên bản tiếp theo', 'info');
        } else {
            alert('Cài đặt sẽ được triển khai trong phiên bản tiếp theo');
        }
    }

    // Static method to create header with default options
    static create(containerId, options = {}) {
        return new HeaderComponent({
            containerId,
            ...options
        });
    }

    // Static method to initialize header on all pages
    static initDefault() {
        const headerElement = document.getElementById('header');
        if (headerElement) {
            return new HeaderComponent({
                containerId: 'header',
                showHamburger: true,
                showUserInfo: true,
                showLogout: true,
                showUserDropdown: false
            });
        }
        return null;
    }
}

// Auto-initialize header component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if header element exists and component hasn't been manually created
    if (document.getElementById('header') && typeof window.headerComponent === 'undefined') {
        window.headerComponent = HeaderComponent.initDefault();
    }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeaderComponent;
} 
