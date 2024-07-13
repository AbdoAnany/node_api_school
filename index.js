
// Taskkill /IM node.exe /F
// npm start   



require('dotenv').config();


const express = require('express');

const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://example1.com', 'http://example2.com'], // Allow multiple origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Enable CORS with options
app.use(cors());

// Routes
app.get('/api/data', (req, res) => {
  res.json({ message: 'This is CORS-enabled for an allowed origin.' });
});
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
// // Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!!! \n'+err.message });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Accessible via ngrok URL: `);
});
console.log(`Accessible via ngrok URL: `);




// // server.js
// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware to parse JSON
// app.use(express.json());

// // Import routes
// const userRoutes = require('./routes/users');
// const courseRoutes = require('./routes/courses');
// const studentRoutes = require('./routes/students');
// const teacherRoutes = require('./routes/teachers');
// const departmentRoutes = require('./routes/departments');
// const classRoutes = require('./routes/classes');
// const attendanceRoutes = require('./routes/attendance');
// const assignmentRoutes = require('./routes/assignments');
// const enrollmentRoutes = require('./routes/enrollments');

// // Use routes
// app.use('/users', userRoutes);
// app.use('/courses', courseRoutes);
// app.use('/students', studentRoutes);
// app.use('/teachers', teacherRoutes);
// app.use('/departments', departmentRoutes);
// app.use('/classes', classRoutes);
// app.use('/attendance', attendanceRoutes);
// app.use('/assignments', assignmentRoutes);
// app.use('/enrollments', enrollmentRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ error: 'Something went wrong!' });
// });

// // Start server
// app.listen(port, () => {
//     console.log(`🚀 Server started on port ${port}`);
// });








// const express = require('express');
// const app = express();

// // Middleware to parse JSON
// app.use(express.json());

// const port = process.env.PORT || 3000;

// // Object to store user data
// const users = {};

// // Signup endpoint
// app.post('/signup', (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         if (!username || !email || !password) {
//             return res.status(400).json({ error: 'Username, email, and password are required' });
//         }
//         if (users[username]) {
//             return res.status(409).json({ error: '⛔ Username already exists' });
//         }
//         users[username] = { email, password };
//         res.status(201).json({ message: '✅ Signup successful' });
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Login endpoint
// app.post('/login', (req, res) => {
//     try {
//         const { username, password } = req.body;
//         if (!username || !password) {
//             return res.status(400).json({ error: 'Username and password are required' });
//         }
//         if (!users[username] || users[username].password !== password) {
//             return res.status(401).json({ error: '⛔ Invalid username or password' });
//         }
//         res.status(200).json({ message: '✅ Login successful', username, email: users[username].email });
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ error: 'Something went wrong!' });
// });

// // Start server
// app.listen(port, () => {
//     console.log(`🚀 Server started on port ${port}`);
// });
