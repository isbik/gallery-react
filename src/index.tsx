import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { PhotoProvider } from "./context/PhotoContext";

ReactDOM.render(
  <PhotoProvider>
    <App />
  </PhotoProvider>,
  document.getElementById("root")
);
