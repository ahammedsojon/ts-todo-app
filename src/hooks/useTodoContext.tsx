import { useContext } from "react";
import { TodoContext } from "../contexts/TodoProvider";

export const useTodoContext = () => {
    return useContext(TodoContext)
}