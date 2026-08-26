# GOQii Task Manager - Laravel 12 + React

Complete full-stack Task Manager with JWT Authentication, Role-based Access Control, and Bootstrap 5 Admin Panel.

## Features
- Laravel 12 REST API with JWT Auth
- MySQL with optimized migrations & indexes
- Role-based access (Admin / User)
- React 18 + Bootstrap 5 Admin Dashboard
- Task CRUD with pagination & filtering
- Responsive sidebar layout

---

## Backend Setup (Laravel 12)

```bash
# 1. Create Laravel 12 project
composer create-project laravel/laravel backend
cd backend

# 2. Install JWT & CORS
composer require php-open-source-saver/jwt-auth
composer require fruitcake/laravel-cors

# 3. Publish JWT config
php artisan vendor:publish --provider="PHPOpenSourceSaver\JWTAuth\Providers\LaravelServiceProvider"
php artisan jwt:secret

# 4. Copy files from zip/backend/ into your project
#    - app/Models, app/Http, database/, routes/, config/, bootstrap/

# 5. Setup .env
cp .env.example .env
php artisan key:generate
# Edit DB credentials in .env

# 6. Run migrations & seeders
php artisan migrate --seed

# 7. Start server
php artisan serve --host=0.0.0.0 --port=8000
```

### Default Login Credentials
- Admin: `admin@goqii.com` / `password123`
- User: `user@goqii.com` / `password123`

---

## Frontend Setup (React)

```bash
# 1. Create React app
npx create-react-app frontend
cd frontend

# 2. Install dependencies
npm install axios react-router-dom bootstrap

# 3. Copy files from zip/frontend/ into your project
#    - src/, public/

# 4. Start dev server
npm start
```

Frontend runs on `http://localhost:3000`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/register | Register new user |
| POST | /api/login | Login |
| POST | /api/logout | Logout |
| GET | /api/me | Current user |
| GET | /api/tasks | List tasks (paginated, filter by status) |
| POST | /api/tasks | Create task |
| GET | /api/tasks/{id} | Get single task |
| PUT | /api/tasks/{id} | Update task |
| DELETE | /api/tasks/{id} | Delete task |
| GET | /api/tasks/stats | Dashboard stats |

---

## Database Schema

### users
- id, name, email, password, role (admin/user), timestamps
- Index on `role`

### tasks
- id, user_id (FK), title, description, status, priority, due_date, timestamps
- Indexes on: `user_id+status`, `due_date`, `priority`

---

## Project Structure

```
task-manager/
├── backend/
│   ├── app/
│   │   ├── Http/Controllers/AuthController.php
│   │   ├── Http/Controllers/TaskController.php
│   │   ├── Http/Middleware/CheckRole.php
│   │   ├── Models/User.php
│   │   └── Models/Task.php
│   ├── database/migrations/
│   ├── database/seeders/DatabaseSeeder.php
│   ├── routes/api.php
│   └── config/auth.php
└── frontend/
    ├── src/
    │   ├── components/Navbar.jsx, Sidebar.jsx
    │   ├── pages/Login.jsx, Register.jsx, Dashboard.jsx, Tasks.jsx, TaskForm.jsx
    │   ├── context/AuthContext.jsx
    │   ├── services/api.js
    │   ├── App.jsx, App.css, index.js
    └── public/index.html
```

---

## CORS Fix

If you get CORS errors, ensure `fruitcake/laravel-cors` is installed and add to `bootstrap/app.php`:

```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->use([\Fruitcake\Cors\HandleCors::class]);
    $middleware->alias([
        'role' => \App\Http\Middleware\CheckRole::class,
    ]);
})
```

---

## MERN Stack Note

MERN version (MongoDB + Express + React + Node.js) will be provided separately as requested.

---

Built for GOQii Practical Assessment
