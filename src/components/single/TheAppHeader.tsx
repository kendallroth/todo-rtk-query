import React from "react";
import { AppBar, Avatar, Stack, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "../../hooks";
import { selectProfile } from "../../store/slices/user";

const TheAppHeader = () => {
  const { t } = useTranslation();

  const profile = useAppSelector(selectProfile);

  return (
    <AppBar elevation={0} position="relative">
      <Toolbar>
        <Typography variant="h6">{t("common:app.title")}</Typography>
        <Stack direction="row" spacing={2} sx={{ ml: "auto" }}>
          {profile ? (
            <Avatar sx={{ bgcolor: "secondary.main" }}>{profile.login}</Avatar>
          ) : (
            <Avatar />
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TheAppHeader;
