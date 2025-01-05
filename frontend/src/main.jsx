import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import "./index.css";
import 'remixicon/fonts/remixicon.css'
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>

);
