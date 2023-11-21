import { useState, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
// import './App.css';

import { FiCheck, FiPlus, FiChevronLeft, FiChevronRight, FiArrowUpCircle } from "react-icons/fi";
import todoItemsDummy from './assets/dummy/todoItems.ts';
import format from 'date-fns/format';


function App() {
  const [todoItems, setTodoItems] = useState(todoItemsDummy);
  const [currentDate, setCurrentDate] = useState( new Date() );
  
  const elementRef = useRef(null);
  console.log(currentDate);

  const scrollToTop = ():void => {
    const element = elementRef.current;
    if (element) {
      element.scrollTo({top:0, behavior:"smooth"});
    }
  };

  return (      
    <main style={{ maxWidth: 400, height: "100vh", margin: "0 auto",backgroundColor: "#1e1e1e",position:"relative", }}>
      
      <button style={{borderRadius: 30, backgroundColor: "#CFFF48", top: "calc(100% - 70px)", left: "calc(100% - 70px)", display: "flex", position: "absolute",
        width: 48, height: 48, placeItems: "center",placeContent: "center", cursor:"pointer", border:"none"}}>
        <FiPlus color="#1E1E1E" size={24}/>
      </button>
      <section ref={elementRef} 
               style={{overflow:"hidden auto", height: "100%", padding: "0 0 2em", }}>
        <header style={{display: "flex", position: "sticky", top:0, backgroundColor: "#1E1E1E", alignItems: "center", padding: 8, boxShadow: "0 1px 0 0 rgba(255,255,255,0.08)"}}>
          <div style={{padding: 12, cursor:"pointer", display:"flex"}}>
            <FiChevronLeft color="#FFF" size={24}/>
          </div>
          <div style={{flexGrow:1, textAlign:"center", alignItems: "center",display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <div style={{fontSize: 20,fontWeight: 700,}}>{format(currentDate, "MM월 dd일")}</div>
            <div style={{fontSize: 14}}>{format(currentDate, "yyyy년")}</div>
          </div>
          <div style={{padding: 12, cursor:"pointer", display:"flex"}}>
            <FiChevronRight color="#FFF" size={24}/>
          </div>
        </header>
        <div className="todoItemList" 
            style={{display:"flex", flexDirection: "column", alignItems:"center",padding: "1em 1.5em"}}>

          {[...todoItems,...todoItems,...todoItems].map( (todo) =>  {
            return (
              <div key={todo.id} style={{padding: "8px 0", width:"100%"}}>
                
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
          <div style={{display:"flex", justifyContent:"center", width:"fit-content", margin: "2em 0 0", cursor:"pointer"}}
              onClick={scrollToTop}>
            <FiArrowUpCircle color="#505050" size="36"/>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
