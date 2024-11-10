const Todo = require('../models/todoModel');

// @desc    Get todos
// @route   GET /api/todos
// @access  Private
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create todo
// @route   POST /api/todos
// @access  Private
const createTodo = async (req, res) => {
    try {
        if (!req.body.text) {
            return res.status(400).json({ message: 'Please add a text field' });
        }

        const todo = await Todo.create({
            text: req.body.text,
            user: req.user.id
        });

        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Private
const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Check for user
        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Private
const deleteTodo = async (req, res) => {
    try {
        // Find and delete in one operation
        const deletedTodo = await Todo.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found or not authorized' });
        }

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        console.error('Delete Error:', error);
        res.status(500).json({ message: 'Error deleting todo' });
    }
};

// @desc    Toggle todo completion
// @route   PUT /api/todos/:id/toggle
// @access  Private
const toggleTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Check for user
        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        todo.completed = !todo.completed;
        await todo.save();

        res.status(200).json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo
}; 