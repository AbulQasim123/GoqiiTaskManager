DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS password_reset_tokens CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_email ON users(email);

CREATE TABLE password_reset_tokens (
    email VARCHAR(255) PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    status VARCHAR(20) DEFAULT 'todo' CHECK (status IN ('todo', 'in-progress', 'done')),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    due_date DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tasks_user_status ON tasks(user_id, status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_priority ON tasks(priority);

CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50) NULL,
    entity_id INTEGER NULL,
    description TEXT NULL,
    ip_address VARCHAR(45) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_user_action ON audit_logs(user_id, action);
CREATE INDEX idx_audit_entity_type ON audit_logs(entity_type);
CREATE INDEX idx_audit_created_at ON audit_logs(created_at);

-- Seed data (password: password123)
INSERT INTO users (name, email, password, role, created_at, updated_at)
VALUES 
    ('Admin User', 'admin@goqii.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYA.qGZvKG6', 'admin', NOW(), NOW()),
    ('Test User', 'user@goqii.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYA.qGZvKG6', 'user', NOW(), NOW());

INSERT INTO tasks (user_id, title, description, status, priority, due_date, created_at, updated_at)
VALUES
    (1, 'Setup project repository', 'Initialize Git repo and push to GitHub', 'done', 'high', '2026-08-15', NOW(), NOW()),
    (1, 'Design database schema', 'Create ERD for users and tasks tables', 'done', 'high', '2026-08-18', NOW(), NOW()),
    (1, 'Implement JWT authentication', 'Login/register with JWT tokens', 'in-progress', 'high', '2026-08-28', NOW(), NOW()),
    (1, 'Setup CI/CD pipeline', 'Configure GitHub Actions for auto deployment', 'todo', 'high', '2026-09-01', NOW(), NOW()),
    (2, 'Fix responsive navbar', 'Mobile sidebar toggle fix', 'in-progress', 'medium', '2026-08-29', NOW(), NOW()),
    (2, 'Add form validation', 'Client side validation for task forms', 'todo', 'low', '2026-09-02', NOW(), NOW()),
    (2, 'Write unit tests', 'Jest tests for all controllers', 'todo', 'medium', '2026-09-05', NOW(), NOW()),
    (2, 'Optimize SQL queries', 'Add missing indexes and fix N+1', 'done', 'high', '2026-08-22', NOW(), NOW());