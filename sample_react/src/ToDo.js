import React from 'react'

const ToDo = ({todo, toggleTodo}) => {

    const handleTodoClick = () => {
        toggleTodo(todo.id);
    };

  return (
    <div>
        <label>
            <input 
            type='checkbox' 
            checked={todo.completed} 
            readOnly 
            onChange={handleTodoClick}/>
        </label>
        {todo.name}
        </div>
  )
};

export default ToDo;
