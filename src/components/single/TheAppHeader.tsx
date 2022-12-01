import React, { MouseEvent, useState } from "react";
import { US as FlagUS, ES as FlagES, FlagComponent } from "country-flag-icons/react/3x2";
import {
  AppBar,
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "../../hooks";
import { selectProfile } from "../../store/slices/user";
import { Languages } from "../../localization";

interface LanguageOption {
  code: Languages;
  flag: FlagComponent;
  title: string;
}
const languages: Record<Languages, LanguageOption> = {
  en: {
    code: "en",
    flag: FlagUS,
    title: "English",
  },
  es: {
    code: "es",
    flag: FlagES,
    title: "Español",
  },
};

const TheAppHeader = () => {
  const { t, i18n } = useTranslation();

  const [languageAnchorEl, setLanguageAnchorEl] = useState<HTMLElement | null>(null);
  const languageMenuOpen = Boolean(languageAnchorEl);

  const handleLanguageMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setLanguageAnchorEl(event.currentTarget);
  };
  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null);
  };

  const handleLanguageSelection = async (language: Languages) => {
    handleLanguageMenuClose();
    await i18n.changeLanguage(language);
  };

  const profile = useAppSelector(selectProfile);

  const currentLanguage = languages[i18n.language as Languages] ?? languages.en;

  return (
    <AppBar elevation={0} position="relative">
      <Toolbar>
        <Typography variant="h6">{t("common:app.title")}</Typography>
        <Stack direction="row" spacing={2} sx={{ ml: "auto" }}>
          <IconButton onClick={handleLanguageMenuOpen}>
            <Stack sx={{ borderRadius: 0.5, overflow: "hidden", outline: "2px solid white" }}>
              <currentLanguage.flag width="24" />
            </Stack>
          </IconButton>
          <Menu
            anchorEl={languageAnchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            open={languageMenuOpen}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            onClose={handleLanguageMenuClose}
          >
            {Object.values(languages).map((language) => (
              <MenuItem key={language.code} onClick={() => handleLanguageSelection(language.code)}>
                <ListItemIcon>
                  <language.flag width="20" />
                </ListItemIcon>
                {language.title}
              </MenuItem>
            ))}
          </Menu>
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
