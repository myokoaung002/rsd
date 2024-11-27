/*
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";
import ThemedApp from './ThemedApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemedApp />
  </StrictMode>,
);
*/
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ThemedApp from "./ThemedApp";
ReactDOM.createRoot(document.getElementById("root")).render(
 <React.StrictMode>
 <ThemedApp />
 </React.StrictMode>
);
