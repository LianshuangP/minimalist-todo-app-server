const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
