import { Add } from "@mui/icons-material";
import { IconButton, InputBase, Paper, Stack, useTheme } from "@mui/material";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface TodoInputProps {
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const TodoInput = (props: TodoInputProps) => {
  const { disabled = false, value, onChange, onSubmit } = props;

  const { t } = useTranslation();
  const theme = useTheme();

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // NOTE: Something apparently steals focus after mount (requires timeout)
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  const [inputFocused, setInputFocused] = useState(false);

  const onInputFocus = () => {
    setInputFocused(true);
  };

  const onInputBlur = () => {
    onChange(value.trim());
    setInputFocused(false);
  };

  const onAddTodo = () => {
    if (!value.trim()) return;

    onSubmit();
  };
  const onInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !value.trim()) return;

    onSubmit();
  };

  return (
    <Paper
      sx={{
        p: 0.5,
        outline: inputFocused ? `2px solid ${theme.palette.secondary.light}` : undefined,
      }}
    >
      <Stack direction="row">
        <InputBase
          inputRef={inputRef}
          disabled={disabled}
          placeholder={t("screens:todoList.addTodoPrompt")}
          sx={{ flexGrow: 1, px: 1 }}
          value={value}
          onBlur={onInputBlur}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onInputFocus}
          onKeyDown={onInputKeydown}
        />
        <IconButton disabled={disabled || !value} onClick={onAddTodo}>
          <Add />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default TodoInput;
