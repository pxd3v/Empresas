import React from "react";
import "./assets/styles/global.css";
import { Routes } from "./Routes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
