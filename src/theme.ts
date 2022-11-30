import { createTheme } from "@mui/material/styles";
import { teal, deepOrange } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: teal[600],
    },
    secondary: {
      main: deepOrange[400],
    },
  },
});

export default theme;
