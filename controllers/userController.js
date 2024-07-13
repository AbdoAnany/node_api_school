const db = require('../config/db');

// Create (Add) personal info
exports.addPersonalInfo = async (req, res) => {
    const { first_name, last_name, email, phone, address, national_id, gender, roles, state } = req.body;
    const userId = req.userId;

    try {
        await db.execute('INSERT INTO user_details (user_id, first_name, last_name, email, phone, address, national_id, gender, roles, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [userId, first_name, last_name, email, phone, address, national_id, gender, roles, state]);
        res.status(200).json({ message: 'Personal info added!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read (Get) personal info
exports.getPersonalInfo = async (req, res) => {
    const userId = req.userId;

    try {
        const [rows] = await db.execute('SELECT * FROM user_details WHERE user_id = ?', [userId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User details not found' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllPersonalInfo = async (req, res) => {
    console.log("SSSS");
    try {
        const [rows] = await db.execute('SELECT * FROM user_details');
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User details not found' });
        }
        res.status(200).json(rows); // Return all rows
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update personal info
exports.updatePersonalInfo = async (req, res) => {
    const { first_name, last_name, email, phone, address, national_id, gender, roles, state } = req.body;
    const userId = req.userId;

    try {
        await db.execute('UPDATE user_details SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ?, national_id = ?, gender = ?, roles = ?, state = ? WHERE user_id = ?', 
            [first_name, last_name, email, phone, address, national_id, gender, roles, state, userId]);
        res.status(200).json({ message: 'Personal info updated!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete personal info
exports.deletePersonalInfo = async (req, res) => {
    const userId = req.userId;

    try {
        await db.execute('DELETE FROM user_details WHERE user_id = ?', [userId]);
        res.status(200).json({ message: 'Personal info deleted!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
