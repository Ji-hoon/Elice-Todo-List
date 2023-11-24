
import { useState, useRef, useEffect } from 'react';

import { FiCheck, FiPlus, FiChevronLeft, FiChevronRight, FiArrowUpCircle } from "react-icons/fi";

import format from 'date-fns/format';

type HeaderProps = {
    handleMovePrevDate: Function;
    handleMoveNextDate: Function;
    currentDate: Date;
    today:string;
}

export default function Header({
    handleMovePrevDate,
    handleMoveNextDate,
    currentDate,
    today,
    }:HeaderProps) {


    return (
        <header style={{display: "flex", position: "sticky", top:0, backgroundColor: "#1E1E1E", alignItems: "center", padding: 8, zIndex: 1, boxShadow: "0 1px 0 1px rgba(255,255,255,0.08)"}}>
          <div onClick={handleMovePrevDate}
                style={{padding: 12, cursor:"pointer", display:"flex"}}>
            <FiChevronLeft color="#FFF" size={24}/>
          </div>
          <div style={{flexGrow:1, textAlign:"center", alignItems: "center",display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <div style={{fontSize: 20,fontWeight: 700, userSelect: "none", display:"flex", alignItems:"center", gap: 4}}>
                <span>{format(currentDate, "MM월 dd일")}</span>
                {format(currentDate, "MM월 dd일") === today 
                 && <span style={{fontSize:"0.55em", padding: "0.1em 0.6em", backgroundColor: "var(--color-primary)",color:"var(--color-dark)", borderRadius:80}}>
                      오늘</span>}
            </div>
            <div style={{fontSize: 14, userSelect: "none"}}>{format(currentDate, "yyyy년")}</div>
          </div>
          <div onClick={handleMoveNextDate} 
              style={{padding: 12, cursor:"pointer", display:"flex"}}>
            <FiChevronRight color="#FFF" size={24}/>
          </div>
        </header>
    )
}