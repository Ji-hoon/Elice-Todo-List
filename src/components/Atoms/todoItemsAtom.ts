
import { atom, selector } from "recoil";
import { TodoItemType, FilterType } from "../../types/index.ts";

export const todoItemsAtom = atom<TodoItemType[]>({
    key: "todoItemsAtom",
    default: [],
});

// selector는 읽기 전용이다.
// selector에도 set 이 존재하지만 selector 자체를 바꾸진 않는다.

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

export const filterAtom = atom<FilterType>({
    key:"fitlerAtom",
    default : "all",
})

export const filteredTodoItemsSelector = selector({
    key: "filteredTodoItemsSelector",
    get: ({ get }) => {
        const todoItems = get(todoItemsAtom);
        const filter = get(filterAtom);

        switch(filter) {
            case "all" : {
                return todoItems;
            }
            case "done" : {
                return todoItems.filter(item => item.isDone);
            }
            case "not yet" : {
                return todoItems.filter(item => !item.isDone);
            }
        }
    }
})