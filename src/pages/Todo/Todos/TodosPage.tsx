import { Refresh } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { todoApi } from "../../../api";
import { ProgressIndicator } from "../../../components/layout";
import { Todo, TodoStatusFilter } from "../../../types";
import { TodoFilter, TodoInput, TodoList } from "../components";

const TodosPage = () => {
  const { t } = useTranslation();

  const [todosFilter, setTodosFilter] = useState<TodoStatusFilter>("outstanding");

  const todosQuery = todoApi.useGetTodosQuery(undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      data: data?.filter((todo) => {
        return (
          todosFilter === "all" ||
          (todo.complete && todosFilter === "completed") ||
          (!todo.complete && todosFilter === "outstanding")
        );
      }),
    }),
  });
  const todos = todosQuery.data ?? [];

  const [inputText, setInputText] = useState("");

  const [addTodoTrigger, addTodoMutation] = todoApi.useAddTodoMutation();
  const [toggleTodoTrigger, toggleTodoMutation] = todoApi.useToggleTodoMutation();
  const [deleteTodoTrigger, deleteTodoMutation] = todoApi.useDeleteTodoMutation();

  const onAddTodo = async () => {
    const text = inputText.trim();
    if (!text) return;

    await addTodoTrigger({ text });

    setInputText("");
  };

  const onDeleteTodo = (todo: Todo) => {
    deleteTodoTrigger({ id: todo.id });
  };

  const onToggleTodo = (todo: Todo) => {
    toggleTodoTrigger({ complete: !todo.complete, id: todo.id });
  };

  return (
    <Stack sx={{ p: 4 }}>
      <Grid2 container justifyContent="center" spacing={2}>
        <Grid2 xs={12} sm={10} md={8} lg={6}>
          <Stack spacing={2}>
            <Typography color="white" fontWeight={300} variant="h5">
              {t("screens:todoList.title")}
            </Typography>
            <TodoInput
              disabled={todosQuery.isLoading || addTodoMutation.isLoading}
              value={inputText}
              onChange={setInputText}
              onSubmit={onAddTodo}
            />
            <Stack alignItems="center" direction="row">
              <TodoFilter value={todosFilter} onSelect={setTodosFilter} />
              <IconButton
                disabled={todosQuery.isFetching}
                size="small"
                sx={{ ml: "auto" }}
                onClick={todosQuery.refetch}
              >
                <Refresh />
              </IconButton>
            </Stack>
            {!todosQuery.isLoading ? (
              <TodoList
                // TODO: Figure out how to limit to disabling only the specific todo item being modified
                disabled={toggleTodoMutation.isLoading || deleteTodoMutation.isLoading}
                todos={todos}
                onDelete={onDeleteTodo}
                onToggle={onToggleTodo}
              />
            ) : (
              <ProgressIndicator text="Fetching todos" />
            )}
          </Stack>
        </Grid2>
      </Grid2>
    </Stack>
  );
};

export default TodosPage;
