export type TodoItemType = {
    id: string;
    content : string;
    isDone: boolean;
    createdAt : string; //yyyy-mm-dd
  }
export type InputMode = {
    type: "add" | "edit" | "default";
    item?: TodoItem;
}