import { CheckCircle, CircleOutlined, Delete } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import { Todo } from "../../../types";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = (props: TodoItemProps) => {
  const { todo } = props;

  return (
    <Stack alignItems="center" direction="row" sx={{ p: 0.5 }}>
      <IconButton color="secondary" sx={{ mr: 1 }}>
        {todo.completed ? <CheckCircle /> : <CircleOutlined />}
      </IconButton>
      <Typography
        sx={{
          color: todo.completed ? "grey" : undefined,
          textDecoration: todo.completed ? "line-through" : undefined,
        }}
      >
        {todo.text}
      </Typography>
      <IconButton disabled sx={{ ml: "auto" }}>
        <Delete />
      </IconButton>
    </Stack>
  );
};

export default TodoItem;
