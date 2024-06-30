// routes/attendance.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Insert Attendance
router.post('/', async (req, res) => {
    const { student_id, class_id, date, status } = req.body;
    try {
        const newAttendance = await pool.query(
            "INSERT INTO attendance (student_id, class_id, date, status) VALUES ($1, $2, $3, $4) RETURNING *",
            [student_id, class_id, date, status]
        );
        res.json(newAttendance.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete Attendance
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM attendance WHERE attendance_id = $1", [id]);
        res.json({ message: "Attendance deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update Attendance
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { student_id, class_id, date, status } = req.body;
    try {
        const updatedAttendance = await pool.query(
            "UPDATE attendance SET student_id = $1, class_id = $2, date = $3, status = $4 WHERE attendance_id = $5 RETURNING *",
            [student_id, class_id, date, status, id]
        );
        res.json(updatedAttendance.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get All Attendance Records
router.get('/', async (req, res) => {
    try {
        const allAttendance = await pool.query("SELECT * FROM attendance");
        res.json(allAttendance.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get Attendance by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const attendance = await pool.query("SELECT * FROM attendance WHERE attendance_id = $1", [id]);
        res.json(attendance.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/attendanceByDate/:date', async (req, res) => {
    const { date } = req.params;
    try {
        const attendanceRecords = await pool.query(
            `SELECT u.username, r.role_name, a.state AS attendance_state, c.class_name
             FROM attendance a
             JOIN users u ON a.user_id = u.id
             JOIN roles r ON u.role_id = r.id
             LEFT JOIN classes c ON a.class_id = c.id
             WHERE a.date = $1`,
            [date]
        );
        res.json(attendanceRecords.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports = router;
