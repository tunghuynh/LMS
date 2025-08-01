# Phase I – LMS System – Wireframe & Style Guide

## 1. Wireframe Layout (Mermaid)

### 1.1. Layout Chính (Header + Sidebar + Content)
```mermaid
graph TD
  A[Header: Logo + Avatar + Logout] 
  B[Sidebar: Dashboard / Courses / Lessons / Quizzes / Progress]
  C[Content Area: Dynamic Pages]
  A --- C
  B --- C
````

---

### 1.2. Courses List Page (Grid Card View)

```mermaid
graph TD
  A[Header]
  B[Sidebar]
  C[Search Bar + Filter Dropdown]
  D[Card Grid: Each card = Thumbnail + Title + Short Desc + Progress + Action Button]
  E[Pagination]
  A --- C
  C --- D
  D --- E
```

---

### 1.3. Course Detail Page (Tabs)

```mermaid
graph TD
  A[Header]
  B[Sidebar]
  C[Course Info: Thumbnail / Title / Description]
  D[Tabs: Lessons / Progress / Enrollment]
  E[Lesson List: Title / Type / Status]
  D --- E
```

---

### 1.4. Lesson Viewer Page

```mermaid
graph TD
  A[Header]
  B[Sidebar]
  C[Lesson Title]
  D[Content Viewer: Video Player / PDF Iframe / Markdown]
  E[Sidebar Lesson List: Progress Indicators]
  F[Action Buttons: Mark Completed]
  C --- D
  D --- E
  D --- F
```

---

### 1.5. Quiz Attempt Page (Student)

```mermaid
graph TD
  A[Header: Timer + Quiz Title]
  B[Sidebar Optional: Question Navigation]
  C[Content: Current Question]
  D[Navigation Buttons: Prev / Next / Submit]
  A --- C
  C --- D
```

---

## 2. Style Guide

### 2.1. Color Palette

* **Primary Blue**: `#2C6EAA` (buttons, headers)
* **Accent Green**: `#4CAF50` (progress bars, success)
* **Light Gray**: `#F5F5F5` (backgrounds)
* **Dark Gray**: `#333333` (text)
* **White**: `#FFFFFF`

### 2.2. Typography

* **Font**: `Roboto`, sans-serif
* **Heading Sizes**:

  * H1: 28px bold
  * H2: 22px semi-bold
  * H3: 18px semi-bold
* **Body Text**: 16px regular

### 2.3. Buttons

* **Primary Button**:

  * Background: Primary Blue
  * Text: White
  * Border Radius: 6px
  * Hover: Slightly darker blue
* **Secondary Button**:

  * Background: White
  * Border: 1px solid Primary Blue
  * Text: Primary Blue
  * Hover: Light Blue background

### 2.4. Cards

* **Style**:

  * White background, subtle shadow (`0 2px 5px rgba(0,0,0,0.1)`).
  * Rounded corners: 8px.
  * Image top, content below.
  * Hover: Lift effect (slight shadow increase).

### 2.5. Tables

* **Header**:

  * Background: Light Gray
  * Bold text
* **Row Hover**:

  * Background: `#f0f8ff`
* **Borders**:

  * Subtle, 1px solid `#e0e0e0`.

### 2.6. Spacing

* **Container Padding**: 16px.
* **Card Margin**: 12px.
* **Grid Gap**: 16px (desktop), 8px (mobile).

### 2.7. Responsive Rules

* **Breakpoints**:

  * Mobile: < 768px (sidebar collapses to hamburger).
  * Tablet: 768–1024px (2-column card grid).
  * Desktop: >1024px (3-4 column grid).
* **Tables**: Horizontal scroll on mobile.

---

## 3. Global Components

* **Header Component** (HTML snippet):

  * Logo left, nav menu right (user avatar + logout).
* **Sidebar Component**:

  * Collapsible.
  * Menu items: Dashboard, Courses, Lessons, Quizzes, Progress.
* **Modal Component**:

  * Reusable for forms (Add Course, Add Quiz, etc.).
* **Toast Notifications**:

  * Position: top-right, fade in/out.

---

## 4. Sample Interaction Flow (Mermaid Sequence)

```mermaid
sequenceDiagram
    participant U as User
    participant UI as Frontend (Mock JSON)
    participant LS as LocalStorage (for progress)

    U->>UI: Open "Courses List"
    UI->>UI: Fetch mock-courses.json
    UI->>U: Render course cards
    U->>UI: Click "View Course"
    UI->>UI: Load course lessons, render tabs
    U->>UI: Start Lesson (Video/PDF)
    UI->>LS: Save "Completed" flag
    LS-->>UI: Progress updated
```
