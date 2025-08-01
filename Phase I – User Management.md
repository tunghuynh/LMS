# Phase I – Module User Management (Frontend HTML/CSS/JS)

## 1. Mục tiêu
- Xây dựng đầy đủ giao diện cho các chức năng quản lý người dùng và lớp học.
- Dữ liệu sử dụng **mock JSON**, không cần backend.
- Giao diện **responsive**, chuyên nghiệp, màu sắc nhẹ nhàng phù hợp ngành giáo dục (tông xanh lam & trắng).
- Hỗ trợ **3 loại user**: Student, Teacher, Admin (login qua 3 cổng riêng).
- Các chức năng chính:
  - Đăng nhập/Đăng ký (3 loại user)
  - Quản lý Hồ sơ (profile, upload avatar, mục tiêu học tập)
  - Danh sách user (Admin)
  - Quản lý lớp học (Admin, Teacher)
  - Lịch sử cá nhân (tiến độ học, quiz)
  - Quên mật khẩu / reset password (mock)
  - User Activity Logs (Admin, mock data)

---

## 2. Cấu trúc Layout Chung
- **Header (cố định)**: Logo hệ thống, tên user (kèm avatar nhỏ), nút logout.
- **Sidebar (desktop)**:
  - Dashboard
  - Courses (Phase II)
  - Quiz (Phase III)
  - Profile
  - Với Admin: Users, Classes, Logs
- **Content area**: Nội dung từng màn hình (bảng, form, card).
- **Footer (cố định)**: Thông tin bản quyền.

Responsive:
- Trên mobile, sidebar ẩn và thay bằng **hamburger menu**.
- Bảng có **scroll ngang** trên màn hình hẹp.

---

## 3. Màn hình chi tiết & Component

### 3.1. Landing Page (`index.html`)
- Mục đích: chọn loại user.
- Layout:
  - Header với logo & tiêu đề.
  - 3 nút lớn (Student, Teacher, Admin) nằm giữa.
- Interaction:
  - Click → chuyển sang trang login tương ứng.

### 3.2. Login Page (`login-student.html`, `login-teacher.html`, `login-admin.html`)
- Center card layout:
  - Input: Username, Password.
  - Checkbox: Remember me.
  - Button: Login.
  - Link: Register.
  - Link: Forgot password (mở modal).
- Logic:
  - Validate với `mock-users.json`.
  - Lưu thông tin user hiện tại vào `localStorage`.

### 3.3. Register Page (`register.html`)
- Form các trường:
  - Username
  - Email
  - Password / Confirm
  - Dropdown chọn Role (Student/Teacher).
- Nút Submit → lưu tạm vào `localStorage` (chưa cần validate phức tạp).

### 3.4. Profile Page (`profile-xxx.html`)
- Card thông tin cá nhân:
  - Avatar (click → chọn file & preview).
  - Username, Email (readonly).
  - Textarea: Mục tiêu học tập (editable).
  - Table: Tiến độ học và quiz từ `mock-users.json`.
  - Button: Save (lưu vào `localStorage`).

### 3.5. User Management (Admin) (`users.html`)
- Bảng danh sách:
  - Cột: Username, Email, Role, Avatar (small), Actions (Edit/Delete).
  - Search box filter theo username.
  - Button: Add User (modal form).
- Pagination (client-side).

### 3.6. Class Management (`classes.html`)
- Dropdown chọn lớp.
- Bảng danh sách thành viên lớp.
- Button: Add Student (modal, chọn từ danh sách user role=student).

### 3.7. User Activity Logs (`logs.html`)
- Table:
  - Cột: User, Action, Timestamp.
  - Filter theo user/date.
- Dữ liệu từ `mock-logs.json`.

---

## 4. Mermaid Use Case

```mermaid
flowchart TD
    A[Landing Page] --> B[Login Student]
    A --> C[Login Teacher]
    A --> D[Login Admin]
    B --> E[Student Dashboard]
    C --> F[Teacher Dashboard]
    D --> G[Admin Dashboard]
    E --> H[Profile]
    F --> H
    G --> H
    G --> I[User Management]
    G --> J[Class Management]
    G --> K[User Activity Logs]
````

---

## 5. Mock Data

### `data/mock-users.json`

```json
[
  {
    "id": 1,
    "username": "student01",
    "password": "123456",
    "email": "student01@example.com",
    "role": "student",
    "avatar": "assets/avatar-student01.png",
    "goal": "Complete 5 courses this semester",
    "progress": {
      "courses": [
        { "courseId": 101, "courseName": "Intro to Programming", "completed": 40 },
        { "courseId": 102, "courseName": "Data Structures", "completed": 70 }
      ],
      "quizzes": [
        { "quizId": 201, "quizName": "Week 1 Quiz", "score": 85 },
        { "quizId": 202, "quizName": "Midterm Quiz", "score": 92 }
      ]
    }
  },
  {
    "id": 2,
    "username": "teacher01",
    "password": "abcdef",
    "email": "teacher01@example.com",
    "role": "teacher",
    "avatar": "assets/avatar-teacher01.png",
    "goal": "Upload 3 new courses",
    "progress": {}
  },
  {
    "id": 3,
    "username": "admin01",
    "password": "admin123",
    "email": "admin@example.com",
    "role": "admin",
    "avatar": "assets/avatar-admin01.png",
    "goal": "",
    "progress": {}
  }
]
```

### `data/mock-classes.json`

```json
[
  {
    "classId": 1,
    "className": "Class A - CS Basics",
    "teacher": "teacher01",
    "students": ["student01", "student02"]
  },
  {
    "classId": 2,
    "className": "Class B - Web Development",
    "teacher": "teacher01",
    "students": ["student03"]
  }
]
```

### `data/mock-logs.json`

```json
[
  { "user": "student01", "action": "Login", "timestamp": "2025-07-28 08:00" },
  { "user": "student01", "action": "Viewed course Intro to Programming", "timestamp": "2025-07-28 08:10" },
  { "user": "teacher01", "action": "Uploaded new lesson PDF", "timestamp": "2025-07-28 09:00" }
]
```

---

## 6. Cách Frontend Sử Dụng Mock Data

```javascript
async function loadUsers() {
  const res = await fetch('data/mock-users.json');
  const users = await res.json();
  console.log(users); // dùng để render bảng hoặc validate login
}

// Lưu thay đổi vào localStorage
function saveUserGoal(userId, goal) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.id === userId);
  if (user) {
    user.goal = goal;
    localStorage.setItem('users', JSON.stringify(users));
  }
}
```

---

## 7. Style Giao Diện

* **Màu chủ đạo**: Xanh lam (#2C6EAA), nền trắng.
* **Font**: Sans-serif (Roboto, Open Sans).
* **Button**: Bo tròn nhẹ (4px), hover đổi màu đậm hơn.
* **Table**: Header xanh nhạt, row hover highlight.
* **Form**: Border bo tròn, shadow nhẹ.
* **Responsive**:

  * <768px: Sidebar thu gọn, bảng có scroll ngang.
  * <480px: Nút và form full width.

