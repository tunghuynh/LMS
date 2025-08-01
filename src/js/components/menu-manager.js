/**
 * Common Menu Manager - E-Learning Platform
 * Manages menu structure and permissions across all pages
 * Author: Tùng Huynh 🎨💻
 */

class CommonMenuManager {
    constructor(options = {}) {
        this.options = {
            containerId: options.containerId || 'sidebar',
            currentPage: options.currentPage || '',
            ...options
        };
        
        this.menuData = null;
        this.permissionsData = null;
        this.currentUser = null;
        this.userRole = 'student';
        
        this.init();
    }

    async init() {
        try {
            console.log('🚀 Initializing CommonMenuManager...');
            this.getCurrentUser();
            console.log('👤 Current user role:', this.userRole);
            
            await this.loadMenuData();
            await this.loadPermissionsData();
            
            console.log('📋 Menu data available:', !!this.menuData);
            console.log('🔐 Permissions data available:', !!this.permissionsData);
            
            this.render();
            console.log('✅ CommonMenuManager initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing CommonMenuManager:', error);
            this.renderFallbackMenu();
        }
    }

    getCurrentUser() {
        try {
            const userString = localStorage.getItem('currentUser');
            this.currentUser = userString ? JSON.parse(userString) : null;
            if (this.currentUser) {
                this.userRole = this.currentUser.role || 'student';
            }
        } catch (error) {
            console.error('Error getting current user:', error);
            this.currentUser = null;
            this.userRole = 'student';
        }
    }

    async loadMenuData() {
        try {
            const response = await fetch('data/mock-menu.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.menuData = await response.json();
            console.log('✅ Menu data loaded successfully:', this.menuData);
        } catch (error) {
            console.error('❌ Error loading menu data:', error);
            // Fallback to embedded menu data
            this.menuData = this.getEmbeddedMenuData();
            console.log('🔄 Using embedded menu data as fallback');
        }
    }

    async loadPermissionsData() {
        try {
            const response = await fetch('data/mock-permissions.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.permissionsData = await response.json();
            console.log('✅ Permissions data loaded successfully:', this.permissionsData);
        } catch (error) {
            console.error('❌ Error loading permissions data:', error);
            // Fallback to embedded permissions data
            this.permissionsData = this.getEmbeddedPermissionsData();
            console.log('🔄 Using embedded permissions data as fallback');
        }
    }

    hasPermission(menuId, actionId = null) {
        if (!this.permissionsData) return false;
        
        const userPermissions = this.permissionsData.permissions[this.userRole];
        if (!userPermissions) return false;

        // Admin has all permissions
        if (this.userRole === 'admin') return true;

        // Check menu permission
        if (actionId) {
            // Check action permission
            const actionAccess = this.permissionsData.actionAccess[actionId];
            return actionAccess && actionAccess.includes(this.userRole);
        } else {
            // Check menu permission
            const menuAccess = this.permissionsData.menuAccess[menuId];
            return menuAccess && menuAccess.includes(this.userRole);
        }
    }

    filterMenuByPermissions(menuItems) {
        return menuItems.filter(item => {
            // Check if user has permission for this menu item
            if (!this.hasPermission(item.id)) {
                return false;
            }

            // Filter children if they exist
            if (item.children) {
                item.children = this.filterMenuByPermissions(item.children);
                // Only show parent if it has visible children or is directly accessible
                return item.children.length > 0 || item.type === 'page';
            }

            // Filter actions if they exist
            if (item.actions) {
                item.actions = item.actions.filter(action => 
                    this.hasPermission(item.id, action.id)
                );
            }

            return true;
        });
    }

    render() {
        const container = document.getElementById(this.options.containerId);
        if (!container) {
            console.error(`Menu container with id '${this.options.containerId}' not found`);
            return;
        }

        if (!this.menuData || !this.menuData.menuItems) {
            this.renderFallbackMenu();
            return;
        }

        // Filter menu items based on permissions
        const filteredMenuItems = this.filterMenuByPermissions([...this.menuData.menuItems]);

        container.innerHTML = this.getSidebarHTML(filteredMenuItems);
        container.className = 'sidebar sidebar-fixed';
        
        // Set active menu item
        this.setActiveMenuItem();
    }

    getSidebarHTML(menuItems) {
        return `
            <div class="sidebar-nav" id="sidebarNav">
                ${this.getMenuItemsHTML(menuItems)}
            </div>
            ${this.renderUserInfo()}
        `;
    }

    getMenuItemsHTML(menuItems) {
        return menuItems.map(item => {
            if (item.type === 'group' && item.children) {
                return this.getMenuGroupHTML(item);
            } else {
                return this.getMenuItemHTML(item);
            }
        }).join('');
    }

    getMenuGroupHTML(item) {
        if (!item.children || item.children.length === 0) {
            return '';
        }

        const hasActiveChild = this.hasActiveChild(item.children);
        const expandedClass = hasActiveChild ? 'expanded' : '';
        
        return `
            <div class="sidebar-group ${expandedClass}" data-id="${item.id}">
                <div class="sidebar-group-header" onclick="commonMenuManager.toggleGroup('${item.id}')">
                    <span class="sidebar-icon">${item.icon}</span>
                    <span class="sidebar-text">${item.text}</span>
                    <span class="sidebar-arrow">▼</span>
                </div>
                <div class="sidebar-submenu">
                    ${item.children.map(child => this.getMenuItemHTML(child, true)).join('')}
                </div>
            </div>
        `;
    }

    getMenuItemHTML(item, isChild = false) {
        const isActive = this.isItemActive(item);
        const activeClass = isActive ? 'active' : '';
        const itemClass = isChild ? 'sidebar-subitem' : 'sidebar-item';
        const iconClass = isChild ? 'sidebar-subicon' : 'sidebar-icon';
        
        let href = item.href || '#';
        if (href.includes('{role}')) {
            href = href.replace('{role}', this.userRole);
        }

        const onClick = item.onclick ? `onclick="${item.onclick}"` : '';

        return `
            <a href="${href}" 
               class="${itemClass} ${activeClass}" 
               data-id="${item.id}"
               ${onClick}
               title="${item.text}">
                <span class="${iconClass}">${item.icon}</span>
                <span class="sidebar-text">${item.text}</span>
                ${item.badge ? `<span class="sidebar-badge">${item.badge}</span>` : ''}
            </a>
        `;
    }

    renderUserInfo() {
        // User info removed from sidebar menu
        return '';
    }

    getUserAvatar() {
        if (!this.currentUser) return 'U';
        return (this.currentUser.fullName || this.currentUser.username || 'User').charAt(0).toUpperCase();
    }

    getUserDisplayName() {
        if (!this.currentUser) return 'User';
        return this.currentUser.fullName || this.currentUser.username || 'User';
    }

    getRoleDisplayName() {
        const roleMap = {
            'admin': '👨‍💼 Quản trị viên',
            'teacher': '👨‍🏫 Giảng viên',
            'student': '👨‍🎓 Học viên'
        };
        return roleMap[this.userRole] || '👤 User';
    }

    isItemActive(item) {
        if (!item.href) return false;
        
        const currentPath = window.location.pathname.split('/').pop();
        let itemPath = item.href;
        
        // Handle role-based hrefs
        if (itemPath.includes('{role}')) {
            itemPath = itemPath.replace('{role}', this.userRole);
        }
        
        // Remove parameters and get filename
        itemPath = itemPath.split('?')[0].split('#')[0];
        
        return currentPath === itemPath;
    }

    hasActiveChild(children) {
        return children.some(child => this.isItemActive(child));
    }

    setActiveMenuItem() {
        // Remove existing active states
        document.querySelectorAll('.sidebar-item, .sidebar-subitem').forEach(item => {
            item.classList.remove('active');
        });

        // Set active state for current page
        const currentPath = window.location.pathname.split('/').pop();
        document.querySelectorAll('.sidebar-item, .sidebar-subitem').forEach(item => {
            const href = item.getAttribute('href');
            if (href && href !== '#') {
                let itemPath = href;
                if (itemPath.includes('{role}')) {
                    itemPath = itemPath.replace('{role}', this.userRole);
                }
                itemPath = itemPath.split('?')[0].split('#')[0];
                
                if (currentPath === itemPath) {
                    item.classList.add('active');
                    
                    // Expand parent group if this is a child item
                    const group = item.closest('.sidebar-group');
                    if (group) {
                        group.classList.add('expanded');
                    }
                }
            }
        });
    }

    toggleGroup(groupId) {
        const group = document.querySelector(`.sidebar-group[data-id="${groupId}"]`);
        if (group) {
            group.classList.toggle('expanded');
        }
    }

    // Get filtered menu data for other components
    getMenuData() {
        if (!this.menuData) return null;
        return this.filterMenuByPermissions([...this.menuData.menuItems]);
    }

    // Get user permissions
    getUserPermissions() {
        if (!this.permissionsData) return null;
        return this.permissionsData.permissions[this.userRole];
    }

    // Check if user can perform specific action
    canPerformAction(actionId) {
        return this.hasPermission(null, actionId);
    }

    getEmbeddedMenuData() {
        return {
            "menuItems": [
                {
                    "id": "dashboard",
                    "text": "Dashboard",
                    "icon": "📊",
                    "type": "page",
                    "href": "dashboard-{role}.html",
                    "permissions": ["admin", "teacher", "student"]
                },
                {
                    "id": "class-management",
                    "text": "Quản lý lớp học",
                    "icon": "🏫",
                    "type": "page",
                    "href": "classes.html",
                    "permissions": ["admin", "teacher"]
                },
                {
                    "id": "user-management",
                    "text": "Quản lý người dùng",
                    "icon": "👥",
                    "type": "group",
                    "permissions": ["admin"],
                    "children": [
                        {
                            "id": "user-list",
                            "text": "Danh sách người dùng",
                            "icon": "📝",
                            "type": "page",
                            "href": "users.html",
                            "permissions": ["admin"]
                        },
                        {
                            "id": "user-permissions",
                            "text": "Phân quyền người dùng",
                            "icon": "🔐",
                            "type": "page",
                            "href": "permissions.html",
                            "permissions": ["admin"]
                        }
                    ]
                },
                {
                    "id": "course-management",
                    "text": "Quản lý khóa học",
                    "icon": "📚",
                    "type": "group",
                    "permissions": ["admin", "teacher", "student"],
                    "children": [
                        {
                            "id": "course-categories",
                            "text": "Danh mục loại khóa học",
                            "icon": "📂",
                            "type": "page",
                            "href": "categories.html",
                            "permissions": ["admin", "teacher"]
                        },
                        {
                            "id": "courses",
                            "text": "Khóa học",
                            "icon": "📖",
                            "type": "page",
                            "href": "courses.html",
                            "permissions": ["admin", "teacher", "student"]
                        },
                        {
                            "id": "lessons",
                            "text": "Bài học",
                            "icon": "📖",
                            "type": "page",
                            "href": "lesson.html",
                            "permissions": ["admin", "teacher", "student"]
                        }
                    ]
                },
                {
                    "id": "quiz-management",
                    "text": "Quản lý bài thi",
                    "icon": "🧪",
                    "type": "group",
                    "permissions": ["admin", "teacher", "student"],
                    "children": [
                        {
                            "id": "quizzes",
                            "text": "Bài thi",
                            "icon": "📝",
                            "type": "page",
                            "href": "quizzes.html",
                            "permissions": ["admin", "teacher", "student"]
                        },
                        {
                            "id": "quiz-results",
                            "text": "Kết quả thi",
                            "icon": "📈",
                            "type": "page",
                            "href": "quiz-results.html",
                            "permissions": ["admin", "teacher", "student"]
                        }
                    ]
                },
                {
                    "id": "profile",
                    "text": "Profile",
                    "icon": "👤",
                    "type": "page",
                    "href": "profile-{role}.html",
                    "permissions": ["admin", "teacher", "student"]
                },
                {
                    "id": "settings",
                    "text": "Cài đặt",
                    "icon": "⚙️",
                    "type": "modal",
                    "onclick": "window.commonMenuManager ? window.commonMenuManager.showSettings() : console.log('No menu manager')",
                    "permissions": ["admin", "teacher", "student"]
                }
            ]
        };
    }

    getEmbeddedPermissionsData() {
        return {
            "permissions": {
                "admin": {
                    "description": "Quản trị viên - Full quyền tất cả các chức năng của hệ thống",
                    "allowedMenus": ["*"],
                    "allowedActions": ["*"],
                    "restrictions": []
                },
                "teacher": {
                    "description": "Giảng viên - Có quyền full vào cụm chức năng Quản lý khóa học và Quản lý bài thi",
                    "allowedMenus": [
                        "dashboard",
                        "class-management",
                        "course-management",
                        "quiz-management",
                        "profile",
                        "settings"
                    ]
                },
                "student": {
                    "description": "Học viên - Chỉ xem và tham gia học tập, thi cử",
                    "allowedMenus": [
                        "dashboard",
                        "course-management",
                        "quiz-management",
                        "profile",
                        "settings"
                    ]
                }
            },
            "menuAccess": {
                "dashboard": ["admin", "teacher", "student"],
                "class-management": ["admin", "teacher"],
                "user-management": ["admin"],
                "user-list": ["admin"],
                "user-permissions": ["admin"],
                "course-management": ["admin", "teacher", "student"],
                "course-categories": ["admin", "teacher"],
                "courses": ["admin", "teacher", "student"],
                "lessons": ["admin", "teacher", "student"],
                "quiz-management": ["admin", "teacher", "student"],
                "quizzes": ["admin", "teacher", "student"],
                "quiz-results": ["admin", "teacher", "student"],
                "profile": ["admin", "teacher", "student"],
                "settings": ["admin", "teacher", "student"]
            }
        };
    }

    renderFallbackMenu() {
        const container = document.getElementById(this.options.containerId);
        if (!container) return;

        console.log('🔄 Rendering simple fallback menu for role:', this.userRole);

        // Simple fallback menu
        const fallbackMenus = {
            admin: [
                { href: 'dashboard-admin.html', icon: '📊', text: 'Dashboard' },
                { href: 'users.html', icon: '👥', text: 'Quản lý người dùng' },
                { href: 'courses.html', icon: '📚', text: 'Quản lý khóa học' },
                { href: 'quizzes.html', icon: '🧪', text: 'Quản lý Quiz' }
            ],
            teacher: [
                { href: 'dashboard-teacher.html', icon: '📊', text: 'Dashboard' },
                { href: 'courses.html', icon: '📚', text: 'Khóa học của tôi' },
                { href: 'quizzes.html', icon: '🧪', text: 'Quản lý Quiz' }
            ],
            student: [
                { href: 'dashboard-student.html', icon: '📊', text: 'Dashboard' },
                { href: 'courses.html', icon: '📚', text: 'Khóa học' },
                { href: 'quizzes.html', icon: '🧪', text: 'Quiz' }
            ]
        };

        const menuItems = fallbackMenus[this.userRole] || fallbackMenus.student;
        const menuHTML = menuItems.map(item => `
            <a href="${item.href}" class="sidebar-item">
                <span class="sidebar-icon">${item.icon}</span>
                <span class="sidebar-text">${item.text}</span>
            </a>
        `).join('');

        container.innerHTML = `
            <div class="sidebar-nav">
                ${menuHTML}
            </div>
        `;
    }

    // Settings modal - independent implementation
    showSettings() {
        this.createSettingsModal();
    }

    createSettingsModal() {
        // Remove existing modal if any
        const existingModal = document.getElementById('settingsModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Create settings modal
        const modal = document.createElement('div');
        modal.id = 'settingsModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3 class="modal-title">⚙️ Cài đặt hệ thống</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="settings-sections">
                        <!-- Theme Settings -->
                        <div class="settings-section">
                            <h4>🎨 Giao diện</h4>
                            <div class="theme-options">
                                <label class="radio-option">
                                    <input type="radio" name="theme" value="light" ${this.getCurrentTheme() === 'light' ? 'checked' : ''}>
                                    <span>☀️ Sáng</span>
                                </label>
                                <label class="radio-option">
                                    <input type="radio" name="theme" value="dark" ${this.getCurrentTheme() === 'dark' ? 'checked' : ''}>
                                    <span>🌙 Tối</span>
                                </label>
                                <label class="radio-option">
                                    <input type="radio" name="theme" value="auto" ${this.getCurrentTheme() === 'auto' ? 'checked' : ''}>
                                    <span>🔄 Tự động</span>
                                </label>
                            </div>
                        </div>

                        <!-- Menu Settings -->
                        <div class="settings-section">
                            <h4>📋 Menu</h4>
                            <label class="checkbox-label">
                                <input type="checkbox" id="rememberMenuState" ${this.getMenuRememberState() ? 'checked' : ''}>
                                <span>Nhớ trạng thái menu</span>
                            </label>
                        </div>

                        <!-- Data Management -->
                        <div class="settings-section">
                            <h4>💾 Quản lý dữ liệu</h4>
                            <div class="data-actions">
                                <button class="btn btn-secondary btn-small" onclick="window.commonMenuManager.exportData()">
                                    📤 Xuất dữ liệu
                                </button>
                                <button class="btn btn-warning btn-small" onclick="window.commonMenuManager.clearData()">
                                    🗑️ Xóa dữ liệu
                                </button>
                            </div>
                        </div>

                        <!-- Shortcuts -->
                        <div class="settings-section">
                            <h4>⌨️ Phím tắt</h4>
                            <div class="shortcuts-list">
                                <div class="shortcut-item">
                                    <span>Chuyển theme:</span>
                                    <kbd>Ctrl + Shift + T</kbd>
                                </div>
                                <div class="shortcut-item">
                                    <span>Mở cài đặt:</span>
                                    <kbd>Ctrl + ,</kbd>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-secondary" onclick="this.closest('.modal').remove()">
                        Hủy
                    </button>
                    <button type="button" class="btn btn-primary" onclick="window.commonMenuManager.saveSettings()">
                        Lưu cài đặt
                    </button>
                </div>
            </div>
        `;

        // Add to body and show
        document.body.appendChild(modal);
        modal.style.display = 'flex';

        // Add event listeners for theme change
        modal.querySelectorAll('input[name="theme"]').forEach(input => {
            input.addEventListener('change', (e) => {
                if (typeof window.themeManager !== 'undefined') {
                    window.themeManager.setTheme(e.target.value);
                }
            });
        });
    }

    getCurrentTheme() {
        if (typeof window.themeManager !== 'undefined') {
            return window.themeManager.getCurrentTheme();
        }
        return localStorage.getItem('theme') || 'light';
    }

    getMenuRememberState() {
        return localStorage.getItem('rememberMenuState') !== 'false';
    }

    saveSettings() {
        // Save menu remember state
        const rememberState = document.getElementById('rememberMenuState')?.checked;
        localStorage.setItem('rememberMenuState', rememberState);

        // Show success message
        if (typeof uiManager !== 'undefined') {
            uiManager.showToast('Cài đặt đã được lưu', 'success');
        }

        // Close modal
        document.getElementById('settingsModal')?.remove();
    }

    exportData() {
        const data = {
            currentUser: JSON.parse(localStorage.getItem('currentUser') || '{}'),
            settings: {
                theme: this.getCurrentTheme(),
                rememberMenuState: this.getMenuRememberState()
            },
            menuState: JSON.parse(localStorage.getItem('menuState') || '{}'),
            timestamp: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `elearning-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);

        if (typeof uiManager !== 'undefined') {
            uiManager.showToast('Dữ liệu đã được xuất', 'success');
        }
    }

    clearData() {
        if (confirm('Bạn có chắc muốn xóa tất cả dữ liệu? Hành động này không thể hoàn tác.')) {
            const keysToKeep = ['theme', 'rememberMenuState'];
            const allKeys = Object.keys(localStorage);
            
            allKeys.forEach(key => {
                if (!keysToKeep.includes(key)) {
                    localStorage.removeItem(key);
                }
            });

            if (typeof uiManager !== 'undefined') {
                uiManager.showToast('Đã xóa tất cả dữ liệu', 'info');
            }

            // Reload page after clearing data
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    // Static method to create instance
    static create(containerId, options = {}) {
        return new CommonMenuManager({
            containerId,
            ...options
        });
    }
}

// CSS for fixed sidebar (no collapse)
const fixedSidebarCSS = `
.sidebar-fixed {
    width: 280px !important;
    position: fixed !important;
    transform: translateX(0) !important;
}

.sidebar-fixed .sidebar-collapse {
    display: none !important;
}

/* Adjust main content for fixed sidebar */
.main-content {
    margin-left: 280px !important;
}

@media (max-width: 768px) {
    .sidebar-fixed {
        width: 100% !important;
        transform: translateX(-100%) !important;
        z-index: 1000;
    }
    
    .sidebar-fixed.mobile-open {
        transform: translateX(0) !important;
    }
    
    .main-content {
        margin-left: 0 !important;
    }
}
`;

// Inject CSS in IIFE to avoid variable conflicts
(function() {
    const menuStyle = document.createElement('style');
    menuStyle.textContent = fixedSidebarCSS;
    menuStyle.id = 'menu-manager-styles';
    
    // Only inject if not already present
    if (!document.getElementById('menu-manager-styles')) {
        document.head.appendChild(menuStyle);
    }
})();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CommonMenuManager;
}

// Ensure global availability
if (typeof window !== 'undefined') {
    window.CommonMenuManager = CommonMenuManager;
    
    // Auto-initialize CommonMenuManager when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🔄 CommonMenuManager auto-initializing...');
        
        // Check if we have the required elements
        const sidebar = document.getElementById('sidebar');
        const sidebarNav = document.getElementById('sidebarNav');
        
        if (sidebar && sidebarNav) {
            try {
                const menuManager = new CommonMenuManager();
                window.commonMenuManager = menuManager;
                console.log('✅ CommonMenuManager initialized successfully');
            } catch (error) {
                console.error('❌ Failed to initialize CommonMenuManager:', error);
            }
        } else {
            console.log('ℹ️ Sidebar elements not found, skipping menu initialization');
        }
    });
} 