import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../tailwind.config.js";
import "./output.css";
import { Provider } from "react-redux";
import { store } from "./api/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
