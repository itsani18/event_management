import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 👇 IMPORTANT (one of these MUST exist)
import "./App.css";     // ✅ use this
// OR
// import "./styles.css"; ❗ if you are using this instead

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);