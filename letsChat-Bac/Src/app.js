const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const errorHandler = require('./errors/errorHandler');
const AppError = require('./errors/appError');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const chatRoutes = require('./routes/chat.route')

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));


//serve static files
const uploadsPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsPath));

//routing
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/chat', chatRoutes);

app.get('/', (req, res) => {
  res.json({ status: "success", message: "API is working!" });
});





app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(errorHandler);

module.exports = app;