import React from "react";
import ReactDOM from "react-dom";
import Heading from "./components/Heading";
import List from "./components/List";
import TextBox from "./components/TextBox";


ReactDOM.render(
  <div className="parent">
    <Heading />
    <TextBox />
    <p>Your lucky number is {Math.floor(Math.random() * 10)}</p>
    <h1>My Favourite Foods</h1>
    <List />
  </div>,
  document.getElementById("root")
);
