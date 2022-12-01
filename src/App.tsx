import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import { Provider } from "react-redux";

import { TheAppHeader } from "./components/single";
import "./localization/localize";
import { TodosPage } from "./pages/Todo";
import theme from "./theme";
import { store } from "./store";
import { ContextProvider } from "./contexts";

const App = () => {
  return (
    <Provider store={store}>
      <ContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <TheAppHeader />
          <Box className="app-content" sx={{ bgcolor: "primary.main" }}>
            <TodosPage />
          </Box>
        </ThemeProvider>
      </ContextProvider>
    </Provider>
  );
};

export default App;
