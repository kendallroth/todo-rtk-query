import { CheckCircle, CircleOutlined, Delete } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Typography } from "@mui/material";
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
      <Checkbox
        checked={todo.complete}
        checkedIcon={<CheckCircle />}
        color="secondary"
        disabled={disabled}
        icon={<CircleOutlined />}
        onChange={onToggle}
      />
      <Typography
        sx={{
          color: todo.complete ? "grey" : undefined,
          textDecoration: todo.complete ? "line-through" : undefined,
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
