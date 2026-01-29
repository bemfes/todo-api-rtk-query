import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "../types/typesTodoList";


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query<Todo[], void>({
            query: () => '/todos',
            transformResponse: (res: Todo[]) => res.sort((a, b) => Number(b.id) - Number(a.id)),
            providesTags: ['Todos']
        }),
        addTodo: builder.mutation<Todo, Partial<Todo> | Omit<Todo, 'id'>>({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        updateTodo: builder.mutation<Todo, Partial<Todo> & Pick<Todo, 'id'>>({
            query: (todo) => ({
                url: `todos/${todo.id}`,
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTodo: builder.mutation<{ success: boolean }, { id: string }>({
            query: ({id}) => ({
                url: `todos/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Todos']
        })
    })
})

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = apiSlice