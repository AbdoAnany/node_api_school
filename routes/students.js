// routes/students.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Insert Student
router.post('/', async (req, res) => {
    const { user_id } = req.body;
    try {
        const newStudent = await pool.query(
            "INSERT INTO students (user_id) VALUES ($1) RETURNING *",
            [user_id]
        );
        res.json(newStudent.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete Student
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM students WHERE student_id = $1", [id]);
        res.json({ message: "Student deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update Student
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;
    try {
        const updatedStudent = await pool.query(
            "UPDATE students SET user_id = $1 WHERE student_id = $2 RETURNING *",
            [user_id, id]
        );
        res.json(updatedStudent.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get All Students
router.get('/', async (req, res) => {
    try {
        const allStudents = await pool.query("SELECT * FROM students");
        res.json(allStudents.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get Student by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const student = await pool.query("SELECT * FROM students WHERE student_id = $1", [id]);
        res.json(student.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
