import { useState, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
// import './App.css';

import { FiCheck, FiPlus, FiChevronLeft, FiChevronRight, FiArrowUpCircle } from "react-icons/fi";
import todoItemsDummy from './assets/dummy/todoItems.ts';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';

import Spacing from "./components/Spacing.tsx";
import { InputMode, TodoItem } from "./types";


const defaultInputMode: InputMode = {type: "default"};

function App() {
  const [todoItems, setTodoItems] = useState<TodoItem[]>(todoItemsDummy as TodoItem[]);
  const [currentDate, setCurrentDate] = useState( new Date() );

  const [inputMode, setInputMode] = useState<InputMode>(defaultInputMode);
  const [addInputValue, setAddInputValue] = useState("");
  const [editInputValue, setEditInputValue] = useState("");
  
  const elementRef = useRef(null);
  //console.log(currentDate);

  function handleAddMode() {
    setInputMode({type: "add"});
  }

  function handleEditMode(item:TodoItem) {
    setInputMode({type: "edit", item:item});
  } 

  function handleResetInputMode() {
    setInputMode(defaultInputMode);
  }

  function handleChangeAddInputValue(event:React.ChangeEvent<HTMLInputElement>) {
    setAddInputValue(event.target.value);
  }

  function handleAddTodoItem() {
    // todoItems에 추가하고 인풋모드를 리셋한다.
    const newTodo = [...todoItems];

    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const dateStr = `${year}-${month}-${day}`;

    const lastId = newTodo.map(item => parseInt(item.id))
    .reduce((prev, curr) => prev > curr ? prev : curr);
    newTodo.push({id: String(lastId+1),
      content : addInputValue,
      isDone: false,
      createdAt : dateStr,
    });
    setTodoItems(newTodo);
    handleResetInputMode();
    console.log(todoItems);
  }

  function handleMoveNextDate() {
    const newDate = addDays(currentDate, 1);
    //console.log(newDate);
    setCurrentDate(newDate);
  }

  function handleMovePrevDate() {
    const newDate = subDays(currentDate, 1);
    //console.log(newDate);
    setCurrentDate(newDate);
  }

  const scrollToTop = ():void => {
    const element = elementRef.current;
    if (element) {
      element.scrollTo({top:0, behavior:"smooth"});
    }
  };
  
  const toggleDone = (id:string) => {
    const newTodo = [...todoItems];
    const targetItem = newTodo.filter((item) => item.id === id );
    //console.log(targetItem);
    targetItem[0].isDone = !targetItem[0].isDone;
    setTodoItems(newTodo);
  }

  



  return (      
    <main style={{ maxWidth: 420, height: "100vh", margin: "0 auto",backgroundColor: "#1e1e1e",position:"relative", }}>
      
      <button onClick={() => {
        handleAddMode(); 
        scrollToTop();}}
      style={{borderRadius: 30, backgroundColor: "#CFFF48", top: "calc(100% - 70px)", left: "calc(100% - 70px)", display: "flex", position: "absolute",
        width: 48, height: 48, placeItems: "center",placeContent: "center", cursor:"pointer", border:"none"}}>
        <FiPlus color="#1E1E1E" size={24}/>
      </button>
      <section ref={elementRef} 
               style={{overflow:"hidden auto", height: "100%", padding: "0 0 2em", }}>
        <header style={{display: "flex", position: "sticky", top:0, backgroundColor: "#1E1E1E", alignItems: "center", padding: 8, boxShadow: "0 1px 0 0 rgba(255,255,255,0.08)"}}>
          <div onClick={handleMovePrevDate}
                style={{padding: 12, cursor:"pointer", display:"flex"}}>
            <FiChevronLeft color="#FFF" size={24}/>
          </div>
          <div style={{flexGrow:1, textAlign:"center", alignItems: "center",display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <div style={{fontSize: 20,fontWeight: 700,}}>{format(currentDate, "MM월 dd일")}</div>
            <div style={{fontSize: 14}}>{format(currentDate, "yyyy년")}</div>
          </div>
          <div onClick={handleMoveNextDate} 
              style={{padding: 12, cursor:"pointer", display:"flex"}}>
            <FiChevronRight color="#FFF" size={24}/>
          </div>
        </header>
       
        <div className="todoItemList" 
            style={{display:"flex", flexDirection: "column", alignItems:"center",padding: "1em 1em 1em 1.5em"}}>
          
          {inputMode.type === "add" && (
          <div style={{padding:"0",display:"flex",flexDirection: "column", width:"100%"}} >
            <input placeholder="할 일을 입력하세요"
                   type="text"
                  onChange={(e) => handleChangeAddInputValue(e)}
                  style={{fontSize: "1em", padding: "8px 0", 
                    background: "transparent",
                    border: "none", 
                    borderBottom: "2px solid #FFF",
                    outline: "none", color: "#FFF"}}
            />
            <Spacing size={8}/>
            <div style={{display:"flex", gap: 8}}>
              <button onClick={handleResetInputMode} style={{border: "2px solid #CFFF48",background:"transparent", color: "#CFFF48", borderRadius: 30, fontWeight: 700, fontSize: "1.05em", cursor:"pointer", padding: "5px 12px 4px"}}>취소</button>
              <button onClick={handleAddTodoItem}
              style={{border:"none", background:"#CFFF48", color: "#000", borderRadius: 30, fontWeight: 700, fontSize: "1.05em",  cursor:"pointer", padding: "5px 12px 4px"}}>저장</button>
            </div>
          </div>
          )}

          {[...todoItems].map( (todo) =>  {
            return (
              <div key={todo.id} style={{padding: "0", width:"100%"}}>
                
                {/* {inputMode === "edit" && inputMode.item} */}
                {!todo.isDone &&
                  <div style={{display:'flex', flexDirection: "row", justifyContent:"space-between"}}>
                    <div style={{display: "flex", alignItems: "center", whiteSpace: "nowrap",overflow: "hidden", textOverflow: "ellipsis"}}>{todo.content}</div>
                    <div style={{padding: 12, cursor:"pointer", display:"flex"}}
                        onClick={()=> toggleDone(todo.id)}>
                      <FiCheck size={26}/>
                    </div>
                  </div>}
                
                {todo.isDone &&
                  <div style={{display:'flex', flexDirection: "row", justifyContent:"space-between"}}>
                    <div style={{display: "flex", alignItems: "center", whiteSpace: "nowrap",overflow: "hidden", textOverflow: "ellipsis", textDecoration: "line-through", color: "#999"}}>{todo.content}</div>
                    
                    <div style={{padding: 12, cursor:"pointer", display:"flex"}}
                        onClick={()=> {toggleDone(todo.id)}}>
                      <FiCheck color="#CFFF48" size={26}/>
                    </div>
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
