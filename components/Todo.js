import { RiDeleteBinLine } from 'react-icons/ri'
 

function Todo({ todo, toggleTodo, removeTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id)
  }
  function deleteTodo(){
    removeTodo(todo.id)
  }

  function confirmationButton() {
    const answer= window.confirm("Are you sure you want to delete this item?");
    if (answer) {
        deleteTodo()
      }
  }



  return (
      <li className='eachtodo container d-flex my-3 justify-content-between'>
        <div className='d-flex justify-content-start'>
          <input className="form-check-input" type="checkbox" value="" checked={todo.complete} onChange={handleTodoClick}/>
          <div style={todo.complete ? {textDecoration: 'line-through', opacity: '0.4', color:'black', marginLeft:'10px', textTransform: 'uppercase'} : {color:'black', marginLeft:'10px', textTransform: 'uppercase'}} >{todo.name}</div>
        </div>
        <div style={{cursor:'pointer'}}>
          <RiDeleteBinLine style={{color:'white'}} onClick={confirmationButton} className='delete-icon' title='Delete Todo'/> 
        </div>
      </li> 
  )
}
export default Todo;
