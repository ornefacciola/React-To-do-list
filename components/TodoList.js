import React from 'react'
import Todo from './Todo'
//rfc
//we are gonna need todos re

export default function ToDoList ({ todos, toggleTodo, removeTodo }) {
  return (
    todos.map(todo => {
        return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} removeTodo={removeTodo}/>
    }) 
  ) //each todo has to have a key prop bc it needs to be updated when changed. With a key we make sure its unique. 
}//we give the id bc it's unique, the name can be repeated. 
