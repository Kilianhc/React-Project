import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#130986",   // Azul oscuro
    },
    secondary: {
      main: "#093e86",   // Azul claro
    },
    accent: {
      main: "#520986",   // violeta
    },
    neutral: {
      main: "#865209",   // marron
    },
    background: {
      main: "#3e8609",   // verde
    },
  },
});

export default theme;