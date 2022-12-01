import { Chip, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

import { TodoStatusFilter } from "../../../types";

interface TodoFilterProps {
  value: string;
  onSelect: (status: TodoStatusFilter) => void;
}

const TodoFilter = (props: TodoFilterProps) => {
  const { value, onSelect } = props;

  const { t } = useTranslation();

  const statuses: { label: string; value: TodoStatusFilter }[] = [
    { label: t("common:todoStatus.all"), value: "all" },
    { label: t("common:todoStatus.outstanding"), value: "outstanding" },
    { label: t("common:todoStatus.completed"), value: "completed" },
  ];

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
