export interface Todo {
    id: number;
    todo: string;
    isDone: boolean;
}
interface action {
    type: string, id: number, todo: string
}
export interface TodoContextState {
    todos: Todo[];
    // todo: string
    // setTodo: (todo: string) => void;
    dispatch: (action: action) => void;
};