// routes/departments.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Insert Department
router.post('/', async (req, res) => {
    const { department_name } = req.body;
    try {
        const newDepartment = await pool.query(
            "INSERT INTO departments (department_name) VALUES ($1) RETURNING *",
            [department_name]
        );
        res.json(newDepartment.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete Department
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM departments WHERE department_id = $1", [id]);
        res.json({ message: "Department deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update Department
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { department_name } = req.body;
    try {
        const updatedDepartment = await pool.query(
            "UPDATE departments SET department_name = $1 WHERE department_id = $2 RETURNING *",
            [department_name, id]
        );
        res.json(updatedDepartment.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get All Departments
router.get('/', async (req, res) => {
    try {
        const allDepartments = await pool.query("SELECT * FROM departments");
        res.json(allDepartments.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get Department by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const department = await pool.query("SELECT * FROM departments WHERE department_id = $1", [id]);
        res.json(department.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
