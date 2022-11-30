import { Add } from "@mui/icons-material";
import { Divider, IconButton, InputBase, Paper, Stack, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Fragment, KeyboardEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import { Todo } from "../../../types";
import { TodoItem } from "../components";

const TodoList = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [inputFocused, setInputFocused] = useState(false);

  const onInputFocus = () => {
    setInputFocused(true);
  };

  const onInputBlur = () => {
    setInputText(inputText.trim());
    setInputFocused(false);
  };

  const [inputText, setInputText] = useState("");

  const onAddTodo = () => {
    const text = inputText.trim();
    if (!text) return;

    setInputText("");
  };
  const onInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !inputText.trim()) return;

    onAddTodo();
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
          <Paper
            sx={{
              mb: 2,
              p: 0.5,
              outline: inputFocused ? `2px solid ${theme.palette.secondary.light}` : undefined,
            }}
          >
            <Stack direction="row">
              <InputBase
                placeholder={t("screens:todoList.addTodoPrompt")}
                sx={{ flexGrow: 1, px: 1 }}
                value={inputText}
                onBlur={onInputBlur}
                onChange={(e) => setInputText(e.target.value)}
                onFocus={onInputFocus}
                onKeyDown={onInputKeydown}
              />
              <IconButton disabled={!inputText} onClick={onAddTodo}>
                <Add />
              </IconButton>
            </Stack>
          </Paper>
          <Paper>
            <Stack>
              {todos.map((todo, idx) => (
                <Fragment key={todo.id}>
                  {idx > 0 && <Divider />}
                  <TodoItem todo={todo} />
                </Fragment>
              ))}
            </Stack>
          </Paper>
        </Grid2>
      </Grid2>
    </Stack>
  );
};

export default TodoList;
