/**
 * Theme Manager - E-Learning Platform
 * Manages dark/light theme switching and persistence
 * Author: Tùng Huynh 🎨💻
 */

class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.themeKey = 'elearning-theme';
        this.init();
    }

    init() {
        this.loadSavedTheme();
        this.applyTheme(this.currentTheme);
        this.bindEvents();
        // this.createThemeToggle(); // Removed - using static theme toggle buttons in HTML instead
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem(this.themeKey);
        if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
            this.currentTheme = savedTheme;
        } else {
            // Check system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.currentTheme = 'dark';
            }
        }
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        
        // Update theme toggle button if exists
        // this.updateThemeToggle(); // Removed - using static theme toggle buttons in HTML instead
        
        // Save to localStorage
        localStorage.setItem(this.themeKey, theme);
        
        // Dispatch theme change event
        window.dispatchEvent(new CustomEvent('themechange', { 
            detail: { theme: theme } 
        }));
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        
        // Show toast notification
        if (typeof uiManager !== 'undefined') {
            uiManager.showToast(
                `Đã chuyển sang chế độ ${newTheme === 'dark' ? 'tối' : 'sáng'}`, 
                'info'
            );
        }
    }

    // createThemeToggle() method removed - using static HTML theme toggle buttons instead
    
    // updateThemeToggle() method removed - using static HTML theme toggle buttons instead

    bindEvents() {
        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addListener((e) => {
                // Only apply system theme if user hasn't manually set a theme
                const savedTheme = localStorage.getItem(this.themeKey);
                if (!savedTheme) {
                    this.applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }

        // Listen for keyboard shortcut (Ctrl+Shift+T)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    setTheme(theme) {
        if (['light', 'dark'].includes(theme)) {
            this.applyTheme(theme);
        }
    }

    // Auto theme based on time of day
    setAutoTheme() {
        const hour = new Date().getHours();
        const isDaytime = hour >= 6 && hour < 18;
        const autoTheme = isDaytime ? 'light' : 'dark';
        
        this.applyTheme(autoTheme);
        
        if (typeof uiManager !== 'undefined') {
            uiManager.showToast(
                `Tự động chuyển sang chế độ ${autoTheme === 'dark' ? 'tối' : 'sáng'} theo giờ trong ngày`, 
                'info'
            );
        }
    }
}

// CSS for theme toggle button removed - using CSS from layout.css instead

// Auto-initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.themeManager === 'undefined') {
        window.themeManager = new ThemeManager();
    }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
} 