import React from 'react'

//recibimos cada todo y printea de todo el array, solo el name. El name puede ser el mismo. 

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id)
  }
  return (
    <div>
      <label>
        <input type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
        {todo.name} 
        tu vieja
      </label> 
    </div>
  )
}
