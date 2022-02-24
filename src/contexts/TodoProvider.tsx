import React, { createContext, FC, ReactChild, ReactChildren, useReducer, useState } from 'react';

import { Todo, TodoContextState } from '../model/model';
const contextDefaultValues: TodoContextState = {
    todos: [],
    // setTodos: () => { },
    dispatch: () => { }
};

export const TodoContext = createContext<TodoContextState>(
    contextDefaultValues
);

interface ActionType {
    id: number,
    type: string,
    todo: string
}

const reducer = (state: Todo[], action: ActionType) => {
    switch (action.type) {
        case 'ADD':
            return [...state, { id: action.id, todo: action.todo, isDone: false }]
        case 'EDIT':
            return state.map(todo =>
                todo.id === action.id ? { ...todo, todo: action.todo } : todo)
        case 'DELETE':
            return state.filter(todo => todo.id !== action.id)
        case 'DONE':
            return state.map(todo =>
                todo.id === action.id ? { ...todo, isDone: !todo.isDone } : todo)
        default:
            return state
    }
}

interface AuxProps {
    children: ReactChild | ReactChildren;
}

const TodoProvider: FC<AuxProps> = ({ children }) => {

    const [todos, dispatch] = useReducer(reducer, []);
    const value = {
        todos, dispatch
    }
    return (
        <div>
            <TodoContext.Provider value={value}>
                {children}
            </TodoContext.Provider>
        </div>
    );
};

export default TodoProvider;