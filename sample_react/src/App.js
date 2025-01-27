import { useState, useRef } from "react";
import ToDoList from "./ToDoList";
import {v4 as uuidv4} from "uuid";

function App() {
  const [todos, setTodos] = useState([{id: 1, name: "Todo1", completed: false }]);//変数を管理するためのhooks

  const todoNameRef = useRef(); //refの要素を取得

  const handleAddTodo = () => {
    const name = todoNameRef.current.value;
    setTodos((prevTodos) => {
      return [...prevTodos, {id: uuidv4(), name:name, completed:false}] // ...prevTodosで前のタスクを展開
    });
    todoNameRef.current.value = null;
  };

  return (
    <div>
      <ToDoList todos={todos} /> 
      {/* propsで値を渡す */}
      <input type="text" ref = {todoNameRef}/>
      <button onClick={handleAddTodo}>タスクの追加</button>
      <button>完了したタスクの削除</button>
      <div>残りのタスク:0</div>
    </div>
  );
}

export default App;
