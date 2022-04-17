import React from "react";
import ReactDOM from "react-dom";
import Heading from "./Heading";
import List from "./List";

ReactDOM.render(
  <div>
    <Heading />
    <p>Your lucky number is {Math.floor(Math.random() * 10)}</p>
    <h1>My Favourite Foods</h1>
    <List />
  </div>,
  document.getElementById("root")
);
