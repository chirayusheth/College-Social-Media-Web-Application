import React, { Component } from "react";
import "./add_events.css";
import store from "./store";
import showResults from "./showResults";
import SimpleForm from "./SimpleForm";
import Navbar from "./navbar";
import { Provider } from "react-redux";
import { NavLink } from "react-router-dom";
class Add_events extends Component {
  state = {
    toggle_switch: "ADD EVENTS",
    user: "RUSHABH"
  };
  render() {
    return (
      <React.Fragment>
        <div className="App1">
          <div className="brand">
            <nav class="container  navbar navbar-expand-lg navbar-light navtemp">
              <NavLink to="/DashBoard" class="col-lg-4 navbar-brand navtemp">
                <h2> Campus Connect</h2>
              </NavLink>

              <div className="col-lg-2"></div>
              <div class=" collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                  <NavLink to="/Add_events" class="nav-item nav-link">
                    Placement Updates
                  </NavLink>
                  <NavLink to="/DashBoard" class="nav-item nav-link ">
                    Dashboard
                  </NavLink>
                  <a class="nav-item nav-link" href="#">
                    {this.state.user}
                  </a>
                  <NavLink to="/" class="nav-item nav-link ">
                    Log Out
                  </NavLink>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <br />
        {/* <div className="App2">
          <header className="App-table"> */}
        {/* <Provider store={store}>
              <div style={{ padding: 9, align: "center" }}> */}
        <SimpleForm onSubmit={showResults} />
        {/* </div>
            </Provider> */}
        {/* </header> */}
        {/* </div> */}
      </React.Fragment>
    );
  }
}

export default Add_events;
