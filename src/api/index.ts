import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import config from "../config";

import type { Todo } from "../types/todo";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: config.api.url }),
  tagTypes: ["todos"],
  endpoints: (builder) => ({
    deleteTodo: builder.mutation<Todo, Pick<Todo, "id">>({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      // NOTE: Prefer manual cache update instead of re-fetching all todo data...
      // invalidatesTags: (todo) => [{ type: "todos", id: todo?.id }],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          todoApi.util.updateQueryData("getTodos", undefined, (draftTodos) => {
            const idx = draftTodos.findIndex((t) => t.id === id);
            if (idx >= 0) {
              draftTodos.splice(idx, 1);
            }
          }),
        );
      },
    }),
    getTodos: builder.query<Todo[], unknown>({
      query: () => `/todos`,
      providesTags: (result) => [
        ...(result?.map((t) => ({ type: "todos", id: t.id } as const)) ?? []),
        { type: "todos", id: "LIST" },
      ],
    }),
    toggleTodo: builder.mutation<Todo, Pick<Todo, "id" | "complete">>({
      query: ({ id, ...patch }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: patch,
      }),
      // NOTE: Prefer manual cache update instead of re-fetching all todo data...
      // invalidatesTags: (todo) => [{ type: "todos", id: todo?.id }],
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const { data: todo } = await queryFulfilled;
        dispatch(
          todoApi.util.updateQueryData("getTodos", undefined, (draftTodos) => {
            const oldTodo = draftTodos.find((t) => t.id === id);
            if (oldTodo) {
              oldTodo.complete = todo.complete;
            }
          }),
        );
      },
    }),
  }),
});
