# 📋 TODO LIST - PHASE I E-LEARNING SYSTEM

## 🎯 Mục tiêu Phase I
Xây dựng đầy đủ frontend HTML/CSS/JS cho 3 modules: User Management, Learning System, Testing System với mock data.

---

## 📂 1. SETUP PROJECT STRUCTURE
- [x] Tạo cấu trúc thư mục cơ bản
- [x] Tạo file HTML templates
- [x] Tạo CSS global styles
- [x] Tạo JavaScript utilities
- [x] Setup mock data files
- [x] Tạo assets folder (images, icons)

---

## 👤 2. USER MANAGEMENT MODULE (I.1)

### 2.1 Authentication (I.1.1)
- [x] **Landing Page** (`index.html`)
  - [x] Layout chọn role: Student/Teacher/Admin
  - [x] Responsive design
  - [x] CSS styling theo style guide

- [x] **Login Pages** (`login-student.html`, `login-teacher.html`, `login-admin.html`)
  - [x] Login form với validation
  - [x] Remember me checkbox
  - [x] Forgot password modal
  - [x] JavaScript login logic với mock data
  - [x] LocalStorage để lưu session

- [x] **Register Page** (`register.html`)
  - [x] Form đăng ký với validation
  - [x] Email/password validation
  - [x] Role selection
  - [x] JavaScript xử lý đăng ký

- [x] **Forgot Password Modal**
  - [x] Form nhập email
  - [x] Mock email sending
  - [x] Reset password flow

- [x] **Dashboard Pages** (`dashboard-student.html`, `dashboard-teacher.html`, `dashboard-admin.html`)
  - [x] Role-specific dashboards
  - [x] Statistics và overview
  - [x] Quick actions
  - [x] Recent activities
  - [x] Hoàn thiện các thông tin Hoạt động gần đây, Khóa học của tôi trong `dashboard-student.html`
  - [x] Hiển thị thêm role ở dưới `header-username` trong cả 3 dashboard
  - [x] Hiển thị thêm role ở dưới `header-username` trong tất cả các màn hình của hệ thống

### 2.2 Profile Management (I.1.2)
- [x] **Profile Page** (`profile-xxx.html`)
  - [x] View/edit thông tin cá nhân
  - [x] Avatar upload với preview
  - [x] Mục tiêu học tập (editable)
  - [x] Tiến độ học/quiz history
  - [x] Save changes to localStorage
  - [x] Profile đặc thù cho giáo viên (`profile-teacher.html`)
  - [x] Sửa Profile cho giáo viên chỉ có các tab liên quan đến lịch giảng dạy, thông tin cá nhân, cài đặt, Thành tích liên quan đến số lượng bài giảng và đánh giá về chất lượng bài giảng
  - [x] Profile đặc thù cho admin (`profile-admin.html`)
  - [x] Sửa Profile cho admin chỉ có các tab liên quan đến thông tin cá nhân, cài đặt

### 2.3 User & Class Management (I.1.3) - Admin/Teacher
- [x] **Users Management** (`users.html`)
  - [x] Table danh sách users
  - [x] Search/filter functionality
  - [x] Add/Edit/Delete users
  - [x] Pagination
  - [x] Modal forms
  - [x] Phân quyền sử dụng theo role
  - [x] Màn hình phân quyền chức năng cho role dạng TableTree gồm:
    - [x] Row là Danh sách các chức năng, cấp row nhỏ hơn của chức năng là các button tương ứng trong từng màn hình
    - [x] Col là 3 role Admin/Teacher/Student. Các cột có checkbox để tick phân quyền cho role nào được sử dụng chức năng gì

- [x] **Class Management** (`classes.html`)
  - [x] Dropdown chọn lớp
  - [x] Table thành viên lớp
  - [x] Add student to class
  - [x] Modal chọn students

### 2.4 Tracking & Logs (I.1.4)
- [x] **Activity Logs** (`logs.html`)
  - [x] Table logs với filter
  - [x] Mock activity data
  - [x] Date/user filtering

---

## 📚 3. LEARNING SYSTEM MODULE (I.2)

### 3.1 Course Management (I.2.1 & I.2.2)
- [x] **Courses List** (`categories.html`) Dành cho Admin và Teacher
  - [x] Search & category filter
  - [x] Pagination
  - [x] Teacher/Admin: Thêm/sửa/xóa
  - [x] Liên kết với chức năng Courses List (là category của khóa học, có thể chọn/filter trong màn hình courses)

- [x] **Courses List** (`courses.html`)
  - [x] Grid card layout
  - [x] Course thumbnails
  - [x] Search & category filter
  - [x] Pagination
  - [x] Teacher: Add course button
  - [x] Hoàn thiện chức năng tạo khóa học (`course-create.html`)
  - [x] Hoàn thiện chức năng sửa khóa học (`course-edit.html`)
  - [x] Hoàn thiện chức năng xem chi tiết khóa học (`course-detail.html`)

- [x] **Course Detail** (`course-detail.html`)
  - [x] Course info display
  - [x] Tabs: Lessons/Progress/Enrollment
  - [x] Lesson list với status
  - [x] Teacher: Enrollment management
  - [x] Xử lý lỗi không mở được course-detail.html
  - [x] Hoàn thiện chức năng cho sinh viên đăng ký học

### 3.2 Lesson Management (I.2.3)
- [x] **Lesson Viewer** (`lesson.html`)
  - [x] Video player (YouTube embed)
  - [x] PDF preview (iframe)
  - [x] Markdown renderer
  - [x] Sidebar lesson navigation
  - [x] "Mark as Completed" button
  - [x] Progress tracking
  - [x] Hoàn thiện chức năng tạo bài học (`lesson-create.html`)
  - [x] Hoàn thiện chức năng preview Markdown, PDF, Video YTB của các bài học trong `lesson.html`
  - [x] Bổ sung các mock data để kiểm thử các định dạng bài học bằng Markdown, PDF, Video YTB

### 3.3 Enrollment Management (I.2.4)
- [x] **Enrollment Page** (`enrollments.html`)
  - [x] Student: Course registration
  - [x] Teacher: Approve/Deny requests
  - [x] Status tracking
  - [x] Hoàn thiện chức năng xem thông tin học viên đăng ký, duyệt, từ chối

- [x] **Progress Dashboard** (`progress.html`)
  - [x] Student progress overview
  - [x] Chart.js integration
  - [x] Detailed progress table

---

## 🧪 4. TESTING SYSTEM MODULE (I.3)

### 4.1 Quiz Management (I.3.1 & I.3.2)
- [x] **Quiz List** (`quizzes.html`)
  - [x] Table với filter
  - [x] Student: Register/Take quiz
  - [x] Teacher: Create quiz button
  - [x] Status indicators

- [x] **Quiz Builder** (`quiz-builder.html`)
  - [x] Create quiz form
  - [x] Question types: text/radio/checkbox
  - [x] Add/remove questions
  - [x] Preview modal
  - [x] Import Excel (mock)
  - [x] Save quiz

### 4.2 Quiz Execution (I.3.3)
- [x] **Quiz Attempt** (`quiz-attempt.html`)
  - [x] Question navigation
  - [x] Timer countdown
  - [x] Answer saving
  - [x] Submit quiz
  - [x] Progress indicator

- [x] **Quiz Results** (`quiz-results.html`)
  - [x] Student: Personal results
  - [x] Teacher/Admin: All results table
  - [x] Score breakdown
  - [x] Export functionality (mock)
  - [x] Hoàn thiện chức năng xem chi tiết kết quả Quizz

### 4.3 Quiz Templates (I.3.2.2)
- [x] **Quiz Templates** (`quiz-templates.html`) - *Integrated into Quiz Builder*
  - [x] Template library
  - [x] Apply template button
  - [x] Template management

---

## 🎨 5. COMMON COMPONENTS & STYLING

### 5.1 Layout Components
- [x] **Header Component**
  - [x] Logo + user info + logout
  - [x] Responsive design
  - [x] Consistent across pages

- [x] **Sidebar Component**
  - [x] Navigation menu
  - [x] Role-based menu items
  - [x] Hamburger menu for mobile
  - [x] Active state highlighting

- [x] **Footer Component**
  - [x] Copyright info + links
  - [x] Responsive design
  - [x] Consistent across pages

### 5.2 Global Styling
- [x] **CSS Reset & Base**
  - [x] Normalize CSS
  - [x] Typography (Roboto font)
  - [x] Color variables (#2C6EAA theme)

- [x] **Component Styles**
  - [x] Button styles (primary/secondary)
  - [x] Form styles với validation
  - [x] Table styles với hover
  - [x] Card styles với shadow
  - [x] Modal styles

- [x] **Responsive Design**
  - [x] Mobile-first approach
  - [x] Breakpoints: 768px, 1024px
  - [x] Grid system
  - [x] Table horizontal scroll
  
- [x] General Functional
  - [x] Dark/Light theme mode
  - [ ] Multi-language

### 5.3 JavaScript Utilities
- [x] **Auth Utils** (`js/auth.js`)
  - [x] Login/logout functions
  - [x] Session management
  - [x] Role checking

- [x] **API Utils** (`js/api.js`)
  - [x] Mock data loading
  - [x] LocalStorage operations
  - [x] Data management

- [x] **UI Utils** (`js/ui.js`)
  - [x] Modal functions
  - [x] Toast notifications
  - [x] Form validation
  - [x] Table pagination

---

## 📁 6. MOCK DATA SETUP
- [x] **User Data** (`data/mock-users.json`)
  - [x] Students, Teachers, Admins
  - [x] Progress data
  - [x] Goals & history

- [x] **Course Data** (`data/mock-courses.json`)
  - [x] Courses với lessons
  - [x] Categories
  - [x] Enrollment data

- [x] **Quiz Data** (`data/mock-quizzes.json`)
  - [x] Questions & answers
  - [x] Quiz templates
  - [x] Results data

- [x] **Activity Logs** (`data/mock-logs.json`)
  - [x] User activities
  - [x] Timestamps

---

## 📁 7. Landing page (`index.html`)
 - [x] Xây dựng trang landing page với mục đích quảng bá sản phẩm và là cổng đăng nhập vào hệ thống theo từng role
---

## 🚀 8. FINAL STEPS
- [ ] **Testing & Bug Fixes**
  - [ ] Cross-browser testing
  - [ ] Mobile responsiveness
  - [ ] Form validation
  - [ ] Data persistence

- [x] **Documentation**
  - [x] README.md với hướng dẫn
  - [x] Code comments
  - [x] File structure guide

- [ ] **Optimization**
  - [ ] CSS minification
  - [ ] Image optimization
  - [ ] Performance check

## 🔧 9. FEATURE ENHANCEMENTS
- [x] **Import Excel trong Quiz Builder**
  - [x] Modal import với template mẫu
  - [x] Validation file Excel
  - [x] Chức năng tải template
  - [x] Mock import câu hỏi từ Excel

- [x] **Course Management Modal**
  - [x] Modal quản lý khóa học với tabs
  - [x] Thống kê tổng quan
  - [x] Danh sách học viên và progress
  - [x] Cài đặt khóa học
  - [x] Export báo cáo

- [x] **Course Preview System**
  - [x] Modal xem trước khóa học
  - [x] Tab giới thiệu, nội dung, giảng viên
  - [x] Preview bài học
  - [x] Course highlights

- [x] **Certificate System**
  - [x] Modal hiển thị chứng chỉ
  - [x] Template chứng chỉ đẹp
  - [x] Chức năng tải xuống
  - [x] Chia sẻ chứng chỉ

- [x] **Messaging System**
  - [x] Modal gửi tin nhắn cho học viên
  - [x] Template tin nhắn nhanh
  - [x] Tùy chọn tin nhắn quan trọng
  - [x] Lưu trữ tin nhắn trong localStorage

- [x] **Navigation Enhancements**
  - [x] Thêm link Categories vào sidebar Admin/Teacher
  - [x] Thêm link Permissions vào sidebar Admin
  - [x] Link từ dashboard đến các chức năng

---

## 📅 Menu sidebar
  - Dashboard `dashboard-student.html`, `dashboard-teacher.html`, `dashboard-admin.html`
  - Quản lý lớp học `classes.html`
    + Học viên
    + Thêm/Xóa học viên
    + ... các chức năng khác đang có...
  - Quản lý người dùng 
    - Danh sách người dùng `users.html`
      + Thêm/Sửa/Xóa người dùng
      + ... các chức năng khác đang có...
    - Phân quyền người dùng `permission.html`
  - Quản lý khóa học
    - Danh mục loại khóa học `categories.html`
      + Tạo/Sửa/Xóa Loại khóa học
      + ... các chức năng khác đang có...
    - Khóa học `courses.html`
      + Tạo/Sửa/Xóa Khóa học `courses-edit.html`, `courses-create.html`, `courses-detail.html`
      + Học viên
      + Thêm/Xóa học viên
      + Đăng ký học 
      + Phê duyệt đăng ký học `enrollments.html`
      + ... các chức năng khác đang có...
    - Bài học `lesson.html`
      + Teacher: Tạo/Sửa/Xóa Bài học `lesson-create.html`
      + Student: Vào học
      + ... các chức năng khác đang có...
  - Quản lý bài thi
    - Bài thi `quizzes.html`
      + Danh sách bài thi
      + Đăng ký thi
      + Phê duyệt đăng ký thi
      + Làm bài thi `quiz-attempt.html`
      + Tạo/Sửa/Xóa bài thi `quiz-builder.html`
    - Kết quả thi `quiz-results.html`
      + ... các chức năng khác đang có...
  - Profile `profile-student.html`, `profile-teacher.html`, `profile-admin.html`
    + ... các chức năng khác đang có...
  - Cài đặt
    + ... các chức năng khác đang có...
---

## 📅 Yêu cầu phân quyền
- Admin: Full quyền tất cả các chức năng của hệ thống
- Teacher: Có quyền full vào cụm chức năng Quản lý khóa học và Quản lý bài thi
- Student: có các quyền
  + Xem, tìm kiếm danh sách khóa học, bài học. Không được sửa xóa
  + Xem, tìm kiếm danh sách bài thi. Không được sửa xóa
  + Đăng ký tham gia bài học, bài thi. Không dược xem danh sách sinh viên khác đã đăng ký
  + Có thể vào bài học, vào bài thi, Làm bài thi
  + Xem kết quả thi
* Các cụm chức năng về dashboard, profile, setting: Được quyền truy cập theo từng role đi với từng file html

---

## 📅 TIMELINE ESTIMATE
- **Week 1**: Project setup + User Management
- **Week 2**: Learning System
- **Week 3**: Testing System  
- **Week 4**: Integration + Polish

---

## 🔧 TECH STACK
- **HTML5**: Semantic markup
- **CSS3**: Flexbox/Grid, responsive
- **Vanilla JavaScript**: No frameworks
- **Mock Data**: JSON files
- **Storage**: LocalStorage
- **Icons**: Font Awesome hoặc SVG
- **Charts**: Chart.js (for progress)

---

**🎯 SUCCESS CRITERIA:**
✅ Tất cả 3 modules hoạt động đầy đủ với mock data  
✅ Responsive trên mobile/desktop  
✅ UI/UX theo style guide (#2C6EAA theme)  
✅ Code clean, có comments, dễ maintain  
✅ Có thể demo đầy đủ user flows 