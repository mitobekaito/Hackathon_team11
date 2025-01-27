import { useState, useRef } from "react";
import ToDoList from "./ToDoList";
import {v4 as uuidv4} from "uuid";

function App() {
  const [todos, setTodos] = useState([]);//変数を管理するためのhooks

  const todoNameRef = useRef(); //refの要素を取得

  const handleAddTodo = () => {
    const name = todoNameRef.current.value;
    if(name === "")return;//空のタスク無効
    setTodos((prevTodos) => {
      return [...prevTodos, {id: uuidv4(), name:name, completed:false}] // ...prevTodosで前のタスクを展開
    });
    todoNameRef.current.value = null;
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];//状態変数で管理されているためtodosをcopy
    const todo = newTodos.find((todo) => todo.id === id);//すべてのidを見てtrueのものをtodoに格納する
    todo.completed = !todo.completed;//引数のものと一致したらcheckboxを反転させる
    setTodos(newTodos);//状態を更新
  };
  
  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }

  return (
    <div>
      <ToDoList todos={todos} toggleTodo={toggleTodo}/> 
      {/* propsで値を渡す */}
      <input type="text" ref = {todoNameRef}/>
      <button onClick={handleAddTodo}>タスクの追加</button>
      <button onClick={handleClear}>完了したタスクの削除</button>
      <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>
      {/* find関数の逆でfalseのものだけ残す */}
    </div>
  );
}

export default App;
