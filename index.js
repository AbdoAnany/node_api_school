const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

const port = process.env.PORT || 3000;

// Object to store user data
const users = {};

// Signup endpoint
app.post('/signup', (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email, and password are required' });
        }
        if (users[username]) {
            return res.status(409).json({ error: '⛔ Username already exists' });
        }
        users[username] = { email, password };
        res.status(201).json({ message: '✅ Signup successful' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Login endpoint
app.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        if (!users[username] || users[username].password !== password) {
            return res.status(401).json({ error: '⛔ Invalid username or password' });
        }
        res.status(200).json({ message: '✅ Login successful', username, email: users[username].email });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`);
});
