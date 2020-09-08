import React, { Component } from "react";
import Event_structure from "./event_structure";
import Filter from "./filter";
import { white } from "color-name";
import "./Dashboard.css";
import SimpleForm from "./SimpleForm";
import Events from "./event_list";
import "bootstrap/dist/css/bootstrap.css";
import Admin_Events from "./admin_event_list";
import { NavLink, Redirect } from "react-router-dom";
import loginPop from "./popupLogin";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "./login/login.css";
import News_list from "./news_list";
import $ from "jquery";
import Popper from "popper.js";

import AddNews from "./add_news";
import UserForm from "./UserForm";
import { PopLogin } from "./popupLogin";
import axios from "axios";
import Organizer_Events from "./organizer_event_list";
import {ChangePassword} from "./changepassword"

export class DashBoard extends Component {
  state = {
    form_visible: false,
    event_visible: true,
    toggle_form: "Request Event",
    login: false,
    login_btn: "Login",
    toggle_login: false,
  };
  constructor(props) {
    super(props);

    this.toggleLogin = this.toggleLogin.bind(this);
  }

  toggleLogin() {
    this.setState({
      toggle_login: !this.state.toggle_login,
    });
  }

  AddEvent() {
    this.setState({ form_visible: !this.state.form_visible });
    this.setState({ event_visible: !this.state.event_visible });
    if (this.state.toggle_form == "Request Event") {
      this.setState({ toggle_form: "Event List" });
    } else {
      this.setState({ toggle_form: "Request Event" });
    }
  }

  render() {
    return (
      <div class="dashboard">
        <div className="brand">
          <nav class="container  navbar navbar-expand-lg navbar-light navtemp">
            <NavLink to="/DashBoard" class="col-lg-4 navbar-brand navtemp">
              <h2> Campus Connect</h2>
            </NavLink>

            <div className="col-lg-5"></div>
            <div class=" collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                {/* <NavLink to="/News" class="nav-item nav-link">
                  News
                </NavLink> */}
                {/* <NavLink to="/UserForm" class="nav-item nav-link">
                  Add User
                </NavLink> */}
                <a
                  onClick={this.toggleLogin}
                  class="nav-item nav-link "
                  tabindex="-1"
                >
                  {this.state.login_btn}
                </a>
              </div>
            </div>
          </nav>
        </div>
        <div className="container row">
          <div className="col-lg-8 col-md-8 col-sm-12">
            <Events />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <News_list />
          </div>
        </div>
        {this.state.toggle_login ? (
          <PopLogin closepopup={this.toggleLogin.bind(this)} />
        ) : null}
      </div>
    );
  }
}

export class Student_DashBoard extends Component {
  state = {
    form_visible: false,
    event_visible: true,
    toggle_form: "Request Event",
    login: false,
    login_btn: "Login",
    topple_login: false,
    userdetails: [],
    toggle_password: false,
    loggedout: false,
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
  logout() {
    this.setState({
      logoutstate: true,
    });
  }
  
  componentDidMount() {
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
  render() {
    if (this.state.loggedout) {
      return <Redirect to="/" />;
    }
    return (
      <div class="dashboard">
        <div className="brand">
          <nav class="container  navbar navbar-expand-lg navbar-light navtemp">
            <NavLink to="/DashBoard" class="col-lg-4 navbar-brand navtemp">
              <h2> Campus Connect</h2>
            </NavLink>

            <div className="col-lg-3"></div>
            <div class=" collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a
                  onClick={()=>{
                    this.setState({
      toggle_password: !this.state.toggle_password,
    });
                  }}
                  class="nav-item nav-link "
                  tabindex="-1"
                >
                  Change Password                  
                </a>
                <a class="nav-item nav-link" href="/PlacementUpdates">
                  Placement Updates
                </a>
                <a class="nav-item nav-link">
                  {this.state.userdetails.username}
                </a>
                <a class="nav-item nav-link" onClick={this.logout.bind(this)}>
                  Log Out
                </a>
              </div>
            </div>
          </nav>
        </div>
        <div className="container row">
          <div className="col-lg-8 col-md-8 col-sm-12">
            <Events />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <News_list />
          </div>
</div>
{this.state.toggle_password ? (
          <ChangePassword closepopup={() => {
            this.setState({
      toggle_password: !this.state.toggle_password,
    });
          }} />
        ) : null}

        </div>
        
      
    );
  }
}

export class Admin_dashboard extends Component {
  state = {
    news: false,
    adduser: false,
    logoutstate: false,
    // userdetails: this.props.location.state.userdetails,
    userdetails: [],
    eventbtn: "Pending Events",
    loggedout: false,
  };

  toggleNews() {
    this.setState({
      news: !this.state.news,
    });
  }

  toggleeventbtn() {
    if (this.state.eventbtn == "Pending Events") {
      this.setState({
        eventbtn: "All Events",
      });
    } else {
      this.setState({
        eventbtn: "Pending Events",
      });
    }
  }

  toggleUser() {
    this.setState({
      adduser: !this.state.adduser,
    });
  }
  constructor(props) {
    super(props);
  }

  logout() {
    this.setState({
      logoutstate: true,
    });
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
  //
  componentDidMount() {
    axios
      .get("http://localhost:5000/User/isLoggedIn", { withCredentials: true })
      .then((response) => {
        this.setState({
          userdetails: response.data.user,
        });
        console.log("loggedin user: ", response);
      });
  }

  AddUser() {}
  render() {
    if (this.state.loggedout) {
      return <Redirect to="/" />;
    }

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
                <a
                  onClick={()=>{
                    this.setState({
      toggle_password: !this.state.toggle_password,
    });
                  }}
                  class="nav-item nav-link "
                  tabindex="-1"
                >
                  Change Password                  
                </a>
                
                <a
                  class="nav-item nav-link"
                  onClick={this.toggleeventbtn.bind(this)}
                >
                  {this.state.eventbtn}
                </a>

                <a
                  class="nav-item nav-link"
                  onClick={this.toggleNews.bind(this)}
                >
                  Add News
                </a>
                <a
                  class="nav-item nav-link"
                  onClick={this.toggleUser.bind(this)}
                >
                  Add User
                </a>
                <a class="nav-item nav-link" href="#">
                  {this.state.userdetails.username}
                </a>
                {/* <NavLink to="/" class="nav-item nav-link " tabindex="-1"> */}
                <a class="nav-item nav-link" onClick={this.logout.bind(this)}>
                  {" "}
                  Log Out
                </a>
                {/* </NavLink> */}
              </div>
            </div>
          </nav>
        </div>
        <div className="container row">
          <div className="col-lg-8 col-md-8 col-sm-12">
            {this.state.eventbtn == "All Events" ? (
              <Admin_Events />
            ) : (
              <Events />
            )}
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <News_list showRemove={true} />
          </div>
        </div>

        {this.state.news ? (
          <AddNews closePopup={this.toggleNews.bind(this)} />
        ) : null}

        {this.state.adduser ? (
          <UserForm closePopup={this.toggleUser.bind(this)} />
        ) : null}

        {this.state.toggle_password ? (
          <ChangePassword closepopup={() => {
            this.setState({
      toggle_password: !this.state.toggle_password,
    });
          }} />
        ) : null}
      </div>
    );
  }
}

export class Organizer_dashboard extends Component {
  state = {
    user: "",
    Event: false,
    adduser: false,
    logoutstate: false,
    loggedout: false,
    userdetails: [],
    toggle_password: false,
  };

  logout() {
    this.setState({
      logoutstate: !this.state.logoutstate,
    });
  }

  componentDidMount() {
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
  componentDidUpdate(prevprops, prevstate) {
    if (prevstate.logoutstate != this.state.logoutstate) {
      const user = {
        username: this.state.userdetails.username,
      };
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

  toggleEvent() {
    this.setState({
      Event: !this.state.Event,
    });
  }

  toggleUser() {
    this.setState({
      adduser: !this.state.adduser,
    });
  }
  constructor(props) {
    super(props);
  }
  AddUser() {}
  render() {
    if (this.state.loggedout) {
      return <Redirect to="/" />;
    } else {
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
                   <a
                  onClick={()=>{
                    this.setState({
      toggle_password: !this.state.toggle_password,
    });
                  }}
                  class="nav-item nav-link "
                  tabindex="-1"
                >
                  Change Password                  
                </a>
                  
                  
                  
                  <a
                    class="nav-item nav-link"
                    onClick={this.toggleEvent.bind(this)}
                  >
                    Request Event
                  </a>
                  <a class="nav-item nav-link" href="#">
                    {this.state.userdetails.username}
                  </a>
                  {/* <NavLink to="/" class="nav-item nav-link " tabindex="-1"> */}
                  <a class="nav-item nav-link" onClick={this.logout.bind(this)}>
                    {" "}
                    Log Out
                  </a>
                  {/* </NavLink> */}
                </div>
              </div>
            </nav>
          </div>
          <div className="container row">
            <div className="col-lg-8 col-md-8 col-sm-12">
              <Organizer_Events
                refresh={this.state.Event}
                userdetails={this.state.userdetails}
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <News_list showRemove={false} />
            </div>
          </div>

          {this.state.Event ? (
            <SimpleForm closePopup={this.toggleEvent.bind(this)} />
          ) : null}

          {this.state.adduser ? (
            <UserForm closePopup={this.toggleUser.bind(this)} />
          ) : null}

{this.state.toggle_password ? (
          <ChangePassword closepopup={() => {
            this.setState({
      toggle_password: !this.state.toggle_password,
    });
          }} />
        ) : null}

        </div>
      );
    }
  }
}
