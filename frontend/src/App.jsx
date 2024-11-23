import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState([]);

  // Fetch todos when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  // Add a new todo
  const addTodo = (newTodo) => {
    axios
      .post("http://localhost:5000/todos", { task: newTodo })
      .then((response) => {
        const newTodoWithId = { id: response.data.id, task: newTodo }; // Add the id from the server response
        setTodos([...todos, newTodoWithId]);
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  // Delete a todo
  const deleteTodo = (id) => {
    if (id !== undefined) {
      axios
        .delete(`http://localhost:5000/todos/${id}`)
        .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
        .catch((error) => console.error("Error deleting todo:", error));
    } else {
      console.error("Todo ID is undefined");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">To-Do List</h1>
        <AddTodo addTodo={addTodo} />
        <TodoList todos={todos} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
};

export default App;
