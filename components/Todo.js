import { TbEdit } from 'react-icons/tb'
import { RiDeleteBinLine } from 'react-icons/ri'
 

function Todo({ todo, toggleTodo, removeTodo, updateTodo }) {
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

  function editTodo() {
    updateTodo(todo.id)
  }


  return (
    <div>
      <li className='eachtodo container d-flex my-3 justify-content-between'>
        <div className='d-flex justify-content-start'>
          <input className="form-check-input" type="checkbox" value="" checked={todo.complete} onChange={handleTodoClick}/>
          <div style={todo.complete ? {textDecoration: 'line-through', opacity: '0.4', color:'black'} : {color:'black'}}>{todo.name}</div>
        </div>
        <div style={{cursor:'pointer'}}>
          <TbEdit style={{color:'white'}} onClick={editTodo} className='edit-icon' title='Edit Todo'/>
          <RiDeleteBinLine style={{color:'white'}} onClick={confirmationButton} className='delete-icon' title='Delete Todo'/> 
        </div>
      </li> 
    </div>
  )
}
export default Todo;
