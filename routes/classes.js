// routes/classes.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Insert Class
router.post('/', async (req, res) => {
    const { class_name, course_id, teacher_id } = req.body;
    try {
        const newClass = await pool.query(
            "INSERT INTO classes (class_name, course_id, teacher_id) VALUES ($1, $2, $3) RETURNING *",
            [class_name, course_id, teacher_id]
        );
        res.json(newClass.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete Class
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM classes WHERE class_id = $1", [id]);
        res.json({ message: "Class deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update Class
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { class_name, course_id, teacher_id } = req.body;
    try {
        const updatedClass = await pool.query(
            "UPDATE classes SET class_name = $1, course_id = $2, teacher_id = $3 WHERE class_id = $4 RETURNING *",
            [class_name, course_id, teacher_id, id]
        );
        res.json(updatedClass.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get All Classes
router.get('/', async (req, res) => {
    try {
        const allClasses = await pool.query("SELECT * FROM classes");
        res.json(allClasses.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get Class by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const classData = await pool.query("SELECT * FROM classes WHERE class_id = $1", [id]);
        res.json(classData.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
