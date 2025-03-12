/* eslint-disable react/react-in-jsx-scope */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApiProvider } from "./context/ApiContext";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApiProvider>
      <App />
    </ApiProvider>
  </StrictMode>
);
