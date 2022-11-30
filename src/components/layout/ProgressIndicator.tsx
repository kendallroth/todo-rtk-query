import React from 'react';
import { CircularProgress, Stack, Typography } from '@mui/material';

interface ProgressIndicatorProps {
  text?: string;
}

const ProgressIndicator = (props: ProgressIndicatorProps) => {
  const { text } = props;

  return (
    <Stack alignItems="center" sx={{ p: 2 }}>
      <CircularProgress color="secondary" size={48} />
      {Boolean(text) && (
        <Typography color="white" sx={{ mt: 2 }}>{text}&hellip;</Typography>
      )}
    </Stack>
  );
}

export default ProgressIndicator;