import { useState, useRef, useEffect } from 'react';
import { InputMode, TodoItem } from "../../../../types";
import format from 'date-fns/format';
import todoItemsDummy from '../../../../assets/dummy/todoItems.ts';

// currendDate 입력 받는 방법 - params로 currentDate 넘겨 받는 방법
// 전역에서 사용 가능한 객체에 currentDate를 사용하는 방법
// url에 넘겨서 사용하는 방법 (location 객체)

export default function useTodoItems(currentDate) {
    const [todoItems, setTodoItems] = useState<TodoItem[]>(todoItemsDummy);
    const [addInputValue, setAddInputValue] = useState("");
    
      function handleAddTodoItem() {
        // todoItems에 추가하고 인풋모드를 리셋한다.
        const newTodo = [...todoItems];
    
        const date = new Date();
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const dateStr = `${year}-${month}-${day}`;
    
        const lastId = newTodo.map(item => parseInt(item.id))
        .reduce((prev, curr) => prev > curr ? prev : curr, 0);
        newTodo.push({id: String(lastId+1),
          content : addInputValue,
          isDone: false,
          createdAt : dateStr,
        });
        setTodoItems(newTodo);
        //handleResetInputMode();
        console.log(todoItems);
      }
    
      const toggleDone = (id:string) => {
        console.log(id);
        const newTodo = [...todoItemsDummy];
        const targetItem = newTodo.filter((item) => item.id === id );
        console.log(targetItem);
        targetItem[0].isDone = !targetItem[0].isDone;
        setTodoItems(newTodo);
      }
    
      useEffect( () => {
        const dateString = format(currentDate, 'yyyy-MM-dd'); // date type을 스트링으로 바꿔서 비교해야 함
        //console.log(dateString);
        const todayTodo = todoItems.filter( (item) => item.createdAt === dateString);
        //console.log(todayTodo);
        setTodoItems(todayTodo);
        //console.log(todoItems);
      }, [currentDate]);

    return { 
        onAddTodoItem : handleAddTodoItem,
        // onEditTodoItem: handleEditTodoItem,
        onToggleDone : toggleDone,

    }
}