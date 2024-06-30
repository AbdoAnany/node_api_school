// routes/courses.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Insert Course
router.post('/', async (req, res) => {
    const { course_name, course_code } = req.body;
    try {
        const newCourse = await pool.query(
            "INSERT INTO courses (course_name, course_code) VALUES ($1, $2) RETURNING *",
            [course_name, course_code]
        );
        res.json(newCourse.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete Course
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM courses WHERE course_id = $1", [id]);
        res.json({ message: "Course deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update Course
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { course_name, course_code } = req.body;
    try {
        const updatedCourse = await pool.query(
            "UPDATE courses SET course_name = $1, course_code = $2 WHERE course_id = $3 RETURNING *",
            [course_name, course_code, id]
        );
        res.json(updatedCourse.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get All Courses
router.get('/', async (req, res) => {
    try {
        const allCourses = await pool.query("SELECT * FROM courses");
        res.json(allCourses.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get Course by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const course = await pool.query("SELECT * FROM courses WHERE course_id = $1", [id]);
        res.json(course.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;
