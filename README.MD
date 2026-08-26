# GOQii Task Manager — Practical Assessment

> **Full-Stack Task Management Application** — Built as a practical assessment for the **PHP/MySQL/React Developer** role at GOQii. This repository contains **two independent implementations** of the same Task Manager system, covering all mandatory tasks and selected bonus tasks from the assessment.

---

## 📋 Assessment Completion Status

Based on the [GOQii Practical Assessment PDF](https://github.com/AbulQasim123/GoqiiTaskManager), here is the task-by-task breakdown:

| Task | Title | Status | Notes |
|------|-------|--------|-------|
| **Task 1** | Full-Stack CRUD App: Task Manager | ✅ **Complete** | PHP REST API + React frontend. Full CRUD with filtering, pagination, validation |
| **Task 2** | Authentication & Authorization | ✅ **Complete** | JWT auth, role-based access (Admin/User), protected routes, logout, token expiry |
| **Task 3** | Database Design & Query Optimization | ✅ **Complete** | Optimized schema with indexes, relationships, constraints. Queries with indexing justification |
| **Task 4** | Containerization with Docker | ⚠️ **Knowledgeable but not implemented** | See [Docker Section](#-task-4--docker-containerization) below |
| **Task 5** | Node.js / PostgreSQL Variant | ✅ **Complete** | Full PERN stack re-implementation as bonus — see [PERN Folder](#-project-1-pern-stack) |
| **Task 6** | Cloud Deployment (AWS/GCP) | ⚠️ **Knowledgeable but not deployed** | See [Cloud Section](#-task-6--cloud-deployment) below |
| **Task 7** | AI Agent Feature (Claude/Gemini) | ❌ **Not Attempted** | Out of scope for this assessment |

---

## 🔷 Project 1: PERN Stack — Node.js + Express + PostgreSQL

> **Corresponds to Task 5 (Bonus):** Re-implemented the full backend using Node.js/Express + PostgreSQL to demonstrate cross-stack proficiency.

### Tech Stack

#### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | REST API framework |
| **PostgreSQL** | Relational database |
| **Sequelize** | ORM for database operations |
| **JWT** | Stateless authentication |
| **bcryptjs** | Password hashing |
| **Nodemailer** | Email service (password reset) |
| **EJS** | Email template engine |
| **Zod** | Input validation & schema parsing |
| **Helmet** | Security headers |
| **Morgan** | HTTP request logging |
| **express-rate-limit** | API rate limiting |
| **CORS** | Cross-origin resource sharing |

#### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18** | UI library |
| **Vite** | Build tool & dev server |
| **React Router DOM** | Client-side routing |
| **Axios** | HTTP client |
| **Bootstrap 5** | CSS framework |
| **Bootstrap Icons** | Icon library |
| **React Hook Form** | Form handling |
| **Yup** | Form validation |

### Key Features

- ✅ **JWT Authentication** — Access token (60 min) + Refresh token (14 days)
- ✅ **Role-Based Access Control** — Admin vs User permissions
- ✅ **Task CRUD** — Create, Read, Update, Delete with pagination & filtering
- ✅ **Audit Logging** — Tracks every significant action (login, CRUD, password reset) with IP address
- ✅ **Password Reset Flow** — Secure token generation → EJS email template → Nodemailer → 60 min expiry
- ✅ **Dashboard Statistics** — Task metrics and analytics
- ✅ **Responsive Sidebar Layout** — Bootstrap 5 admin panel design
- ✅ **Rate Limiting** — 100 requests per 15 minutes window
- ✅ **Security Headers** — Helmet protection

### Project Structure (PERN)

```
PERN/
├── backend/
│   ├── src/
│   │   ├── config/           # Database & Mail config
│   │   ├── controllers/      # Auth, Task, AuditLog, PasswordReset
│   │   ├── middleware/       # Auth middleware, Error Handler
│   │   ├── models/           # User, Task, AuditLog, PasswordReset
│   │   ├── routes/           # API route definitions
│   │   ├── utils/            # ApiError, asyncHandler, auditLogger, jwtHelper
│   │   └── views/emails/     # EJS email templates
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Navbar, Sidebar
│   │   ├── pages/            # Login, Register, Dashboard, Tasks, AuditLog, etc.
│   │   ├── context/          # AuthContext, ToastContext
│   │   ├── services/         # API service layer
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
└── GOQii Task Manager - Laravel 12 JWT API.postman_collection.json
```

### Setup Instructions

```bash
# 1. Clone & navigate
cd PERN

# 2. Backend setup
cd backend
npm install
# Configure .env (DB credentials, JWT secret, SMTP)
npm run dev          # Runs on http://localhost:5000

# 3. Frontend setup
cd ../frontend
npm install
# Configure .env (VITE_API_URL=http://localhost:5000/api)
npm run dev          # Runs on http://localhost:5173
```

### Default Credentials
- **Admin:** `admin@goqii.com` / `password123`
- **User:** `user@goqii.com` / `password123`

---

## 🔶 Project 2: PHPWithReact — Laravel 12 + MySQL

> **Corresponds to Tasks 1–3 (Core):** Primary implementation using PHP/Laravel + MySQL as required by the job description.

### Tech Stack

#### Backend
| Technology | Purpose |
|-----------|---------|
| **Laravel 12** | PHP web framework |
| **PHP** | Server-side language |
| **MySQL** | Relational database |
| **Eloquent ORM** | Database ORM |
| **JWT Auth** | `php-open-source-saver/jwt-auth` package |
| **Laravel CORS** | `fruitcake/laravel-cors` for cross-origin handling |
| **Migrations & Seeders** | Database versioning & test data |
| **Middleware** | Role-based route protection |

#### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18** | UI library |
| **Vite** | Build tool & dev server |
| **React Router DOM** | Client-side routing |
| **Axios** | HTTP client |
| **Bootstrap 5** | CSS framework |

### Key Features

- ✅ **JWT Authentication** — Token-based auth with Laravel JWT package
- ✅ **Role-Based Access Control** — Admin vs User via custom `CheckRole` middleware
- ✅ **Task CRUD** — Full Create, Read, Update, Delete with pagination & status filtering
- ✅ **Dashboard Statistics** — Task analytics endpoint (`/api/tasks/stats`)
- ✅ **Optimized Database** — Indexed migrations (`user_id+status`, `due_date`, `priority`)
- ✅ **Responsive Sidebar Layout** — Bootstrap 5 admin panel
- ✅ **CORS Handling** — Properly configured for React frontend communication
- ✅ **Database Seeding** — Pre-populated admin & user accounts

### Project Structure (PHPWithReact)

```
PHPWithReact/
├── backend/
│   ├── app/
│   │   ├── Http/Controllers/     # AuthController, TaskController
│   │   ├── Http/Middleware/      # CheckRole middleware
│   │   └── Models/               # User, Task (Eloquent)
│   ├── database/
│   │   ├── migrations/           # Optimized with indexes
│   │   └── seeders/              # DatabaseSeeder
│   ├── routes/
│   │   └── api.php               # API route definitions
│   ├── config/
│   │   └── auth.php              # JWT auth configuration
│   ├── bootstrap/
│   │   └── app.php               # CORS middleware registration
│   ├── .env
│   ├── composer.json
│   └── artisan
│
├── frontend/
│   ├── src/
│   │   ├── components/           # Navbar, Sidebar
│   │   ├── pages/                # Login, Register, Dashboard, Tasks, TaskForm
│   │   ├── context/              # AuthContext
│   │   ├── services/             # API service layer
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
└── GOQii Task Manager - Laravel 12 JWT API.postman_collection.json
```

### Setup Instructions

```bash
# 1. Clone & navigate
cd PHPWithReact

# 2. Backend setup
cd backend
composer install
composer require php-open-source-saver/jwt-auth
composer require fruitcake/laravel-cors
php artisan vendor:publish --provider="PHPOpenSourceSaver\JWTAuth\Providers\LaravelServiceProvider"
php artisan jwt:secret
cp .env.example .env
php artisan key:generate
# Configure DB credentials in .env
php artisan migrate --seed
php artisan serve --host=0.0.0.0 --port=8000   # Runs on http://localhost:8000

# 3. Frontend setup
cd ../frontend
npm install
# Configure .env (VITE_API_URL=http://localhost:8000/api)
npm run dev          # Runs on http://localhost:5173
```

### Default Credentials
- **Admin:** `admin@goqii.com` / `password123`
- **User:** `user@goqii.com` / `password123`

---

## 🎯 Common Features Across Both Projects

| Feature | PERN | PHPWithReact |
|---------|------|--------------|
| **Authentication** | JWT (jsonwebtoken) | JWT (php-open-source-saver/jwt-auth) |
| **Authorization** | Middleware-based role check | Laravel `CheckRole` middleware |
| **Task Management** | Full CRUD + pagination + filtering | Full CRUD + pagination + filtering |
| **Role System** | `admin` / `user` | `admin` / `user` |
| **Admin Powers** | All tasks, audit logs, stats | All tasks, stats |
| **User Powers** | Own tasks only | Own tasks only |
| **Database Indexes** | `role`, `email`, `user_id+status`, `due_date`, `priority` | `role`, `user_id+status`, `due_date`, `priority` |
| **Postman Collection** | ✅ Included | ✅ Included |
| **Frontend Stack** | React + Vite + Bootstrap 5 | React + Vite + Bootstrap 5 |
| **API Pattern** | RESTful JSON | RESTful JSON |

---

## 📦 Task 4 — Docker Containerization

> **Status:** ⚠️ Knowledgeable but not implemented due to system constraints.

### What I Know About Docker

I am fully familiar with Docker containerization concepts and have practical knowledge of:

- **Writing Dockerfiles** for both PHP (Apache/Nginx + PHP-FPM) and Node.js applications
- **Docker Compose** (`docker-compose.yml`) to orchestrate multi-container setups:
  - PHP/Laravel backend container
  - React frontend container (Nginx or Node dev server)
  - MySQL/PostgreSQL database container
  - Optional: phpMyAdmin or Adminer for DB management
- **Environment variable management** via `.env` files — no hardcoded secrets in images
- **Volume mounting** for persistent database storage and live code reloading
- **Network configuration** for inter-container communication
- **Health checks** and restart policies

### Why It Was Not Implemented

Due to **limited disk space** on my development machine, I was unable to install and run Docker Desktop (which requires ~10GB+ of space for the VM and image layers). The system constraints prevented me from building and testing Docker images locally.

### What the Docker Setup Would Look Like

```yaml
# docker-compose.yml (conceptual)
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    env_file: .env
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    env_file: .env

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
      MYSQL_DATABASE: ${DB_NAME}
    volumes:
      - db_data:/var/lib/mysql

  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    ports:
      - "8080:80"
    depends_on:
      - db

volumes:
  db_data:
```

> **Note:** If system resources allow in the future, I can implement and test this setup within a few hours.

---

## ☁️ Task 6 — Cloud Deployment

> **Status:** ⚠️ Knowledgeable but not deployed due to free-tier policy changes.

### What I Know About Cloud Deployment

I have theoretical knowledge and have studied deployment strategies for both **AWS** and **GCP**:

#### AWS Deployment Knowledge
- **EC2** — Launch Linux instances, configure security groups, install LAMP/LEMP stack
- **RDS** — Managed MySQL/PostgreSQL with automated backups
- **S3** — Static asset storage for React build files
- **Route 53** — Domain management and DNS routing
- **Elastic Beanstalk** — Platform-as-a-Service for PHP/Node.js apps
- **CodePipeline / GitHub Actions** — CI/CD automation

#### GCP Deployment Knowledge
- **Compute Engine** — VM instances for backend hosting
- **Cloud SQL** — Managed MySQL/PostgreSQL
- **Cloud Storage** — Static file hosting
- **Cloud Run** — Serverless container deployment
- **Cloud Build** — CI/CD pipeline

### Why It Was Not Deployed

Both **AWS** and **GCP** have recently changed their free-tier policies and verification requirements. New account creation and free-tier activation have become restricted in certain regions, requiring credit card verification with charges that are no longer fully waived. Due to these policy changes, I was unable to create and utilize free-tier accounts for deployment.

### Deployment Architecture (Conceptual)

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React App     │────▶│  AWS S3 /       │     │  CloudFront     │
│   (Build)       │     │  GCP Cloud      │────▶│  CDN            │
└─────────────────┘     │  Storage        │     └─────────────────┘
                        └─────────────────┘
                                │
                                ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   API Requests  │────▶│  EC2 / Compute  │────▶│  RDS / Cloud    │
│   (Axios)       │     │  Engine         │     │  SQL            │
└─────────────────┘     │  (PHP/Node)     │     │  (MySQL/Postgre)│
                        └─────────────────┘     └─────────────────┘
```

> **Note:** Given access to an active cloud account, I can deploy this application within a day using the above architecture.

---

## 💼 Interview Talking Points

### Architecture Decisions

1. **Why PERN for one and Laravel for the other?**
   - PERN demonstrates raw Node.js/Express architecture — full control over middleware, JWT implementation, and ORM configuration
   - Laravel leverages framework conventions — rapid development, built-in auth scaffolding, Eloquent relationships, and artisan commands

2. **Why Sequelize vs Eloquent?**
   - Sequelize (PERN): JavaScript-first ORM with migration support, model definitions, and raw query flexibility
   - Eloquent (Laravel): PHP's most elegant ORM with relationships, query scopes, and collection methods

3. **JWT Implementation Differences**
   - PERN: Manual JWT handling with `jsonwebtoken` library — custom refresh token logic, token expiry management
   - Laravel: Package-driven (`php-open-source-saver/jwt-auth`) — config-based, integrated with Laravel's auth guard system

4. **Database Choice**
   - PostgreSQL (PERN): Advanced JSON support, robust concurrency, complex query capabilities
   - MySQL (Laravel): Traditional RDBMS, excellent Laravel integration, widespread hosting support

### Security Measures

- **Password Hashing:** bcryptjs (PERN) / Laravel Hash facade (PHP)
- **JWT Token Expiry:** 60 min access, 14 days refresh (PERN) / Configurable (PHP)
- **Rate Limiting:** Express rate limiter (PERN)
- **CORS:** Explicit origin whitelist
- **Helmet:** Security headers (PERN)
- **Input Validation:** Zod schema validation (PERN) / Laravel Request validation (PHP)
- **SQL Injection Protection:** Parameterized queries via ORM in both

### Scalability Considerations

- **Database Indexing:** Optimized indexes on frequently queried columns
- **Pagination:** Server-side pagination with limit/offset
- **Audit Logging:** Separate audit_logs table (PERN) for tracking without impacting main operations
- **Separation of Concerns:** Controllers handle HTTP, Services handle business logic, Models handle data

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- PostgreSQL (for PERN)
- MySQL (for PHPWithReact)
- PHP 8.2+ & Composer (for PHPWithReact)
- Git

### Quick Start (PERN)
```bash
git clone https://github.com/AbulQasim123/GoqiiTaskManager.git
cd GoqiiTaskManager/PERN/backend
npm install && npm run dev
cd ../frontend
npm install && npm run dev
```

### Quick Start (PHPWithReact)
```bash
cd GoqiiTaskManager/PHPWithReact/backend
composer install
php artisan migrate --seed
php artisan serve
cd ../frontend
npm install && npm run dev
```

---

## 📡 API Documentation

Both projects expose identical REST API endpoints:

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register new user |
| POST | `/api/login` | Login & receive JWT |
| POST | `/api/logout` | Invalidate token |
| POST | `/api/refresh` | Refresh JWT token *(PERN only)* |
| GET | `/api/me` | Get current user profile |
| POST | `/api/forgot-password` | Request password reset *(PERN only)* |
| POST | `/api/reset-password` | Reset password with token *(PERN only)* |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | List tasks (paginated, filterable) |
| POST | `/api/tasks` | Create new task |
| GET | `/api/tasks/{id}` | Get single task |
| PUT | `/api/tasks/{id}` | Update task |
| DELETE | `/api/tasks/{id}` | Delete task |
| GET | `/api/tasks/stats` | Dashboard statistics |

### Audit Logs *(PERN only)*
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/audit-logs` | List audit logs |
| GET | `/api/audit-logs/actions` | Get available audit actions |

> **Postman Collection:** Both folders include `GOQii Task Manager - Laravel 12 JWT API.postman_collection.json` for testing.

---

## 🗄️ Database Schema

### Users Table
```sql
- id (PK)
- name
- email (unique, indexed)
- password (hashed)
- role (admin/user, indexed)
- email_verified_at
- remember_token
- created_at / updated_at
```

### Tasks Table
```sql
- id (PK)
- user_id (FK, indexed)
- title
- description
- status
- priority
- due_date (indexed)
- created_at / updated_at
- Composite index: (user_id, status)
```

### Audit Logs Table *(PERN only)*
```sql
- id (PK)
- user_id (FK)
- action (login, logout, create, update, delete, etc.)
- entity_type
- entity_id
- description
- ip_address
- created_at / updated_at
```

### Password Reset Tokens Table *(PERN only)*
```sql
- email (indexed)
- token (hashed)
- created_at (auto-expires after 60 min)
```

---

## 📁 Project Structure

```
GoqiiTaskManager/
│
├── PERN/                           # Node.js + Express + PostgreSQL + React
│   ├── backend/                    # Express API
│   │   ├── src/
│   │   │   ├── config/
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── utils/
│   │   │   └── views/emails/
│   │   ├── .env
│   │   ├── server.js
│   │   └── package.json
│   ├── frontend/                   # React + Vite
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── context/
│   │   │   ├── services/
│   │   │   ├── App.jsx
│   │   │   └── main.jsx
│   │   ├── .env
│   │   └── package.json
│   ├── .env
│   ├── README.md
│   └── GOQii Task Manager - Laravel 12 JWT API.postman_collection.json
│
├── PHPWithReact/                   # Laravel 12 + MySQL + React
│   ├── backend/                    # Laravel API
│   │   ├── app/
│   │   │   ├── Http/Controllers/
│   │   │   ├── Http/Middleware/
│   │   │   └── Models/
│   │   ├── database/migrations/
│   │   ├── database/seeders/
│   │   ├── routes/api.php
│   │   ├── config/
│   │   ├── bootstrap/
│   │   ├── .env
│   │   ├── composer.json
│   │   └── artisan
│   ├── frontend/                   # React + Vite
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── context/
│   │   │   ├── services/
│   │   │   ├── App.jsx
│   │   │   └── main.jsx
│   │   ├── .env
│   │   └── package.json
│   ├── .env
│   ├── README.md
│   └── GOQii Task Manager - Laravel 12 JWT API.postman_collection.json
│
└── README.md                       # This file
```

---

## 👤 Author

**Abul Qasim**
- GitHub: [@AbulQasim123](https://github.com/AbulQasim123)
- Project: [GoqiiTaskManager](https://github.com/AbulQasim123/GoqiiTaskManager)

---

## 📝 License

This project was built for **GOQii Practical Assessment** purposes.

---

> **Pro Tip for Interviewers:** Both implementations share the same React frontend architecture, demonstrating the ability to swap backend technologies without affecting the client-side codebase — a key skill in modern full-stack development.
