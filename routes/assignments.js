// routes/assignments.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Insert Assignment
router.post('/', async (req, res) => {
    const { class_id, title, description, due_date } = req.body;
    try {
        const newAssignment = await pool.query(
            "INSERT INTO assignments (class_id, title, description, due_date) VALUES ($1, $2, $3, $4) RETURNING *",
            [class_id, title, description, due_date]
        );
        res.json(newAssignment.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete Assignment
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM assignments WHERE assignment_id = $1", [id]);
        res.json({ message: "Assignment deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update Assignment
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { class_id, title, description, due_date } = req.body;
    try {
        const updatedAssignment = await pool.query(
            "UPDATE assignments SET class_id = $1, title = $2, description = $3, due_date = $4 WHERE assignment_id = $5 RETURNING *",
            [class_id, title, description, due_date, id]
        );
        res.json(updatedAssignment.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get All Assignments
router.get('/', async (req, res) => {
    try {
        const allAssignments = await pool.query("SELECT * FROM assignments");
        res.json(allAssignments.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get Assignment by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const assignment = await pool.query("SELECT * FROM assignments WHERE assignment_id = $1", [id]);
        res.json(assignment.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
