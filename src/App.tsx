import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import { Provider } from "react-redux";

import { TheAppHeader } from "./components/single";
import "./localization/localize";
import { TodosPage } from "./pages/Todo";
import theme from "./theme";
import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TheAppHeader />
        <Box className="app-content" sx={{ bgcolor: "primary.main" }}>
          <TodosPage />
        </Box>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
