import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TestModeContextProvider } from "./context/TestMode";
import { ThemeContextProvider } from "./context/Theme";
import { BrowserRouter } from "react-router-dom";
import { AlertContextProvider } from "./context/AlertMessage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AlertContextProvider>
        <TestModeContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TestModeContextProvider>
      </AlertContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
