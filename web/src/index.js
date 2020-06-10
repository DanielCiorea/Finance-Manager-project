import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import App from "./App";
import Header from "./Header";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/signUp" component={SignUp} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/transactions" component={App} />
        <Route path="/header" component={Header} />
        <Redirect from="/" to="/transactions" />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
