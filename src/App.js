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
  useEffect(() => {
    
    async function getDataAPI(){
      const getData = await fetch('https://dummyjson.com/todos')
      .then(res => res.json())
      .then(data => setData(data.todos))
      // .then(()=>{
      //   const fake = data.map((item)=>{ 
      //     item.time = time;
      //     item.date = date;
      //     item.removed = false
      //     return item
      //   })
      //   setData(fake)
        
      // })
       
      
    }
    getDataAPI()
   
  }, [])

  return (
    <FullData.Provider value={[data, setData]}>
      <BrowserRouter>
        
        <Header />
        <Routes path="/" element={<Header />}>
          <Route path="todo" element={<AddTodo />} ></Route>
          <Route path="completed" element={<Done />} ></Route>
          <Route path="removed" element={<Removed />} ></Route>
        </Routes>
      </BrowserRouter>
    </ FullData.Provider>

  );
}

export default App;
