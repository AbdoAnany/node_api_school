// routes/teachers.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Insert Teacher
router.post('/', async (req, res) => {
    const { user_id } = req.body;
    try {
        const newTeacher = await pool.query(
            "INSERT INTO teachers (user_id) VALUES ($1) RETURNING *",
            [user_id]
        );
        res.json(newTeacher.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete Teacher
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM teachers WHERE teacher_id = $1", [id]);
        res.json({ message: "Teacher deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update Teacher
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;
    try {
        const updatedTeacher = await pool.query(
            "UPDATE teachers SET user_id = $1 WHERE teacher_id = $2 RETURNING *",
            [user_id, id]
        );
        res.json(updatedTeacher.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get All Teachers
router.get('/', async (req, res) => {
    try {
        const allTeachers = await pool.query("SELECT * FROM teachers");
        res.json(allTeachers.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get Teacher by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const teacher = await pool.query("SELECT * FROM teachers WHERE teacher_id = $1", [id]);
        res.json(teacher.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
