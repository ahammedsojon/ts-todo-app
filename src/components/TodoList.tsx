import React, { useState, useRef, FunctionComponent, useEffect } from 'react';
import { useTodoContext } from '../hooks/useTodoContext';
import SingleTodo from './SingleTodo';

const TodoList: FunctionComponent = () => {
    const { todos, dispatch } = useTodoContext();
    const [todo, setTodo] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [])
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({ type: 'ADD', id: new Date().getTime(), todo: todo });
        console.log(todos);
        setTodo('');
    }
    return (
        <div>
            <form onSubmit={handleFormSubmit} className='col-md-6 mx-md-auto mx-3 mb-5 d-flex'>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter todo"
                    ref={inputRef}
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)} />
                <button type="submit" className="btn btn-danger">Add</button>
            </form>
            <div className="row">
                {
                    todos.length !== 0 &&
                    todos.map(todo => <SingleTodo key={todo.id}
                        todo={todo}></SingleTodo>)
                }
            </div>
        </div>
    );
};

export default TodoList;