import React from "react";
import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const TheAppHeader = () => {
  const { t } = useTranslation();

  return (
    <AppBar elevation={0} position="relative">
      <Toolbar>
        <Typography variant="h6">{t("common:app.title")}</Typography>
        <Avatar sx={{ bgcolor: "secondary.main", ml: "auto" }}></Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default TheAppHeader;
