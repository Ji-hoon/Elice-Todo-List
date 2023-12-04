
import { useState, useRef, useEffect } from 'react';

import { FiCheck, FiPlus, FiMoon, FiSun, FiHome, FiChevronLeft, FiChevronRight, FiArrowUpCircle } from "react-icons/fi";

import { useRecoilValue } from 'recoil';
import { todoItemsAtom, filteredTodoItemsSelector, currentDateAtom } from "../components/Atoms/todoItemsAtom.ts";
import styled from "styled-components";

import format from 'date-fns/format';
import { colors } from '../theme/color.ts';

type HeaderProps = {
    handleMovePrevDate: Function;
    handleMoveNextDate: Function;
    today:string;
    theme:string;
    toggleTheme:Function;
    handleMoveHome: Function;
}

export default function Header({
    handleMovePrevDate,
    handleMoveNextDate,
    today, 
    theme,
    toggleTheme, 
    handleMoveHome,
    }:HeaderProps) {

    const currentDate = useRecoilValue(currentDateAtom);
    return (
        <header style={{display: "flex", position: "sticky", top:0, backgroundColor: "var(--color-background)", color: "var(--color-text)",gap:8, alignItems: "center", padding: 8, zIndex: 1, boxShadow: "var(--shadow-header)", transition: "var(--transition-ease-out)"}}>
          <div onClick={handleMoveHome}
                style={{padding: 12, cursor:"pointer", display:"flex"}}>
            <FiHome size={24}/>
          </div>
          <div onClick={handleMovePrevDate}
                style={{padding: 12, cursor:"pointer", display:"flex"}}>
            <FiChevronLeft size={24}/>
          </div>
          <div style={{flexGrow:1, textAlign:"center", alignItems: "center",display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <div style={{fontSize: 20,fontWeight: 700, userSelect: "none", display:"flex", alignItems:"center", gap: 4}}>
                <span>{format(currentDate, "MM월 dd일")}</span>
                {format(currentDate, "MM월 dd일") === today 
                 && <span style={{fontSize:"0.55em", padding: "0.1em 0.6em", backgroundColor: "var(--color-primary)", color:"var(--color-gray-3)", borderRadius:80}}>
                      오늘</span>}
            </div>
            <div style={{fontSize: 14, userSelect: "none"}}>{format(currentDate, "yyyy년")}</div>
          </div>
          <div onClick={handleMoveNextDate} 
              style={{padding: 12, cursor:"pointer", display:"flex"}}>
            <FiChevronRight size={24}/>
          </div>
          <ToggleButton onClick={toggleTheme} 
              style={{padding: 12, cursor:"pointer", display:"flex"}}>
            {theme==="theme-dark" && <FiMoon size={24}/>}
            {theme==="theme-light" && <FiSun size={24}/>}
          </ToggleButton>
        </header>
    )
}

const ToggleButton = styled.div`
  & > svg {
    color: inherit;
    animation: var(--quarter-rotate-animation);
    will-change: transform;
  }
`