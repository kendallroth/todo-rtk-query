import { Alert, Divider, Paper, Stack, Typography } from "@mui/material";
import { Fragment } from "react";

import { Todo } from "../../../types";
import { TodoItem } from "../components";

interface TodoListProps {
  disabled?: boolean;
  loading?: boolean;
  todos: Todo[];
  onToggle: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

const TodoList = (props: TodoListProps) => {
  const { disabled = false, loading = false, todos, onDelete, onToggle } = props;

  return (
    <Paper>
      <Stack sx={{ opacity: loading ? 0.6 : 1 }}>
        {todos.map((todo, idx) => (
          <Fragment key={todo.id}>
            {idx > 0 && <Divider />}
            <TodoItem
              disabled={disabled}
              todo={todo}
              onDelete={() => onDelete(todo)}
              onToggle={() => onToggle(todo)}
            />
          </Fragment>
        ))}
        {!todos.length && (
          <Alert severity="warning">
            <Typography>No todos found!</Typography>
          </Alert>
        )}
      </Stack>
    </Paper>
  );
};

export default TodoList;
