// routes/enrollments.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Insert Enrollment
router.post('/', async (req, res) => {
    const { student_id, class_id } = req.body;
    try {
        const newEnrollment = await pool.query(
            "INSERT INTO enrollments (student_id, class_id) VALUES ($1, $2) RETURNING *",
            [student_id, class_id]
        );
        res.json(newEnrollment.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete Enrollment
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM enrollments WHERE enrollment_id = $1", [id]);
        res.json({ message: "Enrollment deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update Enrollment
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { student_id, class_id } = req.body;
    try {
        const updatedEnrollment = await pool.query(
            "UPDATE enrollments SET student_id = $1, class_id = $2 WHERE enrollment_id = $3 RETURNING *",
            [student_id, class_id, id]
        );
        res.json(updatedEnrollment.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get All Enrollments
router.get('/', async (req, res) => {
    try {
        const allEnrollments = await pool.query("SELECT * FROM enrollments");
        res.json(allEnrollments.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get Enrollment by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const enrollment = await pool.query("SELECT * FROM enrollments WHERE enrollment_id = $1", [id]);
        res.json(enrollment.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
