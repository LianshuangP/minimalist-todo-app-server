const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the registration page.' });
});


router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        console.log('User registered successfully');
        res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('User registration failed:', error);
        res.status(500).json({ success: false, error: 'User registration failed' });
    }
});


module.exports = router;
