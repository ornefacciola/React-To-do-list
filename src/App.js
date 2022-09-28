import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef() //gives us access to the input
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos);
  }, [])

  useEffect(() => { //calls another function
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]) //anytime todos changes we want to save them using local storage

  function toggleTodo(id) {
    const newTodos = [...todos] //new list of todos, a copy, we do not modify the original
    const todo = newTodos.find(todo => todo.id === id) //this is the one we're modifying
    todo.complete = !todo.complete
    setTodos(newTodos) //toggles from complete to incomplete
  }

  function handleAddTodo(e) { //e takes the click. Adds a todo the user added to the list
    const name = todoNameRef.current.value
    if (name === "") return //if an string is typed, show it into the console
    setTodos(prevTodos => { //previous todo is a function call that gives us the previous todo to change it.
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null //when typed and clicked, do not show the todo into the space bar 
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)

  }
  return (
    <>
      <div className='container-fluid'>
        <div className='row justify-content-center'>
          <h1 className='todo row justify-content-center'>To-Do List</h1>
          <input className='inp col-8' ref={todoNameRef} type="text" placeholder="Insert your to-do here" />
          <div className='container text-center'>
            <Button variant="contained" className='col-6' color="success" onClick={handleAddTodo}>Add todo</Button>
            <Button variant="contained" className='col-2' color="error"component="label" onClick={handleClearTodos}>Clear Complete</Button>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
          <div>{todos.filter(todo => !todo.complete).length} left to do</div>
          </div>
        </div>
      </div>
    </>
  )
}


export default App;
