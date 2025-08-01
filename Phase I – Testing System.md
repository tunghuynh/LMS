# Phase I – Module Testing System (Frontend HTML/CSS/JS)

## 1. Mục tiêu
- Xây dựng giao diện đầy đủ cho **đăng ký quiz, tạo quiz, làm quiz và xem kết quả**.
- Dữ liệu chạy trên **mock JSON**, không cần backend.
- Hỗ trợ 3 loại user:
  - **Student**: Đăng ký quiz, làm quiz, xem kết quả.
  - **Teacher**: Tạo quiz (câu hỏi text, radio, checkbox), import từ Excel (mock), chấm điểm.
  - **Admin**: Giám sát (xem kết quả tổng hợp).
- Giao diện **responsive**, phong cách giáo dục (xanh lam – trắng), dễ thao tác.

---

## 2. Layout Chung
- **Header**: Logo, Avatar + tên user, Logout.
- **Sidebar**:
  - Dashboard  
  - Quizzes  
  - Quiz Templates (Teacher)  
  - Quiz Results  
  - History
- **Content**: Table/Card, form tạo quiz, modal preview.
- **Footer**: Bản quyền.

Responsive:
- Sidebar thu gọn trên mobile.
- Form và bảng tự co giãn.

---

## 3. Màn hình chi tiết & Component

### 3.1. Quiz List (`quizzes.html`)
- Table (Student):
  - Cột: Tên Quiz, Khóa học, Ngày, Trạng thái (chưa đăng ký/đã đăng ký/đã thi), Action (Đăng ký/Thi).
- Teacher:
  - Có nút “Tạo Quiz Mới” (modal).
- Filter theo khóa học.

### 3.2. Quiz Builder (`quiz-builder.html`)
- Form tạo quiz:
  - Quiz Info: Tên, Mô tả, Khóa học liên kết.
  - Danh sách câu hỏi:
    - Text/Radio/Checkbox.
    - Nút “Thêm câu hỏi”.
  - Button “Import Excel” (mock event load JSON).
- Preview quiz bằng modal trước khi lưu.

### 3.3. Quiz Attempt (`quiz-attempt.html`)
- Student giao diện làm quiz:
  - Hiển thị câu hỏi theo từng trang (Next/Prev).
  - Timer (đếm ngược, hiển thị trên header).
  - Nút “Nộp bài”.
- Các loại câu hỏi: text answer, multiple choice, multiple select.

### 3.4. Quiz Results (`quiz-results.html`)
- Student:
  - Hiển thị điểm, số câu đúng/sai, danh sách câu hỏi và đáp án đúng.
- Teacher/Admin:
  - Table tổng hợp kết quả (Học viên, Quiz, Điểm, Trạng thái).
  - Export CSV (mock).

### 3.5. Quiz Templates (`quiz-templates.html`)
- Danh sách template câu hỏi.
- Button “Áp dụng” để tạo quiz từ template.

---

## 4. Mermaid Use Case

```mermaid
flowchart TD
    A[Quiz List] --> B[Quiz Builder]
    A --> C[Quiz Attempt]
    C --> D[Quiz Results]
    B --> E[Quiz Templates]
    D --> F[Result Export/Admin View]
````

---

## 5. Mock Data

### `data/mock-quizzes.json`

```json
[
  {
    "quizId": 201,
    "title": "Basic JavaScript Quiz",
    "courseId": 101,
    "status": "open",
    "questions": [
      {
        "questionId": 1,
        "type": "radio",
        "text": "Which keyword declares a constant in JS?",
        "options": ["let", "const", "var"],
        "answer": "const"
      },
      {
        "questionId": 2,
        "type": "checkbox",
        "text": "Select all primitive types:",
        "options": ["string", "number", "array", "boolean"],
        "answer": ["string", "number", "boolean"]
      },
      {
        "questionId": 3,
        "type": "text",
        "text": "Name a looping structure in JavaScript",
        "answer": "for"
      }
    ]
  }
]
```

### `data/mock-results.json`

```json
[
  { "student": "student01", "quizId": 201, "score": 8, "total": 10, "submittedAt": "2025-07-27" },
  { "student": "student02", "quizId": 201, "score": 5, "total": 10, "submittedAt": "2025-07-28" }
]
```

---

## 6. Frontend Sample Logic

```javascript
async function loadQuizzes() {
  const res = await fetch('data/mock-quizzes.json');
  const quizzes = await res.json();
  renderQuizTable(quizzes);
}

function startQuiz(quizId) {
  window.location.href = `quiz-attempt.html?quizId=${quizId}`;
}

function submitQuiz(quizId) {
  alert(`Quiz ${quizId} submitted!`);
}
```

---

## 7. Style Giao Diện

* **Màu chủ đạo**: Xanh lam (#2C6EAA), nền trắng.
* **Quiz Card/Table**: Border nhẹ, hover highlight.
* **Timer**: Thanh màu cam, đếm ngược.
* **Form**: Các field gọn gàng, label rõ ràng.
* **Responsive**:

  * Quiz question hiển thị dạng full-width trên mobile.
  * Table cuộn ngang nếu quá nhiều cột.
