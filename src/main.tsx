import { createRoot } from "react-dom/client";
import "./index.css";
import Routers from "./Router/Routers.tsx";

createRoot(document.getElementById("root")!).render(<Routers />);
