import React from "react";

import "./App.css";

import { ToastContainer } from "react-toastify";

import useAppInitialization from "./hooks/useAppInitialization";
import AppLayout from "./AppLayout";

const App = () => {
  useAppInitialization();

  return (
    <>
      <ToastContainer />
      <AppLayout />
    </>
  );
};

export default App;