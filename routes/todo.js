const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Todo = require('../models/Todo');
const Category = require('../models/Category');

// get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// add new todo
router.post('/', async (req, res) => {
    try {
        const { todo } = req.body;
        const newTodo = new Todo({ todo });
        await newTodo.save();
        console.log('New todo successfully added!');
        res.status(201).json(newTodo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// delete a todo
router.delete('/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        await Todo.deleteOne({ _id });
        console.log('Todo successfully deleted!')
        res.status(204).end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add a category to a todo
router.post('/add-category/:todoId', async (req, res) => {
    try {
        const { name } = req.body;
        const { todoId } = req.params;
        const todo = await Todo.findById(todoId);

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        const category = new Category({ name });
        todo.categories.push(category);
        await category.save();
        await todo.save();
        res.status(201).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a category for a todo
router.put('/update-category/:todoId/:categoryId', async (req, res) => {
    try {
        const { name } = req.body;
        const { todoId, categoryId } = req.params;
        const todo = await Todo.findById(todoId);

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        category.name = name;
        await category.save();
        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Delete a category for a todo
router.delete('/delete-category/:todoId/:categoryId', async (req, res) => {
    try {
        const { todoId, categoryId } = req.params;
        const todo = await Todo.findById(todoId);

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const index = todo.categories.indexOf(categoryId);
        if (index !== -1) {
            todo.categories.splice(index, 1);
        }

        await category.remove();
        await todo.save();
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;