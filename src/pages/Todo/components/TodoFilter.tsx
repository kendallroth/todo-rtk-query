import { Chip, Stack } from "@mui/material";

import { TodoStatusFilter } from "../../../types";

interface TodoFilterProps {
  value: string;
  onSelect: (status: TodoStatusFilter) => void;
}

const statuses: { label: string; value: TodoStatusFilter }[] = [
  { label: "All", value: "all" },
  { label: "Remaining", value: "outstanding" },
  { label: "Completed", value: "completed" },
];

const TodoFilter = (props: TodoFilterProps) => {
  const { value, onSelect } = props;

  return (
    <Stack direction="row" spacing={2}>
      {statuses.map((status) => (
        <Chip
          key={status.value}
          color={value === status.value ? "secondary" : "default"}
          label={status.label}
          onClick={() => onSelect(status.value)}
        />
      ))}
    </Stack>
  );
};

export default TodoFilter;
