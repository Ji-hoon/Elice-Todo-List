import { useState, useRef, useEffect } from 'react';
import { FiCheck, FiPlus, FiChevronLeft, FiChevronRight, FiArrowUpCircle } from "react-icons/fi";

import styled from "styled-components";
import format from 'date-fns/format';

import '../index.css';

// import useTodoItems from "./pages/Main/hooks/useTodoItems.ts"

// import { TodoItemType, InputMode } from "../types/index.ts";
import Spacing from "./Spacing.tsx";

// import todoItemsDummy from '../assets/dummy/todoItems.ts';

//const defaultInputMode: InputMode = {type: "default"};

type TodoItemProps = {
    itemType: string;
    itemInfo: Object;
    onResetInputMode:Function;
    onRefreshTodo : Function;
    onEditTodo: Function;
    currentDate: Date;
    contentValue: string;
}

export default function TodoItem({
        itemType, 
        itemInfo, 
        onResetInputMode,
        onRefreshTodo,
        onEditTodo,
        currentDate,
        contentValue,
    }:TodoItemProps) {
    
    //const [todoItems, setTodoItems] = useState<TodoItem[]>(todoItemsDummy);

    //const [inputMode, setInputMode] = useState<InputMode>(defaultInputMode);

    //const [currentDate, setCurrentDate] = useState( new Date() );

    // const { onAddTodoItem, onToggleDone } = useTodoItems(currentDate);

    const [addInputValue, setAddInputValue] = useState("");

    const [editInputValue, setEditInputValue] = useState(contentValue);

    function handleChangeAddInputValue(event:React.ChangeEvent<HTMLInputElement>) {
        setAddInputValue(event.target.value);
        //console.log(addInputValue);
    }

    function handleChangeEditInputValue(event: React.ChangeEvent<HTMLInputElement>) {
        setEditInputValue(event.target.value);
      }
    

    function onAddTodoItem() {
        // todoItems에 추가하고 인풋모드를 리셋한다.
        const newTodo = JSON.parse(localStorage.getItem('todoData'));
    
        // const date = new Date();
        // const year = date.getFullYear();
        // const month = ('0' + (date.getMonth() + 1)).slice(-2);
        // const day = ('0' + date.getDate()).slice(-2);
        // const dateStr = `${year}-${month}-${day}`;
    
        const lastId = newTodo.map(item => parseInt(item.id))
        .reduce((prev, curr) => prev > curr ? prev : curr, 0);
        newTodo.push({id: String(lastId+1),
          content : addInputValue,
          isDone: false,
          createdAt : format(currentDate, "yyyy-MM-dd"),
        });
        //setTodoItems(newTodo);
        //console.log(newTodo);
        localStorage.setItem('todoData', JSON.stringify(newTodo));
        onRefreshTodo();
    }

    function onEditTodoItem() {

    }

    const onToggleDone = (id:string) => {
        //console.log(id);
        const newTodo = JSON.parse(localStorage.getItem('todoData'));
        const targetItem = newTodo.filter((item) => item.id === id );
        //console.log(targetItem);
        targetItem[0].isDone = !targetItem[0].isDone;
        localStorage.setItem('todoData', JSON.stringify(newTodo));
        onRefreshTodo();
    }
    
    //console.log(itemInfo);

    return(
        <div style={{padding:"0",display:"flex",flexDirection: "column", width:"100%"}} >
            
            {itemType == "add" && ( <>
                <TodoInput placeholder="새로운 할 일을 추가하세요"
                            autoFocus
                            type="text"
                            onChange={(e) => handleChangeAddInputValue(e)}
                            onKeyDown={(e) => { if(e.key === "Enter") {onAddTodoItem();onResetInputMode();} }}
                />
                <Spacing size={8}/>
                <div style={{display:"flex", gap: 8}}>
                    <button onClick={onResetInputMode}
                            style={{border: "2px solid #CFFF48",background:"transparent", color: "#CFFF48", borderRadius: 30, fontWeight: 700, fontSize: "1.05em", cursor:"pointer", padding: "5px 12px 4px"}}>
                        취소</button>
                    <button onClick={() => {
                            if(addInputValue == "") {
                                alert("1글자 이상 입력해주세요.");
                                return;
                            }
                            onAddTodoItem();
                            onResetInputMode();}}
                            style={{border:"none", background:"#CFFF48", color: "#000", borderRadius: 30, fontWeight: 700, fontSize: "1.05em",  cursor:"pointer", padding: "5px 12px 4px"}}>
                        할 일 추가</button>
                </div>
                <Spacing size={8}/>
            </>)}

            {itemType == "edit" && ( <>
                <TodoInput placeholder="수정할 내용을 입력하세요" 
                            autoFocus
                            value={editInputValue}
                            type="text"
                            onChange={(e) => handleChangeEditInputValue(e)}
                            onKeyDown={(e) => { if(e.key === "Enter") {onEditTodoItem();onResetInputMode();} }}
                />
                <Spacing size={8}/>
                <div style={{display:"flex", gap: 8}}>
                    <button onClick={onResetInputMode} 
                            style={{border: "2px solid #CFFF48",background:"transparent", color: "#CFFF48", borderRadius: 30, fontWeight: 700, fontSize: "1.05em", cursor:"pointer", padding: "5px 12px 4px"}}>
                        취소</button>
                    <button onClick={() => {
                        if(editInputValue == "") {
                            alert("1글자 이상 입력해주세요.");
                            return;
                        }
                        onEditTodoItem();
                        onResetInputMode();}}
                        style={{border:"none", background:"#CFFF48", color: "#000", borderRadius: 30, fontWeight: 700, fontSize: "1.05em",  cursor:"pointer", padding: "5px 12px 4px"}}>
                        수정</button>
                </div>
                <Spacing size={8}/>
            </>)}

            {itemType==="default" && (
                <div style={{display:'flex', flexDirection: "row", justifyContent:"space-between"}}>
                <Content onClick={onEditTodo}
                         isDone={itemInfo.todo.isDone}>{itemInfo.todo.content}</Content>
                <DoneButton style={{padding: 12, cursor:"pointer", display:"flex"}}
                            isDone={itemInfo.todo.isDone} 
                            onClick={()=> onToggleDone(itemInfo.todo.id)}>
                  <FiCheck size={26} />
                </DoneButton>
              </div>
            )}

        </div>  
    )
}

const Content = styled.div<{isDone:boolean}>`
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
    user-select: none;
    font-size: 1em;
    cursor: text;
    text-decoration:  ${(props) => (props.isDone ? "line-through" : "none")};
    color: ${(props) => (props.isDone ? "#999" : "#FFF")};
`;

const DoneButton = styled.div<{isDone:boolean}>`
    & > * {
        color: ${(props) => (props.isDone ? "var(--color-primary)" : "var(--color-gray-1)")};
    }
`;

const TodoInput = styled.input`
    font-size: 1em;
    padding:0;
    font-family :var(--font-family);
    background: transparent;
    border: none; 
    border-bottom: 1px solid transparent;
    outline: none;
    color: var(--color-white);
    height:52px;

    & ~ div {
        position: relative;
    }
    & ~ div:nth-child(2):before {
        content:'';
        background-color: var(--color-white);
        height: 1px;
        position: absolute;
        top: -2px;
        transform: scaleX(0);
        transform-origin: center;
        width: 100%;
    }
    &:focus ~ div:nth-child(2):before {
        transform: scaleX(1);
        transition: transform 250ms cubic-bezier(0.57, 0.09, 0.46, 1.01);
    }
`;