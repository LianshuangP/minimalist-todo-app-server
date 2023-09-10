const mongoose = require('mongoose'); 

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true, 
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
});

const Todo = mongoose.model('Todo', todoSchema); 

module.exports = Todo;