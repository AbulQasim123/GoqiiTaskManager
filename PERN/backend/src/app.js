const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');
const { apiLimiter } = require('./middleware/rateLimiter');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const auditLogRoutes = require('./routes/auditLogs');
const passwordResetRoutes = require('./routes/passwordReset');

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(requestLogger);
app.use(apiLimiter);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString(), environment: process.env.NODE_ENV || 'development' });
});

app.use('/api', passwordResetRoutes);
app.use('/api', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/audit-logs', auditLogRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found', path: req.path, method: req.method });
});

app.use(errorHandler);

module.exports = app;