import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/global";
import { useTheme } from "./Context/ThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import UserPageX from "./Pages/UserPageX";

function App() {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPageX />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
