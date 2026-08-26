# GOQii Task Manager - Node.js + Express + React

Complete full-stack Task Manager with JWT Authentication, Role-based Access Control, PostgreSQL, and Bootstrap 5 Admin Panel.

## Features

- Node.js + Express REST API
- JWT Authentication
- PostgreSQL database with Sequelize ORM
- Role-based access control (Admin / User)
- React + Bootstrap 5 Admin Dashboard
- Task CRUD with pagination & filtering
- Audit logging
- Password reset via email
- Responsive sidebar layout

---

## Backend Setup (Node.js + Express)

### 1. Create Node.js project

```bash
mkdir backend
cd backend
npm init -y
```

### 2. Install dependencies

```bash
npm install express sequelize pg pg-hstore bcryptjs jsonwebtoken dotenv cors helmet morgan express-rate-limit nodemailer ejs zod
```

### 3. Install development dependency

```bash
npm install --save-dev nodemon
```

### 4. Backend structure

```text
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── views/
├── .env
├── server.js
└── package.json
```

### 5. Setup `.env`

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=goqii_task_manager
DB_USER=postgres
DB_PASSWORD=your_postgres_password

JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=60m
JWT_REFRESH_EXPIRES_IN=14d

FRONTEND_URL=http://localhost:5173

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
SMTP_SECURE=false

MAIL_FROM_ADDRESS=your_email@gmail.com
MAIL_FROM_NAME="GOQii Task Manager"

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

> For Gmail, use a Google App Password instead of your normal Gmail password.

### 6. Setup PostgreSQL

Create the database:

```sql
CREATE DATABASE goqii_task_manager;
```

Make sure PostgreSQL is running on:

```text
localhost:5432
```

Update the PostgreSQL credentials in `.env`.

### 7. Start backend

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## Default Login Credentials

- **Admin:** `admin@goqii.com` / `password123`
- **User:** `user@goqii.com` / `password123`

---

## Frontend Setup (React)

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install axios react-router-dom bootstrap bootstrap-icons
```

Copy the frontend files into the project.

Create `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/register` | Register new user |
| POST | `/api/login` | Login |
| POST | `/api/logout` | Logout |
| POST | `/api/refresh` | Refresh JWT token |
| GET | `/api/me` | Current user |
| POST | `/api/forgot-password` | Send password reset email |
| POST | `/api/reset-password` | Reset password |
| GET | `/api/tasks` | List tasks with pagination/filtering |
| POST | `/api/tasks` | Create task |
| GET | `/api/tasks/{id}` | Get single task |
| PUT | `/api/tasks/{id}` | Update task |
| DELETE | `/api/tasks/{id}` | Delete task |
| GET | `/api/tasks/stats` | Dashboard statistics |
| GET | `/api/audit-logs` | List audit logs |
| GET | `/api/audit-logs/actions` | Get available audit actions |

---

## Database Schema

### users

- `id`
- `name`
- `email`
- `password`
- `role` (`admin` / `user`)
- `email_verified_at`
- `remember_token`
- `created_at`
- `updated_at`

Indexes:

- `role`
- `email`

### tasks

- `id`
- `user_id`
- `title`
- `description`
- `status`
- `priority`
- `due_date`
- `created_at`
- `updated_at`

Indexes:

- `user_id + status`
- `due_date`
- `priority`

### audit_logs

- `id`
- `user_id`
- `action`
- `entity_type`
- `entity_id`
- `description`
- `ip_address`
- `created_at`
- `updated_at`

### password_reset_tokens

- `email`
- `token`
- `created_at`

---

## Project Structure

```text
task-manager/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── mail.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── taskController.js
│   │   │   ├── auditLogController.js
│   │   │   └── passwordResetController.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Task.js
│   │   │   ├── AuditLog.js
│   │   │   └── PasswordReset.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── tasks.js
│   │   │   ├── auditLogs.js
│   │   │   └── passwordReset.js
│   │   │
│   │   └── utils/
│   │       ├── ApiError.js
│   │       ├── asyncHandler.js
│   │       ├── auditLogger.js
│   │       ├── jwtHelper.js
│   │       └── responseHelper.js
│   │
│   ├── views/
│   │   └── emails/
│   │       └── password-reset.ejs
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── Sidebar.jsx
    │   │
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── ForgotPassword.jsx
    │   │   ├── ResetPassword.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Tasks.jsx
    │   │   ├── TaskForm.jsx
    │   │   └── AuditLog.jsx
    │   │
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── ToastContext.jsx
    │   │
    │   ├── services/
    │   │   └── api.js
    │   │
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    │
    ├── .env
    └── package.json
```

---

## PostgreSQL + Sequelize

The backend uses **PostgreSQL** as the database and **Sequelize** as the ORM.

Database configuration:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=goqii_task_manager
DB_USER=postgres
DB_PASSWORD=your_postgres_password
```

Sequelize handles:

- Database connection
- Models
- Relationships
- Queries
- Validations
- PostgreSQL data types

---

## Authentication & Authorization

JWT is used for authentication.

After login, the frontend sends the JWT token with API requests:

```http
Authorization: Bearer <token>
```

Role-based access:

```text
Admin
 ├── Manage all tasks
 ├── View dashboard statistics
 ├── View audit logs
 └── Manage own profile

User
 ├── Manage own tasks
 └── Manage own profile
```

---

## Password Reset

Password reset flow:

```text
Forgot Password
       ↓
Generate secure token
       ↓
Store hashed token in PostgreSQL
       ↓
Generate reset URL
       ↓
Render EJS email template
       ↓
Send email using Nodemailer
       ↓
User opens reset link
       ↓
Set new password
       ↓
Delete reset token
```

Reset tokens expire after **60 minutes**.

---

## Audit Logging

Important activities are stored in `audit_logs`.

Examples:

```text
login
logout
create
update
delete
forgot_password
reset_password
profile_update
```

Audit logs contain:

- User
- Action
- Entity
- Entity ID
- Description
- IP address
- Timestamp

---

## CORS

The Express backend allows requests from the React frontend.

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

If the frontend URL changes, update:

```env
FRONTEND_URL=http://localhost:5173
```

---

## Environment Variables

### Backend

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=goqii_task_manager
DB_USER=postgres
DB_PASSWORD=your_postgres_password

JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=60m
JWT_REFRESH_EXPIRES_IN=14d

FRONTEND_URL=http://localhost:5173

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
SMTP_SECURE=false

MAIL_FROM_ADDRESS=your_email@gmail.com
MAIL_FROM_NAME="GOQii Task Manager"
```

### Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Tech Stack

### Backend

- Node.js
- Express.js
- PostgreSQL
- Sequelize
- JWT
- bcryptjs
- Nodemailer
- EJS
- Zod

### Frontend

- React
- React Router
- Axios
- Bootstrap 5
- Bootstrap Icons
- React Hook Form
- Yup

---

## Development Commands

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

Built for **GOQii Practical Assessment**.
