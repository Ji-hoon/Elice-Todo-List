import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
// import './App.css';

import { FiCheck, FiPlus, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import todoItemsDummy from './assets/dummy/todoItems.ts';
import format from 'date-fns/format';


function App() {
  const [todoItems, setTodoItems] = useState(todoItemsDummy);
  const [currentDate, setCurrentDate] = useState( new Date() );

  console.log(currentDate);

  return (      
    <main style={{ maxWidth: 400, height: "100vh", margin: "0 auto",backgroundColor: "#1e1e1e",position:"relative", }}>
      
      <button style={{borderRadius: 30, backgroundColor: "#CFFF48", top: "calc(100% - 80px)", left: "calc(100% - 80px)", display: "flex", position: "absolute",
        width: 48, height: 48, placeItems: "center",placeContent: "center", cursor:"pointer", border:"none"}}>
        <FiPlus color="#1E1E1E" size={24}/>
      </button>
      <section style={{overflow:"hidden auto", height: "100%", padding: "0 0 5em", }}>
        <header style={{display: "flex", position: "sticky", top:0, backgroundColor: "#1E1E1E", alignItems: "center", padding: 8}}>
          <div style={{padding: 12, cursor:"pointer"}}>
            <FiChevronLeft color="#FFF" size={24}/>
          </div>
          <div style={{flexGrow:1, textAlign:"center", alignItems: "center",display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <div style={{fontSize: 20,fontWeight: 700,}}>{format(currentDate, "MM월 dd일")}</div>
            <div style={{fontSize: 14}}>{format(currentDate, "yyyy년")}</div>
          </div>
          <div style={{padding: 12, cursor:"pointer"}}>
            <FiChevronRight color="#FFF" size={24}/>
          </div>
        </header>
        <div className="todoItemList" 
            style={{display:"flex", flexDirection: "column",padding: "0 1.25em"}}>

          {[...todoItems,...todoItems,...todoItems].map( (todo) =>  {
            return (
              <div key={todo.id} index={todo.id} style={{padding: "8px 0"}}>
                
                {!todo.isDone &&
                  <div style={{display:'flex', flexDirection: "row", justifyContent:"space-between"}}>
                    <div style={{whiteSpace: "nowrap",overflow: "hidden", textOverflow: "ellipsis"}}>{todo.content}</div>
                    <FiCheck size={26}/>
                  </div>}
                
                {todo.isDone &&
                  <div style={{display:'flex', flexDirection: "row", justifyContent:"space-between"}}>
                    <div style={{whiteSpace: "nowrap",overflow: "hidden", textOverflow: "ellipsis", textDecoration: "line-through", color: "#999"}}>{todo.content}</div>
                    <FiCheck color="#CFFF48" size={26}/>
                  </div>}
              </div>
              )
            })
          }

        </div>
      </section>
    </main>
  )
}

export default App
