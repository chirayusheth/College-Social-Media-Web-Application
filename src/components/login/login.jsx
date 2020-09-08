import React, { Component } from "react";
import "./login.css";
import { NavLink } from "react-router-dom";
import { browserHistory, Router, Route, Redirect } from "react-router";
import axios from "axios";
class Login extends Component {
  state = {
    // submit1: false
    user: "default",
    password: "default",
    link: "/DashBoard",
    loggedin: false
  };

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  inputuser = event => {
    this.setState({ user: event.target.value });
    console.log(this.state.user);
  };

  inputpassword = event => {
    this.setState({ password: event.target.value });
  };

  submit(e) {
    e.preventDefault();

    const user = {
      UserName: this.state.user,
      Password: this.state.password
    };

    axios.post("http://localhost:5000/User/login", user).then(
      res => console.log(res.data),
      this.setState({
        loggedin: true
      })
    );
  }

  render() {
    if (this.state.loggedin) {
      console.log("loggenin");
      if (this.state.user == "admin") {
        this.props.history.push("/Admin_dashboard");
      } else if (this.state.user == "placementofficer") {
        this.props.history.push("/PlacementOfficer");
      } else {
        this.props.history.push("/DashBoard");
      }
    }

    return (
      <div class="login-c">
        <h1
          style={{
            float: "right",
            fontSize: "30px",
            padding: "20px",
            paddingRight: "30px",
            color: "white",
            borderBottom: "2px solid white"
          }}
        >
          <b>CAMPUS CONNECT</b>
        </h1>
        <div className="container row">
          <div className="col-lg-8 quote">
            <b>
              ...and in between freshers' & farewell ,<i>life</i> happened.
            </b>
          </div>
          <div className="col-lg-4 loginbox1">
            <h1 style={{ fontSize: "35px" }}>Login Here</h1>
            <form onSubmit={this.submit}>
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

              <button className=" form-group loginsubmit">submit</button>
              <a href="">Forgot Password?</a>
              <br />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
