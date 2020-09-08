import React, { Component, useContext } from "react";
import "./login/login.css";
import { NavLink } from "react-router-dom";
import { browserHistory, Router, Route, Redirect } from "react-router";
import axios from "axios";
// import checkAuthentication from ".../backend/auth/protect.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export class PopLogin extends Component {
  state = {
    // submit1: false
    user: "default",
    password: "default",
    link: "/DashBoard",
    loggedin: false,
    errormsg: "default",
    error: false,
    userdetails: [],
    isorganizer: false,
  };

  componentDidUpdate(prevprops, prevstate) {
    // if (prevstate.userdetails != this.state.userdetails) {
    //   this.setState({
    //     loggedin: true,
    //   });

    if (prevstate.userdetails != this.state.userdetails) {
      axios
        .get("http://localhost:5000/User/isLoggedIn", { withCredentials: true })
        .then((res) => {
          console.log("heyy you", res);
          if (res.data.user != null) {
            this.setState({
              loggedin: true,
            });
          }
        });

      axios
        .get(`http://localhost:5000/ClubCom/find/${this.state.userdetails._id}`)
        .then((res) =>
          this.setState({
            isorganizer: true,
          })
        );
    }
  }

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  inputuser = (event) => {
    this.setState({ user: event.target.value });
    console.log(this.state.user);
  };

  inputpassword = (event) => {
    this.setState({ password: event.target.value });
  };

  submit(e) {
    e.preventDefault();

    const user = {
      username: this.state.user,
      password: this.state.password,
    };

    axios("http://localhost:5000/User/login", {
      method: "post",
      data: user,
      withCredentials: true,
    })
      .then((res) => {
        console.log("res here : ", res.data);
        this.setState({
          error: false,
          userdetails: res.data,
        });
        toast.success(
          `${this.state.userdetails.username} logged in succefully`
        );
        console.log(this.state.userdetails);
      })
      .catch((error1) => {
        console.log(error1.response);
        this.setState({
          error: true,
          errormsg: error1.response.data,
          loggedin: false,
        });
        toast.error("Error logging in!!");
      });
  }

  render() {
    if (this.state.loggedin && this.state.userdetails != []) {
      console.log("loggenin", this.state.userdetails);
      if (this.state.user == "admin") {
        return (
          <Redirect
            to={{
              pathname: "/Admin_dashboard",
              state: { userdetails: this.state.userdetails },
            }}
          />
        );
      } else if (this.state.user == "placementofficer") {
        return <Redirect to="/PlacementOfficer" />;
      } else if (this.state.userdetails.UserType == "ClubCom") {
        return (
          <Redirect
            to={{
              pathname: "/organizer",
            }}
          />
        );
      } else {
        return <Redirect to="/student" />;
      }
    }
    return (
      <div class="login-c">
        <div className="col-lg-4 loginbox1">
          <h1 style={{ fontSize: "35px" }}>Login Here</h1>
          <form onSubmit={this.submit}>
            <div style={{ color: "red" }}>
              {this.state.error ? this.state.errormsg : null}
            </div>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              required
              onChange={this.inputuser}
              required
              className="form-group"
            />
            <input
              // pattern=".{8}"
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={this.inputpassword}
              required
              className="form-group"
            />

            <button className="form-group loginsubmit">submit</button>
            {/* <a href="">Forgot Password?</a> */}
            <br />
          </form>
        </div>
      </div>
    );
  }
}

export function isAuthenticated() {
  axios
    .get("http://localhost:5000/User/isLoggedIn", { withCredentials: true })
    .then((res) => {
      console.log("heyy you", res);
      if (res.data.user != null) {
        return true;
      } else {
        return false;
      }
    });
}
