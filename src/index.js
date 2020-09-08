import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { DashBoard, Admin_dashboard } from "./components/DashBoard";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import Events from "./components/event_list";
import Event_structure from "./components/event_structure";
import Filter from "./components/filter";
import Add_events from "./components/add_events";
import Login from "./components/login/login";
import { BrowserRouter, Route } from "react-router-dom";
import LoginPage from "./App";

ReactDOM.render(<LoginPage />, document.getElementById("root"));
// var user = "admin";
// if ((submitted = true)) {
//   if (user != "admin") {
//     ReactDOM.render(<DashBoard />, document.getElementById("root"));
//   } else {
//     console.log(user);
//     ReactDOM.render(<Admin_dashboard />, document.getElementById("root"));
//   }
// }
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
