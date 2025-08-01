/**
 * Footer Component - E-Learning Platform
 * Reusable footer component with copyright info, links and responsive design
 * Author: Tùng Huynh 🎨💻
 */

class FooterComponent {
    constructor(options = {}) {
        this.options = {
            containerId: options.containerId || 'footer',
            companyName: options.companyName || 'E-Learning Platform',
            authorName: options.authorName || 'Tùng Huynh',
            year: options.year || new Date().getFullYear(),
            showLinks: options.showLinks !== false,
            showSocial: options.showSocial !== false,
            customLinks: options.customLinks || [],
            customText: options.customText || '',
            theme: options.theme || 'light', // light, dark, minimal
            ...options
        };

        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
    }

    render() {
        const container = document.getElementById(this.options.containerId);
        if (!container) {
            console.error(`Footer container with id '${this.options.containerId}' not found`);
            return;
        }

        container.innerHTML = this.getFooterHTML();
        container.className = `footer footer-${this.options.theme}`;
    }

    getFooterHTML() {
        return `
            <div class="footer-content">
                <div class="footer-main">
                    <div class="footer-brand">
                        <div class="footer-logo">📚 EduPlatform</div>
                        <div class="footer-description">
                            Nền tảng học trực tuyến hiện đại, mang đến trải nghiệm học tập tốt nhất.
                        </div>
                    </div>
                    
                    ${this.options.showLinks ? this.getFooterLinksHTML() : ''}
                    
                    ${this.options.showSocial ? this.getSocialLinksHTML() : ''}
                </div>
                
                <div class="footer-bottom">
                    <div class="footer-copyright">
                        © ${this.options.year} ${this.options.companyName}. 
                        ${this.options.customText || `Phát triển bởi <strong>${this.options.authorName}</strong> 🎨💻`}
                    </div>
                    
                    <div class="footer-legal">
                        <a href="#" onclick="footerComponent.showPrivacy()">Chính sách bảo mật</a>
                        <span class="footer-divider">|</span>
                        <a href="#" onclick="footerComponent.showTerms()">Điều khoản sử dụng</a>
                        <span class="footer-divider">|</span>
                        <a href="#" onclick="footerComponent.showContact()">Liên hệ</a>
                    </div>
                </div>
            </div>
        `;
    }

    getFooterLinksHTML() {
        const defaultLinks = [
            {
                title: 'Học tập',
                links: [
                    { text: 'Khóa học', href: 'courses.html' },
                    { text: 'Quiz', href: 'quizzes.html' },
                    { text: 'Tiến độ', href: 'progress.html' },
                    { text: 'Chứng chỉ', href: '#' }
                ]
            },
            {
                title: 'Hỗ trợ',
                links: [
                    { text: 'Trung tâm trợ giúp', href: '#', onClick: 'footerComponent.showHelp()' },
                    { text: 'Hướng dẫn sử dụng', href: '#', onClick: 'footerComponent.showGuide()' },
                    { text: 'FAQ', href: '#', onClick: 'footerComponent.showFAQ()' },
                    { text: 'Báo lỗi', href: '#', onClick: 'footerComponent.reportBug()' }
                ]
            },
            {
                title: 'Về chúng tôi',
                links: [
                    { text: 'Giới thiệu', href: '#', onClick: 'footerComponent.showAbout()' },
                    { text: 'Đội ngũ', href: '#', onClick: 'footerComponent.showTeam()' },
                    { text: 'Tuyển dụng', href: '#', onClick: 'footerComponent.showCareers()' },
                    { text: 'Tin tức', href: '#', onClick: 'footerComponent.showNews()' }
                ]
            }
        ];

        // Merge with custom links
        const allLinks = [...defaultLinks, ...this.options.customLinks];

        return `
            <div class="footer-links">
                ${allLinks.map(section => `
                    <div class="footer-section">
                        <h4 class="footer-section-title">${section.title}</h4>
                        <ul class="footer-section-links">
                            ${section.links.map(link => `
                                <li>
                                    <a href="${link.href}" 
                                       ${link.onClick ? `onclick="${link.onClick}"` : ''}
                                       class="footer-link">
                                        ${link.text}
                                    </a>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        `;
    }

    getSocialLinksHTML() {
        const socialLinks = [
            { name: 'Facebook', icon: '📘', href: '#', color: '#1877f2' },
            { name: 'Twitter', icon: '🐦', href: '#', color: '#1da1f2' },
            { name: 'LinkedIn', icon: '💼', href: '#', color: '#0077b5' },
            { name: 'YouTube', icon: '📺', href: '#', color: '#ff0000' },
            { name: 'Instagram', icon: '📷', href: '#', color: '#e4405f' },
            { name: 'GitHub', icon: '⚡', href: '#', color: '#333' }
        ];

        return `
            <div class="footer-social">
                <h4 class="footer-section-title">Theo dõi chúng tôi</h4>
                <div class="social-links">
                    ${socialLinks.map(social => `
                        <a href="${social.href}" 
                           class="social-link" 
                           title="${social.name}"
                           data-color="${social.color}"
                           onclick="footerComponent.openSocial('${social.name.toLowerCase()}')">
                            <span class="social-icon">${social.icon}</span>
                        </a>
                    `).join('')}
                </div>
                
                <div class="footer-newsletter">
                    <h5>Đăng ký nhận tin</h5>
                    <div class="newsletter-form">
                        <input type="email" 
                               placeholder="Email của bạn" 
                               class="newsletter-input"
                               id="newsletterEmail">
                        <button class="newsletter-btn" onclick="footerComponent.subscribe()">
                            📧 Đăng ký
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        // Newsletter subscription
        const newsletterInput = document.getElementById('newsletterEmail');
        if (newsletterInput) {
            newsletterInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.subscribe();
                }
            });
        }

        // Social link hover effects
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            const color = link.dataset.color;
            
            link.addEventListener('mouseenter', () => {
                link.style.background = color;
                link.style.color = '#fff';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.background = '';
                link.style.color = '';
            });
        });

        // Responsive adjustments
        this.setupResponsive();
    }

    setupResponsive() {
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        this.handleResize();
    }

    handleResize() {
        const footer = document.querySelector('.footer');
        if (!footer) return;

        if (window.innerWidth <= 768) {
            footer.classList.add('mobile');
        } else {
            footer.classList.remove('mobile');
        }
    }

    // Event Handlers
    subscribe() {
        const emailInput = document.getElementById('newsletterEmail');
        if (!emailInput) return;

        const email = emailInput.value.trim();
        if (!email) {
            this.showMessage('Vui lòng nhập email', 'warning');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showMessage('Email không hợp lệ', 'error');
            return;
        }

        // Mock subscription
        this.showMessage('Đăng ký thành công! Cảm ơn bạn đã theo dõi.', 'success');
        emailInput.value = '';

        // Log activity if available
        if (typeof authManager !== 'undefined' && authManager.logActivity) {
            authManager.logActivity('Newsletter Subscription', `Subscribed email: ${email}`);
        }
    }

    openSocial(platform) {
        const socialUrls = {
            facebook: 'https://facebook.com',
            twitter: 'https://twitter.com',
            linkedin: 'https://linkedin.com',
            youtube: 'https://youtube.com',
            instagram: 'https://instagram.com',
            github: 'https://github.com'
        };

        const url = socialUrls[platform];
        if (url) {
            window.open(url, '_blank');
        }
    }

    // Legal & Info Pages
    showPrivacy() {
        this.showInfoModal('Chính sách Bảo mật', `
            <div style="text-align: left; line-height: 1.6;">
                <h3>1. Thu thập thông tin</h3>
                <p>Chúng tôi thu thập thông tin khi bạn đăng ký, đăng nhập và sử dụng dịch vụ.</p>
                
                <h3>2. Sử dụng thông tin</h3>
                <p>Thông tin được sử dụng để cung cấp và cải thiện dịch vụ học trực tuyến.</p>
                
                <h3>3. Bảo mật</h3>
                <p>Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn bằng các biện pháp bảo mật tiên tiến.</p>
                
                <h3>4. Liên hệ</h3>
                <p>Nếu có thắc mắc về chính sách bảo mật, vui lòng liên hệ với chúng tôi.</p>
            </div>
        `);
    }

    showTerms() {
        this.showInfoModal('Điều khoản Sử dụng', `
            <div style="text-align: left; line-height: 1.6;">
                <h3>1. Chấp nhận điều khoản</h3>
                <p>Bằng việc sử dụng dịch vụ, bạn đồng ý với các điều khoản được nêu ra.</p>
                
                <h3>2. Quyền và nghĩa vụ</h3>
                <p>Người dùng có quyền truy cập các khóa học và nghĩa vụ tuân thủ quy định.</p>
                
                <h3>3. Nội dung</h3>
                <p>Mọi nội dung trên nền tảng đều thuộc bản quyền của chúng tôi.</p>
                
                <h3>4. Chấm dứt</h3>
                <p>Chúng tôi có quyền chấm dứt tài khoản vi phạm điều khoản.</p>
            </div>
        `);
    }

    showContact() {
        this.showInfoModal('Thông tin Liên hệ', `
            <div style="text-align: left; line-height: 1.6;">
                <h3>📧 Email</h3>
                <p>support@eduplatform.com</p>
                
                <h3>📞 Hotline</h3>
                <p>1900-xxxx (8:00 - 22:00)</p>
                
                <h3>🏢 Địa chỉ</h3>
                <p>123 Đường ABC, Quận XYZ, TP.HCM</p>
                
                <h3>🕒 Giờ làm việc</h3>
                <p>Thứ 2 - Thứ 6: 8:00 - 18:00<br>
                   Thứ 7 - Chủ nhật: 9:00 - 17:00</p>
                
                <div style="margin-top: 20px;">
                    <button class="btn btn-primary" onclick="footerComponent.openChat()">
                        💬 Chat trực tuyến
                    </button>
                </div>
            </div>
        `);
    }

    showHelp() {
        this.showMessage('Trang trợ giúp sẽ được triển khai trong phiên bản tiếp theo', 'info');
    }

    showGuide() {
        this.showMessage('Hướng dẫn sử dụng sẽ được triển khai trong phiên bản tiếp theo', 'info');
    }

    showFAQ() {
        this.showMessage('Trang FAQ sẽ được triển khai trong phiên bản tiếp theo', 'info');
    }

    reportBug() {
        this.showMessage('Tính năng báo lỗi sẽ được triển khai trong phiên bản tiếp theo', 'info');
    }

    showAbout() {
        this.showInfoModal('Về chúng tôi', `
            <div style="text-align: left; line-height: 1.6;">
                <h3>🎯 Sứ mệnh</h3>
                <p>Mang đến nền tảng học trực tuyến hiện đại và hiệu quả nhất.</p>
                
                <h3>👁️ Tầm nhìn</h3>
                <p>Trở thành nền tảng giáo dục trực tuyến hàng đầu Việt Nam.</p>
                
                <h3>⭐ Giá trị cốt lõi</h3>
                <ul>
                    <li>Chất lượng giáo dục</li>
                    <li>Công nghệ tiên tiến</li>
                    <li>Trải nghiệm người dùng</li>
                    <li>Hỗ trợ tận tình</li>
                </ul>
            </div>
        `);
    }

    showTeam() {
        this.showMessage('Thông tin đội ngũ sẽ được triển khai trong phiên bản tiếp theo', 'info');
    }

    showCareers() {
        this.showMessage('Trang tuyển dụng sẽ được triển khai trong phiên bản tiếp theo', 'info');
    }

    showNews() {
        this.showMessage('Trang tin tức sẽ được triển khai trong phiên bản tiếp theo', 'info');
    }

    openChat() {
        this.showMessage('Tính năng chat trực tuyến sẽ được triển khai trong phiên bản tiếp theo', 'info');
    }

    // Utility Methods
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showMessage(message, type = 'info') {
        if (typeof uiManager !== 'undefined' && uiManager.showToast) {
            uiManager.showToast(message, type);
        } else {
            alert(message);
        }
    }

    showInfoModal(title, content) {
        if (typeof uiManager !== 'undefined' && uiManager.showModal) {
            // Create a temporary modal
            const modalHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title">${title}</h2>
                        <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                </div>
            `;
            uiManager.showModal('infoModal', title, content);
        } else {
            alert(title + '\n\n' + content.replace(/<[^>]*>/g, ''));
        }
    }

    updateYear(year) {
        this.options.year = year || new Date().getFullYear();
        this.render();
    }

    updateAuthor(authorName) {
        this.options.authorName = authorName;
        this.render();
    }

    updateTheme(theme) {
        this.options.theme = theme;
        this.render();
    }

    // Static methods
    static create(containerId, options = {}) {
        return new FooterComponent({
            containerId,
            ...options
        });
    }

    static initDefault() {
        const footerElement = document.getElementById('footer');
        if (footerElement) {
            return new FooterComponent({
                containerId: 'footer',
                year: 2025,
                authorName: 'Tùng Huynh'
            });
        }
        return null;
    }
}

// Auto-initialize footer component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if footer element exists and component hasn't been manually created
    if (document.getElementById('footer') && typeof window.footerComponent === 'undefined') {
        window.footerComponent = FooterComponent.initDefault();
    }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FooterComponent;
} 
