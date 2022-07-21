import logo from './logo.svg';
import './App.css';
import { Header } from './component/header'
import { createContext, useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Done } from './component/completed';
import { AddTodo } from './component/add-todo';
import { Removed } from './component/removed';

import { SetDate, SetTime } from './component/set-time';

export const FullData = createContext("")

function App() {
  const date = SetDate()
  const [data, setData] = useState([{}])
  const time = SetTime()
  const [count, setCount] = useState(0)
  useEffect(() => {

    async function getDataAPI() {
      const getData = await fetch('https://dummyjson.com/todos')
        .then(res => res.json())
        .then(data => {
          data.todos.map((item) => {
            item.time = time;
            item.date = date;
            item.removed = false
            item.completed = false
            item.disabled = true
            item.isEdit = false
            return item
          }
          )
          setData(data.todos)

        })
      // .then(()=>{

      // })


    }
    getDataAPI()

  }, [])

  return (
    <FullData.Provider value={{data, setData, count, setCount}}>
      <BrowserRouter>

        <Header />
        
        <Routes path="/" element={<AddTodo />}>
          <Route path="todo" element={<AddTodo />} ></Route>
          <Route path="completed" element={<Done />} ></Route>
          <Route path="removed" element={<Removed />} ></Route>
        </Routes>
      </BrowserRouter>
    </ FullData.Provider>

  );
}

export default App;
