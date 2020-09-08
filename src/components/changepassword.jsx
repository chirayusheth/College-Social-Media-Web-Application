import React, { Component, useContext } from "react";
import "./login/login.css";
import { NavLink } from "react-router-dom";
import { browserHistory, Router, Route, Redirect } from "react-router";
import axios from "axios";
// import checkAuthentication from ".../backend/auth/protect.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export class ChangePassword extends Component {
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

  componentDidMount() {
    // if (prevstate.userdetails != this.state.userdetails) {
    //   this.setState({
    //     loggedin: true,
    //   });

    
      axios
        .get("http://localhost:5000/User/isLoggedIn", { withCredentials: true })
        .then((res) => {
          console.log("heyy you", res);
          if (res.data.user != null) {
            this.setState({
                userdetails:res.data.user, 
              loggedin: true,
            });
          }
        });

     
    
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
      Oldpassword: this.state.user,
      Newpassword: this.state.password,
    };

    axios(`http://localhost:5000/User/changepassword/${this.state.userdetails._id}`, {
      method: "post",
      data: user,
    })
      .then((res) => {
        console.log("res here : ", res.data);
        this.setState({
          error: false,
        });
        toast.success(
          "Password changed succefully"
        );
        this.props.closepopup();
        console.log(this.state.userdetails);
      })
      .catch((error1) => {
        console.log(error1.response);
        this.setState({
          error: true,
          errormsg: error1.response.data,
        });
        toast.error("Error in Password change");
      });
  }

  render() {
    return (
      <div class="login-c">
        <div className="col-lg-4 loginbox1">
          <h1 style={{ fontSize: "25px" }}>Change Password</h1>
          <form onSubmit={this.submit}>
            <div style={{ color: "red" }}>
              {this.state.error ? this.state.errormsg : null}
            </div>
            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              required
              onChange={this.inputuser}
              required
              className="form-group"
            />
            <input
              // pattern=".{8}"
              type="password"
              name="newPassword"
              placeholder="New Password"
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
