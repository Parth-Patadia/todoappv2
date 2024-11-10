const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo
} = require('../controllers/todoController');

// Protected routes
router.use(protect);

router.route('/')
    .get(getTodos)
    .post(createTodo);

router.route('/:id')
    .put(updateTodo)
    .delete(deleteTodo);

router.put('/:id/toggle', toggleTodo);

module.exports = router; 