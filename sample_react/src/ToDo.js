import React from 'react'

const ToDo = ({todo}) => {
  return (
    <div>
        <label>
            <input type='checkbox' checked={todo.completed} readOnly />
        </label>
        {todo.name}
        </div>
  )
};

export default ToDo;
