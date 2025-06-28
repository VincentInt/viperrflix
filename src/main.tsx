import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Routers from "./Router/Routers.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Routers />
  </StrictMode>
);
