import { Divider, Paper, Stack } from "@mui/material";
import { Fragment } from "react";

import { Todo } from "../../../types";
import { TodoItem } from "../components";

interface TodoListProps {
  todos: Todo[];
}

const TodoList = (props: TodoListProps) => {
  const {todos} = props;

  return (
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
  );
};

export default TodoList;
