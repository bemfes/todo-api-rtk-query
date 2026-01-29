import { FC, useState } from "react";
import React from 'react';
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from "../api/apiSlice";
import { Todo } from "../types/typesTodoList";

const TodoList: FC = () => {
    const [newTodo, setNewTodo] = useState<string>('')
    const [newId, setNewId] = useState<number>(22)

    const {data: todos, isLoading, isSuccess, isError, error} = useGetTodosQuery()

    const [addTodo] = useAddTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()


    const handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void = (e) => {
        e.preventDefault();
        addTodo({userId: 1, id: newId.toString(), title: newTodo, completed: false})
        setNewTodo('')
        setNewId(prev => prev + 1)
    }

    const newItemSection =
        <form onSubmit={handleSubmit}>
           
            <div className="new-todo">
                <input
                    type="text"
                    id="new-todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter new todo"
                />
            </div>
            <button className="submit">
                submit 
            </button>
        </form>


    let content;
    
    if(isLoading) {
       content = <p>Loading...</p>
    } else if (isSuccess) {
        content = todos.map((todo: Todo) => { 
            return (
                <article key={todo.id}>
                    <div className="todo">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            id={todo.id}
                            onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
                        />
                        <label htmlFor={todo.id}>{todo.title}</label>
                    </div>
                    <button className="trash" onClick={() => deleteTodo({ id: todo.id })}>
                        delete 
                    </button>
                </article>
            )
        })
    } else if (isError) {
        content = <p>
        {isError && error ? 
            'Ошибка: ' + JSON.stringify(error) : 'Unexpected error'}
        </p>
    }

    return (
        <main>
            <h1>Todo List</h1>
            {newItemSection}
            {content}
        </main>
    )
}

export default TodoList