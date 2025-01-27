import React from 'react'
import ToDo from './ToDo';

const ToDoList = ({todos}) => {
  return todos.map((todo) => <ToDo todo={todo} key={todo.id}/>)
};

export default ToDoList; //コンポーネントをエキスポート
