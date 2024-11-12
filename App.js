import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const savedTodoList = JSON.parse(localStorage.getItem("todoList")) || [];
    setTodoList(savedTodoList);
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const handleAddTodo = () => {
    if (userInput.trim() === "") {
      alert("Enter Valid Text");
      return;
    }

    const newTodo = {
      text: userInput,
      uniqueNo: todoList.length + 1,
    };

    setTodoList([...todoList, newTodo]);
    setUserInput("");
  };

  const handleDeleteTodo = (todoId) => {
    const updatedTodoList = todoList.filter((todo) => "todo" + todo.uniqueNo !== todoId);
    setTodoList(updatedTodoList);
  };

  const handleTodoStatusChange = (checkboxId) => {
    const updatedTodoList = todoList.map((todo) => {
      if ("checkbox" + todo.uniqueNo === checkboxId) {
        return { ...todo, isChecked: !todo.isChecked };
      }
      return todo;
    });

    setTodoList(updatedTodoList);
  };

  const renderTodos = () =>
    todoList.map((todo) => {
      const todoId = "todo" + todo.uniqueNo;
      const checkboxId = "checkbox" + todo.uniqueNo;

      return (
        <li key={todo.uniqueNo} className="todo-item-container d-flex flex-row" id={todoId}>
          <input
            type="checkbox"
            id={checkboxId}
            className="checkbox-input"
            checked={todo.isChecked || false}
            onChange={() => handleTodoStatusChange(checkboxId)}
          />
          <div className="label-container d-flex flex-row">
            <label
              htmlFor={checkboxId}
              className={`checkbox-label ${todo.isChecked ? "checked" : ""}`}
            >
              {todo.text}
            </label>
            <div className="delete-icon-container">
              <i
                className="far fa-trash-alt delete-icon"
                onClick={() => handleDeleteTodo(todoId)}
              ></i>
            </div>
          </div>
        </li>
      );
    });

  return (
    <div className="todos-bg-container">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="todos-heading">Todos</h1>
            <h1 className="create-task-heading">
              Create <span className="create-task-heading-subpart">Task</span>
            </h1>
            <input
              type="text"
              className="todo-user-input"
              placeholder="What needs to be done?"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button className="button" onClick={handleAddTodo}>
              Add
            </button>
            <h1 className="todo-items-heading">
              My <span className="todo-items-heading-subpart">Tasks</span>
            </h1>
            <ul className="todo-items-container">{renderTodos()}</ul>
            <button className="button">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
