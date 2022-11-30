import { Stack, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Todo } from "../../../types";
import { TodoInput, TodoList } from "../components";

const TodosPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [inputText, setInputText] = useState("");

  const onAddTodo = () => {
    const text = inputText.trim();
    if (!text) return;

    // TODO

    setInputText("");
  };

  const todos: Todo[] = [
    {
      id: "1",
      completed: false,
      createdAt: "2022-01-02",
      text: "Something to do",
    },
    {
      id: "2",
      completed: true,
      createdAt: "2022-01-03",
      text: "A completed task",
    },
  ];

  return (
    <Stack sx={{ p: 4 }}>
      <Grid2 container justifyContent="center" spacing={2}>
        <Grid2 xs={12} sm={10} md={8} lg={6}>
          <TodoInput
            disabled={false}
            value={inputText}
            onChange={setInputText}
            onSubmit={onAddTodo}
          />
          <TodoList todos={todos} />
        </Grid2>
      </Grid2>
    </Stack>
  );
};

export default TodosPage;
