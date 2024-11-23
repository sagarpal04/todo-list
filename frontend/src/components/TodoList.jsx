import React from "react";

const TodoList = ({ todos, deleteTodo }) => {
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex justify-between items-center bg-gray-50 p-2 border rounded-lg shadow-sm"
        >
          <span className="text-gray-700">{todo.task}</span>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
