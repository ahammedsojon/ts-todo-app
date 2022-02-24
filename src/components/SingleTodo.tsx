import React, { FunctionComponent, useState, useRef, useEffect } from 'react';
import { AiOutlineCheck, AiFillEdit, AiFillDelete, AiOutlineCheckCircle } from 'react-icons/ai';
import { GrUndo } from 'react-icons/gr';
import { useTodoContext } from '../hooks/useTodoContext';
import './style.css';

interface Props {
    todo: { id: number, todo: string, isDone: boolean }
}
const SingleTodo: FunctionComponent<Props> = ({ todo }) => {
    const { dispatch } = useTodoContext();
    const [editAble, setEditAble] = useState(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, [editAble])
    return (
        <div className='col-md-6'>
            <div className='todo'>
                {
                    editAble &&
                    <form onSubmit={() => {
                        setEditAble(false)
                        dispatch({ type: 'EDIT', id: todo.id, todo: editTodo })
                    }}>
                        <p>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Edit todo"
                                ref={inputRef}
                                value={editTodo}
                                onChange={(e) => {
                                    setEditTodo(e.target.value)
                                }
                                } />
                        </p>
                    </form>
                }
                {
                    todo.isDone && !editAble &&
                    <p><s>{todo.todo}</s></p>
                }
                {
                    !todo.isDone && !editAble && <p>{todo.todo}</p>
                }
                <div>

                    {
                        editAble ?
                            <span onClick={() => {
                                setEditAble(false)
                                dispatch({ type: 'EDIT', id: todo.id, todo: editTodo })
                            }}>
                                <AiOutlineCheck />
                            </span>
                            :
                            <span onClick={() => {
                                setEditAble(true);
                            }}>
                                <AiFillEdit />
                            </span>
                    }

                    <span
                        onClick={() => dispatch({ type: 'DELETE', id: todo.id, todo: todo.todo })}>
                        <AiFillDelete />
                    </span>
                    {
                        !editAble && !todo.isDone &&
                        <span
                            onClick={() => dispatch({ type: 'DONE', id: todo.id, todo: todo.todo })}>
                            <AiOutlineCheckCircle />
                        </span>
                    }
                    {
                        !editAble && todo.isDone &&
                        <span
                            onClick={() => dispatch({ type: 'DONE', id: todo.id, todo: todo.todo })}>
                            <GrUndo />
                        </span>
                    }
                </div>
            </div>
        </div >
    );
};

export default SingleTodo;