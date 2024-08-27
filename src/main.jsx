import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import reducer from "./store/reducers";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import ContextProvider from "./context/Context.jsx";
const store = configureStore({ reducer });

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="78244655823-maui8oev6qs1n7e5ak6ni8alrc7vjmfc.apps.googleusercontent.com">
    <Provider store={store}>
      <ContextProvider>
        <React.StrictMode>
          <ChakraProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ChakraProvider>
        </React.StrictMode>
      </ContextProvider>
    </Provider>
  </GoogleOAuthProvider>
);
