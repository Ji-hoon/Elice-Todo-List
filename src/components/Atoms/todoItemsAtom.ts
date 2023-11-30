
import { atom, selector } from "recoil";
import { TodoItemType } from "../../types/index.ts";

export const todoItemsAtom = atom<TodoItemType[]>({
    key: "todoItemsAtom",
    default: [],
});

export const todoItemsProgressPercentageSelector = selector ({
    key: "todoItemsProgressPercentageSelector",
    get: ({ get }) => {
        const todoItems = get(todoItemsAtom);
        const allTodoItems = todoItems.length;
        const doneTodoItems = todoItems.filter(item => item.isDone).length;

        const percentage = allTodoItems > 0 ? Math.round((doneTodoItems/allTodoItems)*100) : 0;
        return percentage;
    }
})