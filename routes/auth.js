const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    res.render('register');
});


router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        console.log('User registered successfully');
        res.redirect('/login');
    } catch (error) {
        console.error('User registration failed:', error);
        res.redirect('/'); 
    }
});


module.exports = router;
