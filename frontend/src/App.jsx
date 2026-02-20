import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./styles/App.css";

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default App;

