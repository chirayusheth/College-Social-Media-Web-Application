import React, { useEffect, Component } from "react";
import Filter from "./filter";
import Event_structure from "./event_structure";
import axios from "axios";
import "./event_structure.css";
import Placement_Template from "./placement_template";
import { NavLink, Redirect } from "react-router-dom";

class Placement_updates extends Component {
  state = {
    Company: [],
    updated: false,
    organizerD: [],
    loggedout: false,
    userdetails: [],
    logoutstate: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevprops, prevstate) {
    if (prevstate.logoutstate != this.state.logoutstate) {
      const user = {
        username: this.state.userdetails.username,
      };
      console.log(user);
      axios
        .post("http://localhost:5000/User/logout", user, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          this.setState({
            loggedout: true,
          });
        });
    }
  }

  async componentDidMount() {
    console.log("fetch");
    axios.get("http://localhost:5000/Company/").then((Response) => {
      this.state.Company = Response.data;
      console.log(this.state.Company);
      this.setState({
        updated: true,
      });
    });
    axios
      .get("http://localhost:5000/User/isLoggedIn", { withCredentials: true })
      .then((res) => {
        console.log("simple form user", res);
        if (res.data.user != null) {
          this.setState({
            userdetails: res.data.user,
          });
        }
      });
  }
  logout() {
    this.setState({
      logoutstate: true,
    });
  }
  render() {
    if (this.state.loggedout) {
      return <Redirect to="/" />;
    }
    const CompanyList = this.state.Company.map((data) => {
      return (
        <Placement_Template
          key={data._id}
          name={data.Name}
          Date={data.Date}
          RegDateStart={data.RegDateStart}
          RegDateEnd={data.RegDateEnd}
          OfferType={data.OfferType}
          Category={data.Category}
          OpenFor={data.OpenFor}
          Locations={data.Locations}
        />
      );
    });
    return (
      <div>
        <div className="brand">
          <nav class="container  navbar navbar-expand-lg navbar-light navtemp">
            <NavLink to="/DashBoard" class="col-lg-4 navbar-brand navtemp">
              <h2> Campus Connect</h2>
            </NavLink>

            <div className="col-lg-3"></div>
            <div class=" collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <NavLink to="/student" class="nav-item nav-link">
                  Dashboard
                </NavLink>
                <a class="nav-item nav-link" href="#">
                  {this.state.userdetails.username}
                </a>
                <a class="nav-item nav-link" onClick={this.logout.bind(this)}>
                  Log Out
                </a>
              </div>
            </div>
          </nav>
        </div>

        <div className="header">
          <h1 style={{ color: "black", fontSize: "30px" }}>
            Placement updates
          </h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-md-1 col-sm-0"></div>
            <div className="col-lg-8 col-md-10 col-sm-12">
              <div className="eventList">{CompanyList}</div>
            </div>
            <div className="col-lg-2 col-md-1 col-sm-0"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Placement_updates;
