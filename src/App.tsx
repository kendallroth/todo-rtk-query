import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";

import { TheAppHeader } from "./components/single";
import "./localization/localize";
import { TodosPage } from "./pages/Todo";
import theme from "./theme";

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TheAppHeader />
      <Box className="app-content" sx={{ bgcolor: "primary.main" }}>
        <TodosPage />
      </Box>
    </ThemeProvider>
  );
};

export default App;
