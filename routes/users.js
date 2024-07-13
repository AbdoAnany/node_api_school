// routes/users.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Insert User
router.post('/', async (req, res) => {
    const { username, email, password, role_id } = req.body;
    try {
        const newUser = await pool.query(
            "INSERT INTO users (username, email, password, role_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [username, email, password, role_id]
        );
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/signup', async (req, res) => {
    const {
        username, first_name, last_name, email, password, role_id,
        phone_number, gender, address, gov, city, nationalId, postal_code, country, date_of_birth
    } = req.body;
    try {
        const newUser = await pool.query(
            `INSERT INTO users (username, first_name, last_name, email, password, role_id, phone_number,
                                gender, address, gov, city, nationalId, postal_code, country, date_of_birth)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
             RETURNING *`,
            [username, first_name, last_name, email, password, role_id, phone_number,
             gender, address, gov, city, nationalId, postal_code, country, date_of_birth]
        );
        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Delete User
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM users WHERE user_id = $1", [id]);
        res.json({ message: "User deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update User
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, password, role_id } = req.body;
    try {
        const updatedUser = await pool.query(
            "UPDATE users SET username = $1, email = $2, password = $3, role_id = $4 WHERE user_id = $5 RETURNING *",
            [username, email, password, role_id, id]
        );
        res.json(updatedUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get All Users
router.get('/', async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get User by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/enrollmentByUser/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        // Assuming enrollments are associated with users directly (like students)
        const enrollments = await pool.query(
            `SELECT enrollments.*
             FROM enrollments
             WHERE enrollments.student_id = $1`,
            [userId]
        );
        res.json(enrollments.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/classesByUser/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        // Assuming classes are associated with users directly (like teachers or students)
        const classes = await pool.query(
            `SELECT classes.*
             FROM classes
             JOIN enrollments ON classes.class_id = enrollments.class_id
             WHERE enrollments.student_id = $1 OR classes.teacher_id = $1`,
            [userId]
        );
        res.json(classes.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/attendanceByUser/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        // Assuming attendance records are associated with classes, and classes are associated with users
        const attendance = await pool.query(
            `SELECT attendance.*
             FROM attendance
             JOIN classes ON attendance.class_id = classes.class_id
             JOIN enrollments ON classes.class_id = enrollments.class_id
             WHERE enrollments.student_id = $1 OR classes.teacher_id = $1`,
            [userId]
        );
        res.json(attendance.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/assignmentsByUser/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        // Assuming assignments are associated with classes, and classes are associated with users
        const assignments = await pool.query(
            `SELECT assignments.*
             FROM assignments
             JOIN classes ON assignments.class_id = classes.class_id
             JOIN enrollments ON classes.class_id = enrollments.class_id
             WHERE enrollments.student_id = $1 OR classes.teacher_id = $1`,
            [userId]
        );
        res.json(assignments.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
