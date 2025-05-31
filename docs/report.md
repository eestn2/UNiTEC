# UNiTEC Codebase Review Report

**Date:** May 31, 2025  
**Reviewer:** GitHub Copilot  
**Scope:** All code except PHPMailer

---

## 1. Project Overview

UNiTEC is a simplified LinkedIn-style platform for technical school students and graduates. The stack is PHP (backend, REST API), React (frontend), and MySQL (database). The project is organized with clear separation between API, logic, components, and assets.

---

## 2. Security Review

### 2.1. Session Management

- **Strengths:**  
  - Migration to PHP sessions and server-side cookies is a strong move, reducing risk of session hijacking and client-side tampering.
  - Session checks (`$_SESSION['user']['id']`) are now used for authentication and authorization.

- **Weaknesses:**  
  - **Session Fixation:** No evidence of session ID regeneration on login (`session_regenerate_id(true)`), which is recommended to prevent fixation attacks.
  - **Session Timeout:** No session timeout or inactivity expiration logic is present.
  - **CSRF Protection:** No CSRF tokens are implemented for state-changing requests (e.g., password change, registration, posting offers). This is a significant risk for authenticated actions.

### 2.2. Input Validation & Sanitization

- **Strengths:**  
  - Some endpoints validate required fields and types.
  - Password change endpoint enforces minimum password length.

- **Weaknesses:**  
  - **SQL Injection:** No clear evidence of prepared statements or parameterized queries in the code snippets. If queries are built with interpolated variables, this is a critical risk.
  - **XSS:** No explicit output encoding or sanitization for user-generated content (e.g., profile descriptions, posts, comments).
  - **File Uploads:** If file uploads (e.g., avatars, resumes) are supported, there is no mention of file type/size validation or storage outside the web root.

### 2.3. Authentication & Authorization

- **Strengths:**  
  - Endpoints now consistently use session data for user identification.
  - Admin checks use a helper function (`is_admin`).

- **Weaknesses:**  
  - **Privilege Escalation:** If admin checks are only based on a session flag, ensure this cannot be set by the client.
  - **Endpoint Protection:** Some endpoints may lack checks for user roles or ownership (e.g., deleting offers, editing profiles).

### 2.4. Error Handling

- **Strengths:**  
  - Standardized JSON responses for API endpoints.

- **Weaknesses:**  
  - **Information Disclosure:** Error messages may leak sensitive details (e.g., database errors, stack traces) if not properly handled.
  - **HTTP Status Codes:** Most endpoints return 200 OK even on errors; using appropriate status codes (e.g., 401, 403, 400) is best practice.

---

## 3. Code Quality & Consistency

### 3.1. Structure & Organization

- **Strengths:**  
  - Clear separation of concerns: API, logic, components, assets.
  - Use of utility and logic folders for reusable code.

- **Weaknesses:**  
  - Some logic is duplicated across endpoints (e.g., session checks, admin checks).
  - Inconsistent naming conventions in some files and variables.

### 3.2. API Design

- **Strengths:**  
  - RESTful endpoints for most resources.
  - Use of PATCH, GET, and POST methods.

- **Weaknesses:**  
  - Some endpoints accept unnecessary data (e.g., user ID in request body when session is available).
  - Lack of OpenAPI/Swagger documentation.

### 3.3. Frontend

- **Strengths:**  
  - React components are modular and use hooks.
  - Axios is used for API requests, with credentials enabled.

- **Weaknesses:**  
  - Some components have unused variables or functions.
  - Error handling in the frontend is basic (alerts, console logs).
  - No evidence of input validation on the client side.

---

## 4. Refactoring Opportunities

- **Session Handling:** Centralize session start and user checks in a middleware or helper.
- **Prepared Statements:** Refactor all database queries to use prepared statements.
- **CSRF Protection:** Implement CSRF tokens for all state-changing requests.
- **Error Handling:** Use HTTP status codes and avoid leaking sensitive information.
- **Frontend:** Remove unused code, improve error handling, and add client-side validation.
- **API Documentation:** Add OpenAPI/Swagger docs for easier integration and testing.
- **Password Security:** Enforce strong password policies and consider rate-limiting login attempts.

---

## 5. Overall Opinion

The UNiTEC project demonstrates a solid foundation for a student/professional networking platform. The recent migration to server-side sessions is a significant security improvement. The codebase is organized and modular, making it maintainable and extensible.

However, there are critical areas that require attention before production deployment:

- **SQL Injection and XSS risks must be addressed immediately.**
- **CSRF protection is essential for all authenticated actions.**
- **Session security (fixation, timeout) should be improved.**
- **Error handling and HTTP status codes should be standardized.**

With these improvements, the project will be much more robust and secure. The current state is promising for a school or regional MVP, but not yet ready for public launch without addressing the above issues.

---

## 6. Recommendations

1. **Audit all database queries for SQL injection.**
2. **Implement CSRF tokens.**
3. **Add session fixation and timeout protections.**
4. **Sanitize and encode all user-generated output.**
5. **Standardize error handling and HTTP status codes.**
6. **Document the API.**
7. **Add automated tests for critical endpoints.**

---

*If you need code samples or help implementing any of these recommendations, let me know!*