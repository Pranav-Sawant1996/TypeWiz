import TypingBox from "./components/TypingBox";
import { GlobalStyles } from "./styles/Global";
import Footer from "./components/Footer";
import { ThemeProvider } from "styled-components";
import {useTheme} from './context/Theme'
import { auth } from "./FirebaseConfig";
import Header from "./components/Header";

function App() {
  const {theme}= useTheme()
  console.log(auth)
  return (
    
    <ThemeProvider theme={theme}>
      <div className="canvas">
        <GlobalStyles />
        <Header />
        <TypingBox />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
