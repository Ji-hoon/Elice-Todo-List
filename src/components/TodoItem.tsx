import { useState, useRef, useEffect } from 'react';
import { FiCheck, FiPlus, FiChevronLeft, FiChevronRight, FiArrowUpCircle } from "react-icons/fi";

import styled from "styled-components";
import '../index.css';

import useTodoItems from "./pages/Main/hooks/useTodoItems.ts"

import { TodoItemType, InputMode } from "../types/index.ts";
import Spacing from "./Spacing.tsx";

//const defaultInputMode: InputMode = {type: "default"};

type TodoItemProps = {
    itemType: string;
    itemInfo: Object;
    onResetInputMode:Function;
  }

export default function TodoItem({itemType, itemInfo, onResetInputMode}:TodoItemProps) {
    //const [inputMode, setInputMode] = useState<InputMode>(defaultInputMode);
    const [addInputValue, setAddInputValue] = useState("");

    const [currentDate, setCurrentDate] = useState( new Date() );

    const { onAddTodoItem, onToggleDone } = useTodoItems(currentDate);

    function handleChangeAddInputValue(event:React.ChangeEvent<HTMLInputElement>) {
        setAddInputValue(event.target.value);
        //console.log(addInputValue);
    }
    
    //console.log(itemInfo);

    return(
        <div style={{padding:"0",display:"flex",flexDirection: "column", width:"100%"}} >
            {itemType == "add" && ( <>
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
                <button onClick={onResetInputMode} style={{border: "2px solid #CFFF48",background:"transparent", color: "#CFFF48", borderRadius: 30, fontWeight: 700, fontSize: "1.05em", cursor:"pointer", padding: "5px 12px 4px"}}>취소</button>
                <button onClick={() => {
                    onAddTodoItem();
                    onResetInputMode();}}
                style={{border:"none", background:"#CFFF48", color: "#000", borderRadius: 30, fontWeight: 700, fontSize: "1.05em",  cursor:"pointer", padding: "5px 12px 4px"}}>저장</button>
                </div>
            </>)}
            {itemType==="default" && (
                <div style={{display:'flex', flexDirection: "row", justifyContent:"space-between"}}>
                <Content isDone={itemInfo.todo.isDone}>{itemInfo.todo.content}</Content>
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
    text-decoration:  ${(props) => (props.isDone ? "line-through" : "none")};
    color: ${(props) => (props.isDone ? "#999" : "#FFF")};
`;

const DoneButton = styled.div<{isDone:boolean}>`
    & > * {
        color: ${(props) => (props.isDone ? "var(--color-primary)" : "var(--color-gray-1)")};
    }
`;