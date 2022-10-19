import React, { useState, useRef, useEffect } from 'react';
import TodoList from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';
import db from './firebase-config';
import { collection, getDocs } from "firebase/firestore";

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([]) 
  const todoNameRef = useRef()
  
  useEffect(() => {
    const getData = async() => {
      const datas = await getDocs(collection(db, 'users'))
      datas.forEach((documents) => {
        console.log(documents.data());
      });
    }

    getData()
  }, []);

  useEffect(() => { 
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos); 
  }, [])
  useEffect(() => { 
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos)) 
  }, [todos]) 

  function toggleTodo(id) {
    const newTodos = [...todos] 
    const todo = newTodos.find(todo => todo.id === id) 
    todo.complete = !todo.complete 
    setTodos(newTodos) 
  }

  function handleAddTodo(e) { 
    const name = todoNameRef.current.value
    if (name === "") return 
    setTodos(prevTodos => {  
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null 
  }

  function removeTodo(id) {
    const removeArr = [...todos].filter(todo => todo.id !== id)
    setTodos(removeArr)
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete) 
    setTodos(newTodos)
  }



  return (
    <>
      <div className='container-fluid'>
        <form className='todo-form'>
          <div className='row justify-content-center'>
          <h1 className='todo row justify-content-center' style={{color: 'white' }}>To-Do List</h1>
          <div>
            <input className='inp col-9' style={{color: 'white'}} ref={todoNameRef} type="text" placeholder="What is your to do?" /> 
          </div>
          <div className="row justify-content-center row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2">
            <Button variant="contained" className='col-9 col-sm-9 col-md-6  col-lg-6' color="success" onClick={handleAddTodo}>Add todo</Button>
            <Button variant="outlined" className='col-9 col-sm-9 col-md-3 col-lg-3' color="error"component="label" onClick={handleClearTodos}>Clear todos</Button>
          </div>
          <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
          <div style={{color: 'rgb(151, 151, 151)'}}>{todos.filter(todo => !todo.complete).length} left to do</div> 
          </div>
        </form>
      </div>
    </>
  )
}


export default App;
