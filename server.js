// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Import routes
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');
const studentRoutes = require('./routes/students');
const teacherRoutes = require('./routes/teachers');
const departmentRoutes = require('./routes/departments');
const classRoutes = require('./routes/classes');
const attendanceRoutes = require('./routes/attendance');
const assignmentRoutes = require('./routes/assignments');
const enrollmentRoutes = require('./routes/enrollments');

// Use routes
app.use('/users', userRoutes);
app.use('/courses', courseRoutes);
app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);
app.use('/departments', departmentRoutes);
app.use('/classes', classRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/assignments', assignmentRoutes);
app.use('/enrollments', enrollmentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`);
});
