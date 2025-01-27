import React from 'react'
import ToDo from './ToDo';

const ToDoList = ({todos, toggleTodo}) => {
  return todos.map((todo) => <ToDo todo={todo} key={todo.id} toggleTodo={toggleTodo}/>)
};

export default ToDoList; //コンポーネントをエキスポート
