import { useState, useRef, useEffect } from 'react';
import '../../../index.css';

import { FiCheck, FiPlus, FiChevronLeft, FiChevronRight, FiArrowUpCircle } from "react-icons/fi";
import todoItemsDummy from '../../../assets/dummy/todoItems.ts';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';

import { TodoItemType, InputMode } from "../../../types/index.ts";
import TodoItem from "../../TodoItem.tsx";
import Header from "../../Header.tsx";


//import useTodoItems from "./hooks/useTodoItems.ts"
import styled from "styled-components";

const defaultInputMode: InputMode = {type: "default"};

const today = format( new Date(), "MM월 dd일");

export default function Main() {

  const [currentDate, setCurrentDate] = useState( new Date() );
  const [todoItems, setTodoItems] = useState<TodoItemType[]>([]);
//   const [addInputValue, setAddInputValue] = useState("");
  const [editInputValue, setEditInputValue] = useState("");
  
  const [inputMode, setInputMode] = useState<InputMode>(defaultInputMode);

  //const { onAddTodoItem, onToggleDone } = useTodoItems();

  const elementRef = useRef(null);
  //console.log(currentDate);

  function handleAddMode() {
    setInputMode({type: "add"});
  }

  function handleEditMode(item:TodoItemType) {
    setInputMode({type: "edit", item:item});
  } 

  function handleResetInputMode() {
    setInputMode(defaultInputMode);
  }

//   function handleChangeAddInputValue(event:React.ChangeEvent<HTMLInputElement>) {
//     setAddInputValue(event.target.value);
//   }

//   function handleAddTodoItem() {
//     // todoItems에 추가하고 인풋모드를 리셋한다.
//     const newTodo = [...todoItems];

//     const date = new Date();
//     const year = date.getFullYear();
//     const month = ('0' + (date.getMonth() + 1)).slice(-2);
//     const day = ('0' + date.getDate()).slice(-2);
//     const dateStr = `${year}-${month}-${day}`;

//     const lastId = newTodo.map(item => parseInt(item.id))
//     .reduce((prev, curr) => prev > curr ? prev : curr, 0);
//     newTodo.push({id: String(lastId+1),
//       content : addInputValue,
//       isDone: false,
//       createdAt : dateStr,
//     });
//     setTodoItems(newTodo);
//     handleResetInputMode();
//     console.log(todoItems);
//   }

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

  function onRefreshTodo() {
    //const newTodo = JSON.parse(localStorage.getItem('todoData'));
    // setTodoItems(newTodo);
    // console.log(newTodo);
    //setCurrentDate(currentDate);

    const dateString = format(currentDate, 'yyyy-MM-dd'); // date type을 스트링으로 바꿔서 비교해야 함
    //console.log(dateString);
    const localTodoData = JSON.parse(localStorage.getItem('todoData'));
    const todayTodo = localTodoData.filter( (item) => item.createdAt === dateString);
    //console.log(todayTodo);
    setTodoItems(todayTodo);
  }

  useEffect( () => {
    const savedData = localStorage.getItem('todoData');
    if (!savedData) {
        localStorage.setItem('todoData', JSON.stringify(todoItemsDummy));
        return;
    }
    //const parsedData = JSON.parse(savedData);
    //setTodoItems(parsedData);
  },[]);

  useEffect( () => {
    
  }, [todoItems]);

  useEffect( () => {
    onRefreshTodo();
  }, [currentDate, ]);

  return (      
    <main style={{ maxWidth: 420, height: "100vh", margin: "0 auto",backgroundColor: "#1e1e1e",position:"relative",
     border: "1px solid rgba(255,255,255,0.08)"}}>
      
      <button onClick={() => {
        handleAddMode(); 
        scrollToTop();}}
            style={{borderRadius: 30, backgroundColor: "#CFFF48", top: "calc(100% - 70px)", left: "calc(100% - 70px)", display: "flex", position: "absolute",
            width: 48, height: 48, placeItems: "center",placeContent: "center", cursor:"pointer", border:"none", }}>
        <FiPlus color="var(--color-black)" size={30}/>
      </button>
      <section ref={elementRef} 
               style={{overflow:"hidden auto", height: "100%", padding: "0 0 2em", }}>
        
        <Header handleMovePrevDate={() => handleMovePrevDate()}
                handleMoveNextDate={() => handleMoveNextDate()}
                currentDate={currentDate}
                today={today}/>
       
        <div className="todoItemList" 
            style={{display:"flex", flexDirection: "column", alignItems:"center",padding: "1em 1em 1em 1.5em"}}>
          
          {inputMode.type === "add" && (
            <TodoItem itemType="add" onResetInputMode={handleResetInputMode} onRefreshTodo={onRefreshTodo} itemInfo={{}}/>
          )}

          {[...todoItems].map( (todo) =>  {
            return (
              <div key={todo.id} style={{padding: "0", width:"100%"}}>
                {/* {inputMode === "edit" && inputMode.item} */}
                {inputMode.type!=="edit" &&
                    <TodoItem itemType="default" onResetInputMode={handleResetInputMode} onRefreshTodo={onRefreshTodo} itemInfo={{todo}}/>
                }
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