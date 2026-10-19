import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import BasicoApp from "./BasicoApp.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BasicoApp />
  </StrictMode>,
)
