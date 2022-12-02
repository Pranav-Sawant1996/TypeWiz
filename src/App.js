import TypingBox from "./components/TypingBox";
import Footer from "./components/Footer";
import { ThemeProvider } from "styled-components";
import {useTheme} from './context/Theme'
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import Alert from "./components/AlertSnack";
import { GlobalStyles } from "./styles/Global";
import ComparePage from "./pages/ComparePage";

function App() {
  const {theme} = useTheme();
  return (
    
    <ThemeProvider theme={theme}>
      <GlobalStyles />
    <Alert /> 
  <Routes>
    <Route path='/' element={<HomePage/>} ></Route>
    <Route path="/user" element={<UserPage/>} ></Route>
    <Route path="/compare/:username" element={<ComparePage/>}></Route>
    {/* <Route path="/user/:id" element={<h1>dynamic pages</h1>} ></Route> */}
     
  </Routes>
    </ThemeProvider>
  );
}

export default App;
