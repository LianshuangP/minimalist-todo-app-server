const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Todo = require('../models/Todo');


router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        console.log('todos:', todos);
        res.render('index', { todos: todos });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/add/todo', async (req, res) => {
    try {
        const { todo } = req.body;
        const newTodo = new Todo({ todo });
        await newTodo.save();
        console.log('New todo successfully added!');
        
        const todos = await Todo.find();
    
        res.render('index', { todos });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});



router.delete('/delete/todo/:_id', async (req, res) => {
    try {
        const {_id} = req.params;
        await Todo.deleteOne({_id});
        console.log('Todo successfully deleted!')

        const todos = await Todo.find();

        res.render('index', { todos });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;