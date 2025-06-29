import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";


// Ensure preloader stays at least 3 seconds
setTimeout(() => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    preloader.style.transition = "opacity 0.5s ease-out";
    setTimeout(() => preloader.remove(), 500); // wait for fade-out
  }
}, 4000);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <App />
  // </StrictMode>
);
