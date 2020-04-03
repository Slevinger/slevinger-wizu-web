import React, { useState } from "react";
import logo from "./logo.svg";
import MainRouter from "./screens/MainRouter";
import { createStores } from "./mobx/createStores";
import { Provider as StoresProvider } from "./mobx/Provider";

// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";

function App(props) {
  const [stores, setStores] = useState(createStores(props));

  return (
    <StoresProvider {...stores}>
      <MainRouter />
    </StoresProvider>
  );
}

export default App;
