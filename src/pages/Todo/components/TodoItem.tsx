import { CheckCircle, CircleOutlined, Delete } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import { Todo } from "../../../types";

interface TodoItemProps {
  disabled?: boolean;
  todo: Todo;
  onDelete?: () => void;
  onToggle?: () => void;
}

const TodoItem = (props: TodoItemProps) => {
  const { disabled = false, todo, onDelete, onToggle } = props;

  return (
    <Stack alignItems="center" direction="row" sx={{ p: 0.5 }}>
      <IconButton color="secondary" disabled={disabled} sx={{ mr: 1 }} onClick={onToggle}>
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
      <IconButton disabled={disabled || true} sx={{ ml: "auto" }} onClick={onDelete}>
        <Delete />
      </IconButton>
    </Stack>
  );
};

export default TodoItem;
