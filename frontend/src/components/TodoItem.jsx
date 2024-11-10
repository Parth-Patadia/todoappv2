import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './TodoItem.css';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
    const handleDelete = async () => {
        try {
            await onDelete(todo._id);
        } catch (error) {
            console.error('Delete error in TodoItem:', error);
        }
    };

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-content">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo._id)}
                    className="todo-checkbox"
                />
                <span className="todo-text">{todo.text}</span>
            </div>
            <div className="todo-actions">
                <button 
                    onClick={() => onEdit(todo)} 
                    className="btn btn-edit"
                    disabled={todo.completed}
                >
                    <FaEdit />
                </button>
                <button 
                    onClick={handleDelete} 
                    className="btn btn-delete"
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    );
}

export default TodoItem; 