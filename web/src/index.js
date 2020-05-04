import React from "react";
import ReactDOM from "react-dom";
import EntryList from "./EntryList";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <EntryList budget={10000}/>
  </React.StrictMode>,
  document.getElementById("root")
);
