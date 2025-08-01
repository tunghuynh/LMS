# Phase I – Module Learning System (Frontend HTML/CSS/JS)

## 1. Mục tiêu
- Xây dựng đầy đủ giao diện cho các chức năng **quản lý khóa học, bài học, và tiến độ học tập**.
- Dữ liệu sử dụng **mock JSON**.
- Giao diện **responsive**, tông màu xanh lam + trắng, phù hợp ngành giáo dục.
- Hỗ trợ 3 loại user:
  - **Student**: Xem khóa học, đăng ký, học bài, theo dõi tiến độ.
  - **Teacher**: Tạo/Quản lý khóa học và bài học, duyệt đăng ký học.
  - **Admin**: Giám sát (chỉ xem).

---

## 2. Layout Chung
- **Header (cố định)**: Logo, tên user (avatar), nút logout.
- **Sidebar (desktop)**:
  - Dashboard  
  - Courses  
  - Lessons  
  - Enrollments (Teacher/Admin)  
  - Progress (Student)  
  - Quizzes (Phase III)
- **Content area**: Table hoặc Card view.
- **Footer**: Bản quyền.

Responsive:
- Sidebar thu gọn với **hamburger menu**.
- Bảng có **scroll ngang**.

---

## 3. Màn hình chi tiết & Component

### 3.1. Courses List (`courses.html`)
- Grid card view:
  - Card hiển thị: Hình khóa học, Tên, Mô tả ngắn, Progress bar (student), Button (Xem/Đăng ký).
  - Teacher: có nút “Thêm Khóa Học” (modal).
- Search bar + filter theo Category.
- Pagination (client-side).

### 3.2. Course Detail (`course-detail.html`)
- Tabs:
  - **Lessons**: Danh sách bài học (video/PDF/Markdown).
  - **Progress** (Student): Thời gian học, trạng thái từng bài.
  - **Enrollment** (Teacher/Admin): Danh sách học viên đăng ký, nút Approve/Deny.
- Sidebar phụ (optional): Liệt kê các bài học và trạng thái.

### 3.3. Lesson Viewer (`lesson.html`)
- Video player (YouTube embed).
- PDF preview (iframe).
- Markdown render (convert bằng JS library như `marked.js`).
- Sidebar: Danh sách bài học trong khóa.
- Progress tracking: Nút “Mark as Completed”.

### 3.4. Enrollment Management (`enrollments.html`) – Teacher/Admin
- Table:
  - Cột: Học viên, Khóa học, Ngày đăng ký, Trạng thái, Actions (Approve/Deny).
- Filter theo khóa học.
- Client-side update (mock JSON).

### 3.5. Student Progress (`progress.html`)
- Dashboard với 2 phần:
  - Biểu đồ (chart.js): % hoàn thành từng khóa học.
  - Table chi tiết: Bài học, trạng thái, thời gian học.

---

## 4. Mermaid Use Case

```mermaid
flowchart TD
    A[Courses List] --> B[Course Detail]
    B --> C[Lesson Viewer]
    B --> D[Enrollment Management]
    C --> E[Progress Tracking]
    E --> F[Student Progress Dashboard]
````

---

## 5. Mock Data

### `data/mock-courses.json`

```json
[
  {
    "courseId": 101,
    "title": "Intro to Programming",
    "description": "Learn the basics of programming using Python.",
    "category": "Programming",
    "thumbnail": "assets/course-101.png",
    "lessons": [
      { "lessonId": 1, "title": "Variables & Data Types", "type": "video", "url": "https://www.youtube.com/embed/dQw4w9WgXcQ", "completed": false },
      { "lessonId": 2, "title": "Control Structures", "type": "pdf", "url": "assets/lesson2.pdf", "completed": false },
      { "lessonId": 3, "title": "Functions", "type": "markdown", "url": "assets/lesson3.md", "completed": true }
    ]
  },
  {
    "courseId": 102,
    "title": "Data Structures",
    "description": "Understand common data structures in computer science.",
    "category": "Programming",
    "thumbnail": "assets/course-102.png",
    "lessons": []
  }
]
```

### `data/mock-enrollments.json`

```json
[
  { "student": "student01", "courseId": 101, "status": "approved", "date": "2025-07-25" },
  { "student": "student02", "courseId": 101, "status": "pending", "date": "2025-07-26" }
]
```

---

## 6. Frontend Sử Dụng Mock Data

```javascript
// Load courses
async function loadCourses() {
  const res = await fetch('data/mock-courses.json');
  const courses = await res.json();
  renderCourseCards(courses);
}

// Toggle lesson completion
function toggleLessonCompletion(courseId, lessonId) {
  // Tìm khóa học trong localStorage hoặc JSON
  console.log(`Mark lesson ${lessonId} in course ${courseId} as completed`);
}
```

---

## 7. Style Giao Diện

* **Màu chủ đạo**: Xanh lam (#2C6EAA), nền trắng.
* **Card style**: Bóng nhẹ, bo tròn 8px.
* **Progress bar**: Màu xanh lá cho % hoàn thành.
* **Table**: Header xanh nhạt, hover highlight.
* **Responsive**:

  * Card grid co giãn theo màn hình.
  * Table scroll trên mobile.
