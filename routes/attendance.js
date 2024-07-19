// routes/attendance.js
const express = require('express');
const attendanceRoutes = express.Router();
const db = require('../config/db');

// Get all attendance records
attendanceRoutes.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM attendance');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get attendance record by ID
attendanceRoutes.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM attendance WHERE attendance_id = ?', [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Attendance record not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new attendance record
attendanceRoutes.post('/', async (req, res) => {
  const { user_detail_id, date, status, remarks } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO attendance (user_detail_id, date, status, remarks) VALUES (?, ?, ?, ?)',
      [user_detail_id, date, status, remarks]
    );
    res.status(201).json({ attendance_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an attendance record
attendanceRoutes.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { user_detail_id, date, status, remarks } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE attendance SET user_detail_id = ?, date = ?, status = ?, remarks = ? WHERE attendance_id = ?',
      [user_detail_id, date, status, remarks, id]
    );
    if (result.affectedRows > 0) {
      res.json({ message: 'Attendance record updated' });
    } else {
      res.status(404).json({ error: 'Attendance record not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an attendance record
attendanceRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM attendance WHERE attendance_id = ?', [id]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Attendance record deleted' });
    } else {
      res.status(404).json({ error: 'Attendance record not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Create a new attendance record for a specific user_detail_id
attendanceRoutes.post('/:user_detail_id', async (req, res) => {
    const { user_detail_id } = req.params;
    const { date, status, remarks } = req.body;
    try {
      const [result] = await db.query(
        'INSERT INTO attendance (user_detail_id, date, status, remarks) VALUES (?, ?, ?, ?)',
        [user_detail_id, date, status, remarks]
      );
      res.status(201).json({ attendance_id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
// Get all attendance records by user_detail_id
attendanceRoutes.get('/user/:user_detail_id', async (req, res) => {
    const { user_detail_id } = req.params;
    try {
      const [rows] = await db.query('SELECT * FROM attendance WHERE user_detail_id = ?', [user_detail_id]);
      if (rows.length > 0) {
        res.json(rows);
      } else {
        res.status(404).json({ error: 'No attendance records found for this user' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }});

module.exports = attendanceRoutes;
