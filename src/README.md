# 📚 EduPlatform - E-Learning Platform

> Nền tảng học trực tuyến hiện đại được phát triển với HTML5, CSS3 và Vanilla JavaScript

![EduPlatform Banner](https://via.placeholder.com/800x300/2C6EAA/FFFFFF?text=📚+EduPlatform)

## 📖 Mục lục

- [Giới thiệu](#giới-thiệu)
- [Tính năng](#tính-năng)
- [Cài đặt](#cài-đặt)
- [Hướng dẫn sử dụng](#hướng-dẫn-sử-dụng)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Tài khoản demo](#tài-khoản-demo)
- [API Documentation](#api-documentation)
- [Đóng góp](#đóng-góp)
- [Giấy phép](#giấy-phép)

## 🎯 Giới thiệu

**EduPlatform** là một nền tảng học trực tuyến toàn diện được thiết kế để phục vụ ba nhóm người dùng chính:

- **👨‍🎓 Học viên**: Tham gia khóa học, làm quiz, theo dõi tiến độ
- **👨‍🏫 Giảng viên**: Tạo khóa học, quản lý quiz, theo dõi học viên
- **👨‍💼 Quản trị viên**: Quản lý hệ thống, người dùng, thống kê

### ✨ Đặc điểm nổi bật

- **🚀 Hiệu năng cao**: Xây dựng với Vanilla JavaScript, không phụ thuộc framework
- **📱 Responsive**: Tương thích hoàn hảo trên mọi thiết bị
- **🎨 UI/UX hiện đại**: Thiết kế theo Material Design và best practices
- **🔒 Bảo mật**: Role-based access control và session management
- **💾 Offline-ready**: Sử dụng localStorage cho data persistence

## 🌟 Tính năng

### 👨‍🎓 Dành cho Học viên
- ✅ Đăng ký/Đăng nhập với xác thực
- ✅ Dashboard cá nhân với thống kê tiến độ
- ✅ Duyệt và tham gia khóa học
- ✅ Xem nội dung đa dạng (Video YouTube, PDF, Markdown)
- ✅ Làm quiz với hệ thống chấm điểm tự động
- ✅ Theo dõi tiến độ học tập chi tiết
- ✅ Quản lý hồ sơ cá nhân

### 👨‍🏫 Dành cho Giảng viên
- ✅ Dashboard giảng viên với thống kê khóa học
- ✅ Tạo và quản lý khóa học
- ✅ Quiz Builder với nhiều loại câu hỏi
- ✅ Quản lý học viên và theo dõi tiến độ
- ✅ Xem kết quả quiz và thống kê
- ✅ Hồ sơ giảng viên chuyên nghiệp

### 👨‍💼 Dành cho Quản trị viên
- ✅ Dashboard tổng quan với Chart.js
- ✅ Quản lý người dùng (CRUD operations)
- ✅ Quản lý khóa học và lớp học
- ✅ Thống kê và báo cáo chi tiết
- ✅ Nhật ký hoạt động (Activity logs)
- ✅ Cài đặt hệ thống

## 🛠️ Cài đặt

### Yêu cầu hệ thống
- **Web browser**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Web server**: Bất kỳ (Apache, Nginx, hoặc dev server)

### Cài đặt cơ bản

1. **Clone repository**
```bash
git clone https://github.com/tunghuynh/eduplatform.git
cd eduplatform
```

2. **Chạy development server**
```bash
# Sử dụng Python
python -m http.server 8000

# Hoặc Node.js
npx http-server

# Hoặc PHP
php -S localhost:8000
```

3. **Truy cập ứng dụng**
```
http://localhost:8000/src/
```

### Cài đặt nâng cao

#### Với Docker
```bash
docker run -d -p 8080:80 -v $(pwd)/src:/usr/share/nginx/html nginx:alpine
```

#### Với VS Code Live Server
1. Cài đặt extension "Live Server"
2. Right-click vào `src/index.html`
3. Chọn "Open with Live Server"

## 📘 Hướng dẫn sử dụng

### 🚀 Bắt đầu nhanh

1. **Truy cập trang chủ**: Mở `src/index.html`
2. **Chọn vai trò**: Sử dụng tài khoản demo có sẵn
3. **Khám phá tính năng**: Theo hướng dẫn trong từng role

### 🔑 Đăng nhập

#### Cách 1: Sử dụng tài khoản demo
Tại trang chủ, click vào nút "Đăng nhập" trong phần Demo accounts.

#### Cách 2: Đăng nhập thủ công
1. Chọn role phù hợp từ trang chủ
2. Nhập thông tin đăng nhập
3. Click "Đăng nhập"

### 📚 Sử dụng các tính năng chính

#### Tạo khóa học mới (Giảng viên)
1. Truy cập **Dashboard** → **Quản lý khóa học**
2. Click **"+ Tạo khóa học mới"**
3. Điền thông tin khóa học
4. Thêm lessons và upload nội dung
5. Publish khóa học

#### Tạo Quiz (Giảng viên)
1. Truy cập **Quiz Builder**
2. Chọn khóa học liên kết
3. Thêm câu hỏi (Multiple choice, True/False, Essay)
4. Cấu hình thời gian và điều kiện
5. Lưu và publish quiz

#### Quản lý người dùng (Admin)
1. Truy cập **Quản lý người dùng**
2. Sử dụng bộ lọc để tìm kiếm
3. Thêm/Sửa/Xóa người dùng
4. Phân quyền theo role

## 📁 Cấu trúc dự án

```
src/
├── 📄 index.html                 # Landing page
├── 🔐 Authentication Pages
│   ├── login-student.html
│   ├── login-teacher.html
│   ├── login-admin.html
│   └── register.html
├── 📊 Dashboard Pages
│   ├── dashboard-student.html
│   ├── dashboard-teacher.html
│   └── dashboard-admin.html
├── 👤 Profile Pages
│   ├── profile-student.html      # Student profile
│   ├── profile-teacher.html      # Teacher-specific
│   └── profile-admin.html        # Admin-specific
├── 📚 Learning System
│   ├── courses.html              # Course listing
│   ├── course-detail.html        # Course details
│   ├── lesson.html               # Lesson viewer
│   ├── progress.html             # Progress tracking
│   └── enrollments.html          # Enrollment management
├── 🧪 Testing System
│   ├── quizzes.html              # Quiz listing
│   ├── quiz-builder.html         # Quiz creation
│   ├── quiz-attempt.html         # Take quiz
│   └── quiz-results.html         # View results
├── 👥 User Management
│   ├── users.html                # User management
│   ├── classes.html              # Class management
│   └── logs.html                 # Activity logs
├── 🎨 Assets
│   ├── css/
│   │   ├── reset.css             # CSS reset
│   │   ├── variables.css         # CSS variables
│   │   ├── components.css        # UI components
│   │   └── layout.css            # Layout styles
│   ├── js/
│   │   ├── auth.js               # Authentication logic
│   │   ├── ui.js                 # UI utilities
│   │   ├── api.js                # API utilities
│   │   └── components/           # Reusable components
│   │       ├── header.js
│   │       ├── menu-manager.js      # Quản lý menu chung với permissions
│   │       └── footer.js
│   ├── data/                     # Mock data
│   │   ├── mock-users.json
│   │   ├── mock-courses.json
│   │   ├── mock-quizzes.json
│   │   └── mock-logs.json
│   └── assets/                   # Static assets
│       ├── images/
│       ├── lessons/
│       └── icons/
```

## 🎭 Tài khoản demo

### 👨‍🎓 Học viên
```
Username: student
Password: student123
```
**Tính năng có thể truy cập:**
- Dashboard cá nhân
- Duyệt khóa học
- Làm quiz
- Theo dõi tiến độ

### 👨‍🏫 Giảng viên
```
Username: teacher  
Password: teacher123
```
**Tính năng có thể truy cập:**
- Tạo và quản lý khóa học
- Quiz Builder
- Quản lý học viên
- Xem thống kê

### 👨‍💼 Quản trị viên
```
Username: admin
Password: admin123
```
**Tính năng có thể truy cập:**
- Tất cả tính năng của hệ thống
- Quản lý người dùng
- Thống kê tổng quan
- Cài đặt hệ thống

## 🔗 API Documentation

### Authentication API

#### Login
```javascript
authManager.login({ username, password })
  .then(result => {
    if (result.success) {
      // Đăng nhập thành công
      window.location.href = result.dashboardUrl;
    }
  });
```

#### Logout
```javascript
authManager.logout();
```

#### Check Authentication
```javascript
if (authManager.isLoggedIn()) {
  const user = authManager.getCurrentUser();
  console.log('Current user:', user);
}
```

### Data Management API

#### Load Data
```javascript
// Load users
const users = await apiManager.loadUsers();

// Load courses  
const courses = await apiManager.loadCourses();

// Load quizzes
const quizzes = await apiManager.loadQuizzes();
```

#### CRUD Operations
```javascript
// Create user
const result = await apiManager.createUser(userData);

// Update user
const result = await apiManager.updateUser(userId, userData);

// Delete user
const result = await apiManager.deleteUser(userId);
```

### UI Utilities

#### Show Toast Notification
```javascript
uiManager.showToast('Message', 'success'); // success, error, warning, info
```

#### Show Modal
```javascript
uiManager.showModal('modalId', 'Title', 'Content');
```

#### Form Validation
```javascript
const isValid = uiManager.validateEmail(email);
const isValid = uiManager.validatePassword(password);
```

## 🎨 Customization

### Thay đổi Theme Colors

Chỉnh sửa file `css/variables.css`:

```css
:root {
  --primary-blue: #2C6EAA;     /* Màu chính */
  --accent-green: #4CAF50;     /* Màu phụ */
  --accent-red: #F44336;       /* Màu cảnh báo */
  /* ... */
}
```

### Thêm Component mới

1. Tạo file component trong `js/components/`
2. Thêm CSS styles trong `css/components.css`
3. Import và sử dụng trong các page

### Custom Mock Data

Chỉnh sửa các file trong `data/`:
- `mock-users.json`: Dữ liệu người dùng
- `mock-courses.json`: Dữ liệu khóa học
- `mock-quizzes.json`: Dữ liệu quiz
- `mock-logs.json`: Dữ liệu nhật ký

## 🧪 Testing

### Manual Testing Checklist

#### ✅ Cross-browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)  
- [ ] Safari (latest)
- [ ] Edge (latest)

#### ✅ Responsive Testing
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

#### ✅ Feature Testing
- [ ] Authentication flow
- [ ] Course enrollment
- [ ] Quiz taking
- [ ] Data persistence
- [ ] Role-based access

### Automated Testing

```bash
# Chạy tests (sẽ implement trong tương lai)
npm test
```

## 🚀 Deployment

### GitHub Pages
1. Push code lên GitHub repository
2. Vào Settings → Pages
3. Chọn source branch
4. Set folder thành `/src`

### Netlify
1. Connect GitHub repository
2. Set build command: (empty)
3. Set publish directory: `src`

### Traditional Hosting
1. Upload folder `src/` lên hosting
2. Point domain đến folder này
3. Đảm bảo web server hỗ trợ HTML5 history mode

## 🤝 Đóng góp

Chúng tôi hoan nghênh mọi đóng góp! Hãy follow các bước sau:

### Quy trình đóng góp

1. **Fork** repository này
2. **Clone** fork về máy local
```bash
git clone https://github.com/your-username/eduplatform.git
```
3. **Tạo branch** cho feature mới
```bash
git checkout -b feature/amazing-feature
```
4. **Commit** changes
```bash
git commit -m "Add amazing feature"
```
5. **Push** lên branch
```bash
git push origin feature/amazing-feature
```
6. **Tạo Pull Request**

### Coding Standards

- **HTML**: Semantic markup, accessibility compliant
- **CSS**: BEM methodology, mobile-first approach
- **JavaScript**: ES6+, JSDoc comments, error handling
- **Commit**: Conventional commits format

### Bug Reports

Khi báo bug, hãy include:
- Browser và version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (nếu có)

## 📋 Roadmap

### Phase II (Coming Soon)
- [ ] **Backend Integration**
  - [ ] REST API với Node.js/Express
  - [ ] Database (MongoDB/PostgreSQL)
  - [ ] Authentication với JWT

- [ ] **Advanced Features**
  - [ ] Real-time chat
  - [ ] Video conferencing
  - [ ] Advanced analytics
  - [ ] Mobile app (React Native)

- [ ] **Enhanced UX**
  - [ ] Dark mode
  - [ ] Multi-language support
  - [ ] Advanced search
  - [ ] Offline mode

### Phase III (Future)
- [ ] **AI Integration**
  - [ ] Smart recommendations
  - [ ] Auto-grading essays
  - [ ] Learning path optimization

- [ ] **Enterprise Features**
  - [ ] SSO integration
  - [ ] Advanced reporting
  - [ ] White-label solutions

## 📞 Hỗ trợ

### 📧 Liên hệ
- **Email**: support@eduplatform.com
- **GitHub Issues**: [Create new issue](https://github.com/tunghuynh/eduplatform/issues)

### 📚 Tài liệu
- **Wiki**: [GitHub Wiki](https://github.com/tunghuynh/eduplatform/wiki)
- **FAQ**: [Frequently Asked Questions](docs/FAQ.md)

### 🐛 Báo lỗi
- **Bug Reports**: [GitHub Issues](https://github.com/tunghuynh/eduplatform/issues)
- **Security Issues**: security@eduplatform.com

## 📄 Giấy phép

Dự án này được cấp phép theo **MIT License** - xem file [LICENSE](LICENSE) để biết chi tiết.

```
MIT License

Copyright (c) 2025 Tùng Huynh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

## 🙏 Acknowledgments

- **Icons**: Emoji icons cho consistency across platforms
- **Fonts**: Google Fonts (Roboto family)
- **Charts**: Chart.js cho data visualization
- **Inspiration**: Các nền tảng học trực tuyến hàng đầu

---

## 🎯 Quick Start Guide

### Để bắt đầu ngay:

1. **Clone & Run**
```bash
git clone https://github.com/tunghuynh/eduplatform.git
cd eduplatform
python -m http.server 8000
```

2. **Open Browser**
```
http://localhost:8000/src/
```

3. **Login Demo**
- Student: `student/student123`
- Teacher: `teacher/teacher123`  
- Admin: `admin/admin123`

4. **Explore Features**
- Tạo khóa học
- Làm quiz
- Xem thống kê

---

<div align="center">

**📚 EduPlatform** - *Nền tảng học trực tuyến hiện đại*

Phát triển với ❤️ bởi **Tùng Huynh** 🎨💻

⭐ **Star** project này nếu bạn thấy hữu ích!

[🏠 Homepage](src/index.html) • [📖 Docs](docs/) • [🐛 Issues](https://github.com/tunghuynh/eduplatform/issues) • [💬 Discussions](https://github.com/tunghuynh/eduplatform/discussions)

</div> 