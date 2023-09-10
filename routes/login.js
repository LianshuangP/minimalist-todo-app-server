const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Todo = require('../models/Todo');

router.get('/', (req, res) => {
    res.render('login');
});


router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.redirect('/todo');
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;
