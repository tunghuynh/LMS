/**
 * UI Utilities
 * Quản lý các component UI: modal, toast, validation, pagination
 */

class UIManager {
    constructor() {
        this.activeModals = [];
        this.init();
    }

    init() {
        this.initModalEvents();
        this.initToastContainer();
    }

    /**
     * Modal Management
     */
    initModalEvents() {
        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hideModal(e.target);
            }
        });

        // Close modal on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModals.length > 0) {
                const topModal = this.activeModals[this.activeModals.length - 1];
                this.hideModal(topModal);
            }
        });
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            this.activeModals.push(modal);
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }
    }

    hideModal(modalElement) {
        if (typeof modalElement === 'string') {
            modalElement = document.getElementById(modalElement);
        }
        
        if (modalElement) {
            modalElement.classList.remove('active');
            const index = this.activeModals.indexOf(modalElement);
            if (index > -1) {
                this.activeModals.splice(index, 1);
            }
            
            if (this.activeModals.length === 0) {
                document.body.style.overflow = ''; // Restore scroll
            }
        }
    }

    /**
     * Toast Notifications
     */
    initToastContainer() {
        if (!document.querySelector('.toast-container')) {
            const container = document.createElement('div');
            container.className = 'toast-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                pointer-events: none;
            `;
            document.body.appendChild(container);
        }
    }

    showToast(message, type = 'info', duration = 3000) {
        const container = document.querySelector('.toast-container');
        const toast = document.createElement('div');
        
        toast.className = `toast ${type}`;
        toast.style.cssText = `
            background: white;
            padding: 16px 20px;
            margin-bottom: 10px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            border-left: 4px solid ${this.getToastColor(type)};
            transform: translateX(100%);
            transition: transform 0.3s ease;
            pointer-events: auto;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 18px;">${this.getToastIcon(type)}</span>
                <span style="flex: 1;">${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="border: none; background: none; font-size: 18px; cursor: pointer; color: #666;">×</button>
            </div>
        `;

        container.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 10);

        // Auto remove
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 300);
        }, duration);
    }

    getToastColor(type) {
        const colors = {
            success: '#4CAF50',
            error: '#f44336',
            warning: '#ff9800',
            info: '#2196F3'
        };
        return colors[type] || colors.info;
    }

    getToastIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }

    /**
     * Form Validation Utilities
     */
    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    validatePassword(password, minLength = 6) {
        return password && password.length >= minLength;
    }

    validateRequired(value) {
        return value && value.trim().length > 0;
    }

    validateUsername(username) {
        const regex = /^[a-zA-Z0-9_]+$/;
        return username && username.length >= 3 && regex.test(username);
    }

    /**
     * Loading States
     */
    showLoading(element, text = 'Đang tải...') {
        if (typeof element === 'string') {
            element = document.getElementById(element);
        }
        
        if (element) {
            element.disabled = true;
            element.classList.add('loading');
            
            // Save original content
            if (!element.dataset.originalText) {
                element.dataset.originalText = element.textContent;
            }
            
            element.innerHTML = `
                <span class="loading-spinner" style="
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    border: 2px solid #ccc;
                    border-radius: 50%;
                    border-top-color: currentColor;
                    animation: spin 1s linear infinite;
                    margin-right: 8px;
                "></span>
                ${text}
            `;
        }
    }

    hideLoading(element) {
        if (typeof element === 'string') {
            element = document.getElementById(element);
        }
        
        if (element) {
            element.disabled = false;
            element.classList.remove('loading');
            
            if (element.dataset.originalText) {
                element.textContent = element.dataset.originalText;
                delete element.dataset.originalText;
            }
        }
    }

    /**
     * Table Pagination
     */
    createPagination(data, itemsPerPage = 10, containerId, renderCallback) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const totalPages = Math.ceil(data.length / itemsPerPage);
        let currentPage = 1;

        const renderPage = (page) => {
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const pageData = data.slice(startIndex, endIndex);
            
            renderCallback(pageData);
            this.renderPaginationControls(container, page, totalPages, renderPage);
        };

        renderPage(1);
    }

    renderPaginationControls(container, currentPage, totalPages, onPageChange) {
        let paginationContainer = container.querySelector('.pagination-container');
        
        if (!paginationContainer) {
            paginationContainer = document.createElement('div');
            paginationContainer.className = 'pagination-container';
            paginationContainer.style.cssText = `
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
                margin-top: 20px;
                flex-wrap: wrap;
            `;
            container.appendChild(paginationContainer);
        }

        let paginationHTML = '';

        // Previous button
        if (currentPage > 1) {
            paginationHTML += `
                <button class="pagination-btn" data-page="${currentPage - 1}">‹ Trước</button>
            `;
        }

        // Page numbers
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        if (startPage > 1) {
            paginationHTML += `<button class="pagination-btn" data-page="1">1</button>`;
            if (startPage > 2) {
                paginationHTML += `<span>...</span>`;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            const activeClass = i === currentPage ? 'active' : '';
            paginationHTML += `
                <button class="pagination-btn ${activeClass}" data-page="${i}">${i}</button>
            `;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += `<span>...</span>`;
            }
            paginationHTML += `<button class="pagination-btn" data-page="${totalPages}">${totalPages}</button>`;
        }

        // Next button
        if (currentPage < totalPages) {
            paginationHTML += `
                <button class="pagination-btn" data-page="${currentPage + 1}">Tiếp ›</button>
            `;
        }

        paginationContainer.innerHTML = paginationHTML;

        // Add pagination styles if not exists
        if (!document.querySelector('#pagination-styles')) {
            const style = document.createElement('style');
            style.id = 'pagination-styles';
            style.textContent = `
                .pagination-btn {
                    padding: 8px 12px;
                    border: 1px solid #ddd;
                    background: white;
                    color: #333;
                    cursor: pointer;
                    border-radius: 4px;
                    transition: all 0.2s ease;
                }
                .pagination-btn:hover {
                    background: #f5f5f5;
                }
                .pagination-btn.active {
                    background: var(--primary-blue, #2C6EAA);
                    color: white;
                    border-color: var(--primary-blue, #2C6EAA);
                }
                .pagination-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            `;
            document.head.appendChild(style);
        }

        // Add event listeners
        paginationContainer.querySelectorAll('.pagination-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const page = parseInt(btn.dataset.page);
                onPageChange(page);
            });
        });
    }

    /**
     * Search and Filter
     */
    createSearchFilter(data, searchFields, containerId, renderCallback) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let searchContainer = container.querySelector('.search-container');
        if (!searchContainer) {
            searchContainer = document.createElement('div');
            searchContainer.className = 'search-container';
            searchContainer.style.cssText = `
                margin-bottom: 20px;
                display: flex;
                gap: 12px;
                align-items: center;
                flex-wrap: wrap;
            `;
            container.insertBefore(searchContainer, container.firstChild);
        }

        searchContainer.innerHTML = `
            <input type="text" 
                   id="search-input" 
                   placeholder="Tìm kiếm..." 
                   style="
                       padding: 8px 12px;
                       border: 1px solid #ddd;
                       border-radius: 4px;
                       flex: 1;
                       min-width: 200px;
                   ">
            <button id="clear-search" style="
                padding: 8px 12px;
                background: #f5f5f5;
                border: 1px solid #ddd;
                border-radius: 4px;
                cursor: pointer;
            ">Xóa</button>
        `;

        const searchInput = searchContainer.querySelector('#search-input');
        const clearBtn = searchContainer.querySelector('#clear-search');

        const performSearch = () => {
            const query = searchInput.value.toLowerCase().trim();
            
            if (!query) {
                renderCallback(data);
                return;
            }

            const filteredData = data.filter(item => {
                return searchFields.some(field => {
                    const value = this.getNestedValue(item, field);
                    return value && value.toString().toLowerCase().includes(query);
                });
            });

            renderCallback(filteredData);
        };

        searchInput.addEventListener('input', performSearch);
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            performSearch();
        });
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current && current[key], obj);
    }

    /**
     * Confirmation Dialog
     */
    showConfirm(message, onConfirm, onCancel = null) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 400px;">
                <div class="modal-header">
                    <h3>Xác nhận</h3>
                </div>
                <div class="modal-body">
                    <p>${message}</p>
                </div>
                <div class="modal-footer" style="
                    display: flex;
                    gap: 12px;
                    justify-content: flex-end;
                    padding-top: 16px;
                    border-top: 1px solid #eee;
                    margin-top: 16px;
                ">
                    <button id="cancel-btn" class="btn btn-secondary">Hủy</button>
                    <button id="confirm-btn" class="btn btn-primary">Xác nhận</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        const confirmBtn = modal.querySelector('#confirm-btn');
        const cancelBtn = modal.querySelector('#cancel-btn');

        const cleanup = () => {
            modal.remove();
            document.body.style.overflow = '';
        };

        confirmBtn.addEventListener('click', () => {
            cleanup();
            if (onConfirm) onConfirm();
        });

        cancelBtn.addEventListener('click', () => {
            cleanup();
            if (onCancel) onCancel();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                cleanup();
                if (onCancel) onCancel();
            }
        });
    }

    /**
     * Format Utilities
     */
    formatDate(dateString, format = 'dd/mm/yyyy') {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        switch (format) {
            case 'dd/mm/yyyy':
                return `${day}/${month}/${year}`;
            case 'mm/dd/yyyy':
                return `${month}/${day}/${year}`;
            case 'yyyy-mm-dd':
                return `${year}-${month}-${day}`;
            default:
                return date.toLocaleDateString('vi-VN');
        }
    }

    formatTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleTimeString('vi-VN', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    formatDateTime(dateString) {
        return `${this.formatDate(dateString)} ${this.formatTime(dateString)}`;
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// Initialize UI Manager
const uiManager = new UIManager();

// Export for global use
window.uiManager = uiManager;

// Add loading animation CSS if not exists
if (!document.querySelector('#loading-animation-styles')) {
    const style = document.createElement('style');
    style.id = 'loading-animation-styles';
    style.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
} 
