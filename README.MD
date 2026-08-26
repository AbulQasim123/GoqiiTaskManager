# GOQii Task Manager

A full-stack Task Management application built as **two equivalent implementations** for practical/interview evaluation:

1. **PERN** — Node.js + Express.js + PostgreSQL + React
2. **PHPWithReact** — Laravel 12 + PHP + React + Vite

The repository is intentionally structured to demonstrate the same business problem using two different backend technologies.

## Repository

GitHub: https://github.com/AbulQasim123/GoqiiTaskManager

---

# 1. PERN — Node.js + Express + PostgreSQL + React

## Overview

The PERN implementation provides a RESTful Task Manager with authentication, authorization, task CRUD operations, filtering/pagination, password reset, audit logging, and an admin dashboard.

### Tech Stack

**Backend**
- Node.js 18+
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT authentication
- bcryptjs for password hashing
- Nodemailer + EJS for password-reset emails
- Zod for request validation
- Helmet for HTTP security headers
- CORS
- express-rate-limit
- Morgan
- UUID

**Frontend**
- React 19
- Vite
- React Router
- Axios
- Bootstrap 5
- Bootstrap Icons
- React Hook Form
- Yup

The actual backend and frontend dependencies are available in the project's `package.json` files. citeturn3view2turn3view3

## Key Features

- User registration and login
- JWT-based authentication
- JWT refresh flow
- Role-based access control
- Admin and User roles
- Task create/read/update/delete
- Task pagination
- Task filtering
- Task statistics
- Audit logging
- Forgot-password flow
- Password reset using email
- Password hashing
- Rate limiting
- Security headers with Helmet
- CORS configuration
- Responsive React dashboard

The repository documents the main authentication, task, audit-log, and password-reset API flows. citeturn1view0

## Roles

### Admin
- Manage all tasks
- View dashboard statistics
- View audit logs
- Manage own profile

### User
- Manage own tasks
- Manage own profile

## Backend Architecture

```text
PERN/
└── backend/
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   └── utils/
    ├── views/
    │   └── emails/
    ├── database/
    ├── .env
    ├── server.js
    └── package.json
```

The backend follows a controller → service/model → database style separation, with middleware for authentication/error handling and utility modules for reusable functionality. citeturn1view0

## Frontend Architecture

```text
PERN/
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   ├── services/
    │   ├── App.jsx
    │   └── main.jsx
    ├── public/
    ├── .env
    └── package.json
```

## Important API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/register` | Register user |
| POST | `/api/login` | Login |
| POST | `/api/logout` | Logout |
| POST | `/api/refresh` | Refresh JWT |
| GET | `/api/me` | Current user |
| POST | `/api/forgot-password` | Request password reset |
| POST | `/api/reset-password` | Reset password |
| GET | `/api/tasks` | List tasks |
| POST | `/api/tasks` | Create task |
| GET | `/api/tasks/{id}` | Get task |
| PUT | `/api/tasks/{id}` | Update task |
| DELETE | `/api/tasks/{id}` | Delete task |
| GET | `/api/tasks/stats` | Dashboard statistics |
| GET | `/api/audit-logs` | Audit logs |

## Database Design

Main tables:

### users
- id
- name
- email
- password
- role
- email_verified_at
- created_at
- updated_at

### tasks
- id
- user_id
- title
- description
- status
- priority
- due_date
- created_at
- updated_at

### audit_logs
- id
- user_id
- action
- entity_type
- entity_id
- description
- ip_address
- created_at

### password_reset_tokens
- email
- token
- created_at

PostgreSQL is accessed through Sequelize, which handles models, relationships, queries, validations, and database connectivity. citeturn1view0

## PERN Setup

### 1. Clone repository

```bash
git clone https://github.com/AbulQasim123/GoqiiTaskManager.git
cd GoqiiTaskManager/PERN
```

### 2. Backend

```bash
cd backend
npm install
```

Create/update `.env`:

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

Create the PostgreSQL database:

```sql
CREATE DATABASE goqii_task_manager;
```

Initialize/seed data if required:

```bash
npm run db:init
npm run db:seed
```

Start the API:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

### 3. Frontend

Open another terminal:

```bash
cd GoqiiTaskManager/PERN/frontend
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start React:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

### Default Credentials

```text
Admin
Email: admin@goqii.com
Password: password123

User
Email: user@goqii.com
Password: password123
```

---

# 2. PHPWithReact — Laravel 12 + PHP + React

## Overview

The second implementation uses **Laravel 12 as the backend API** and **React + Vite as the frontend**.

This version demonstrates how the same Task Manager requirements can be implemented using PHP/Laravel instead of Node.js/Express.

The Laravel backend requires PHP 8.2+ and Laravel 12, and uses `php-open-source-saver/jwt-auth` for JWT authentication. citeturn3view0

## Tech Stack

**Backend**
- PHP 8.2+
- Laravel 12
- Laravel Eloquent ORM
- JWT Authentication
- PHPUnit
- Laravel migrations
- Laravel validation
- Laravel middleware
- Laravel routing

**Frontend**
- React 19
- Vite
- Axios
- React Router
- Bootstrap 5
- React Hook Form
- Yup

The frontend dependency configuration is present in the project's package configuration. citeturn3view1

## Key Features

- REST API using Laravel
- JWT authentication
- Role-based access
- Admin/User roles
- Task CRUD
- Task filtering and pagination
- Dashboard statistics
- Audit logging
- Password reset
- Secure password hashing
- Request validation
- React-based admin/user interface

## Laravel Backend Structure

```text
PHPWithReact/
└── backend/
    ├── app/
    ├── bootstrap/
    ├── config/
    ├── database/
    ├── public/
    ├── resources/
    ├── routes/
    ├── storage/
    ├── tests/
    ├── .env.example
    ├── artisan
    ├── composer.json
    └── vite.config.js
```

The Laravel backend contains the standard application, configuration, database, routes, storage, tests, and public directories. citeturn2view0

## React Frontend Structure

```text
PHPWithReact/
└── frontend/
    ├── public/
    ├── src/
    ├── .env
    ├── package.json
    └── vite.config.js
```

## PHPWithReact Setup

### 1. Clone repository

```bash
git clone https://github.com/AbulQasim123/GoqiiTaskManager.git
cd GoqiiTaskManager/PHPWithReact
```

### 2. Backend setup

Requirements:

```text
PHP >= 8.2
Composer
Node.js >= 18
Database: SQLite by default, or another Laravel-supported database
```

Install PHP dependencies:

```bash
cd backend
composer install
```

Create environment file:

```bash
cp .env.example .env
```

On Windows CMD:

```cmd
copy .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

Run migrations:

```bash
php artisan migrate
```

The provided Laravel environment example is configured for SQLite by default. It can also be changed to MySQL/PostgreSQL by updating the Laravel `DB_*` environment variables. citeturn4view0

Start Laravel:

```bash
php artisan serve
```

Default backend:

```text
http://127.0.0.1:8000
```

### 3. Frontend setup

Open another terminal:

```bash
cd GoqiiTaskManager/PHPWithReact/frontend
npm install
```

Create/update `.env` according to the API URL used by the Laravel backend.

Start React:

```bash
npm run dev
```

---

# Architecture Comparison

| Area | PERN | PHPWithReact |
|---|---|---|
| Backend | Node.js + Express | Laravel 12 + PHP |
| Frontend | React | React |
| Database | PostgreSQL | SQLite by default / configurable |
| ORM | Sequelize | Eloquent |
| Authentication | JWT | JWT |
| Validation | Zod | Laravel validation |
| API | REST API | REST API |
| UI | Bootstrap 5 | Bootstrap 5 |
| Build Tool | Vite | Vite |
| HTTP Client | Axios | Axios |
| Forms | React Hook Form + Yup | React Hook Form + Yup |
| Password Hashing | bcryptjs | Laravel Hash |
| Email | Nodemailer + EJS | Laravel mail system |
| Testing | Node tooling | PHPUnit |

---

# Interview Discussion Points

This project can be discussed from both **backend and full-stack perspectives**.

## 1. Authentication

JWT is used so that the frontend can authenticate API requests using:

```http
Authorization: Bearer <token>
```

Important interview topics:

- Authentication vs authorization
- JWT access/refresh token flow
- Password hashing
- Token expiration
- Protected routes
- Middleware

## 2. Role-Based Access Control

The application separates Admin and User permissions.

Example:

```text
Admin
 ├── View all tasks
 ├── Dashboard statistics
 ├── Audit logs
 └── Profile

User
 ├── Own tasks
 └── Profile
```

This demonstrates authorization at the API level instead of relying only on frontend route protection.

## 3. Database Design

The application separates users, tasks, audit logs, and password reset information.

This avoids unnecessary duplication and keeps relationships clear.

Important interview topics:

- Primary keys
- Foreign keys
- One-to-many relationships
- Indexes
- Normalization
- Query optimization
- Pagination

## 4. Audit Logging

Important actions can be recorded with:

```text
User
Action
Entity
Entity ID
Description
IP Address
Timestamp
```

This is useful for tracking changes and investigating user activity.

## 5. Password Reset

The password-reset flow is designed around a temporary reset token.

Typical flow:

```text
Forgot Password
      ↓
Generate Token
      ↓
Store Token
      ↓
Send Reset Email
      ↓
User Opens Link
      ↓
Validate Token
      ↓
Set New Password
      ↓
Invalidate Token
```

## 6. API Security

Security-related implementation includes:

- Password hashing
- JWT authentication
- Role-based authorization
- CORS
- Rate limiting
- HTTP security headers
- Input validation
- Environment variables for secrets

## 7. Performance

Potential areas to discuss in an interview:

- Database indexing
- Pagination instead of loading all records
- Filtering at database level
- Selecting only required columns
- Avoiding unnecessary API calls
- Proper relationships
- Query optimization
- HTTP caching where appropriate

---

# Interview Project Explanation

A short explanation you can use in an interview:

> "I developed a Task Manager application with two backend implementations. The first implementation uses the PERN stack — Node.js, Express, PostgreSQL and React. The second implementation uses Laravel 12 with PHP and React. Both implementations provide JWT authentication, role-based authorization, task CRUD operations, pagination, filtering, audit logging and password reset functionality.
>
> I separated the frontend and backend so the React application communicates with the backend through REST APIs. I also focused on database relationships, validation, authentication middleware, security and maintainable project structure."

---

# Project Structure

```text
GoqiiTaskManager/
│
├── PERN/
│   ├── backend/
│   └── frontend/
│
├── PHPWithReact/
│   ├── backend/
│   └── frontend/
│
└── README.md
```

The public GitHub repository currently contains these two top-level implementations: `PERN` and `PHPWithReact`. citeturn0view0

---

# API Testing

The PERN directory includes a Postman collection:

```text
GOQii Task Manager - Laravel 12 JWT API.postman_collection.json
```

Use the collection to test authentication, task, dashboard and related API flows.

---

# Security Notes

Do not commit real secrets to GitHub.

Never commit:

```text
.env
real database passwords
JWT secrets
SMTP passwords
API keys
production credentials
```

Use `.env.example` as the template for local configuration.

---

# Development Commands

## PERN Backend

```bash
cd PERN/backend
npm install
npm run dev
```

## PERN Frontend

```bash
cd PERN/frontend
npm install
npm run dev
```

## Laravel Backend

```bash
cd PHPWithReact/backend
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

## Laravel React Frontend

```bash
cd PHPWithReact/frontend
npm install
npm run dev
```

---

# Repository Goals

This project demonstrates practical experience with:

- REST API development
- React application development
- Authentication and authorization
- JWT
- PostgreSQL
- MySQL/SQLite-compatible Laravel database configuration
- ORM usage
- Database relationships
- CRUD operations
- Pagination and filtering
- Form validation
- Password reset
- Email integration
- Audit logging
- API security
- Modular backend architecture
- Frontend/backend separation

---

# Author

**Abul Qasim Ansari**

GitHub: https://github.com/AbulQasim123

Repository: https://github.com/AbulQasim123/GoqiiTaskManager

---

## Note

This README is written for technical reviewers and interviewers. It intentionally highlights the architecture, technology choices, setup, security, database design, and discussion points that are useful when evaluating the project.
