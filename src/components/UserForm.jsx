import React, { Component } from "react";
import Navbar from "./navbar";
import "./UserForm.css";
import userlogo from "./login/user.png";
import { RadioGroup, Radio } from "react-radio-group";
import { NavLink } from "react-router-dom";
import { render } from "@testing-library/react";
import "./UserForm.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

// var sectionStyle = {
//   backgroundImage: "url(" + background + ")"
// };

class UserForm extends Component {
  state = {
    username: "default",
    password: "default",
    Email_ID: "default@default.com",
    Name: "default",
    contact: "default",
    Gender: "Male",
    UserType: "student",
    Age: 4,
    Address: "default",
    Clg_ID: "201701001",
    User: "Admin",
  };

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();

    const finalObject = {
      username: this.state.username,
      password: this.state.password,
      Email_ID: this.state.Email_ID,
      Name: this.state.Name,
      Contact: this.state.contact,
      Gender: this.state.Gender,
      Age: this.state.Age,
      Address: this.state.Address,
      Clg_ID: this.state.Clg_ID,
    };

    console.log(finalObject);
    if (this.state.UserType == "student") {
      axios
        .post("http://localhost:5000/User/register", finalObject)
        .then((res) => {
          toast.success("Student Registered");
          console.log(res.message);
          this.props.closePopup();
        })
        .catch(toast.error("Error", "Not Registered"));
    } else {
      axios
        .post("http://localhost:5000/ClubCom/register", finalObject)
        .then((res) => {
          toast.success("ClubCom Registered");
          console.log(res.message);
          this.props.closePopup();
        })
        .catch(toast.error("Error,Registeration failure"));
    }
  }

  render() {
    return (
      <React.Fragment>
        {/* <img src={background} className="main" /> */}
        <div className="main popup">
          <title>Add User</title>
          <div className="brand">
            <nav class="container  navbar navbar-expand-lg navbar-light navtemp">
              <NavLink to="/DashBoard" class="col-lg-4 navbar-brand navtemp">
                <h2> Campus Connect</h2>
              </NavLink>

              <div className="col-lg-4"></div>
              <div class=" collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                  <NavLink to="/Admin_dashboard" class="nav-item nav-link">
                    Dashboard
                  </NavLink>
                  <NavLink to="/UserForm" class="nav-item nav-link">
                    Add User
                  </NavLink>
                  <a class="nav-item nav-link" href="#">
                    {this.state.User}
                  </a>
                  <NavLink to="/" class="nav-item nav-link " tabindex="-1">
                    Log Out
                  </NavLink>
                </div>
              </div>
            </nav>
          </div>
          <div className="loginbox">
            {/* <img src={userlogo} className="user" /> */}
            <h1>Add User</h1>

            <form onSubmit={this.submit}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    {/* <p>*</p> */}
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter Username*"
                      required
                      onChange={(event) => {
                        this.setState({
                          username: event.target.value,
                        });
                      }}
                      className="form-group"
                    />
                  </div>
                  <div className="col-lg-6">
                    {/* <p>Password :</p> */}
                    <input
                      type="password"
                      placeholder="Enter Password*"
                      required
                      onChange={(event) => {
                        this.setState({
                          password: event.target.value,
                        });
                      }}
                      className="form-group"
                    />
                  </div>
                </div>
                {/* <p>Email ID :</p>
              <br /> */}
                <div className="row col-lg-12">
                  <input
                    type="email"
                    pattern="{/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}"
                    name="emailid"
                    className="form-control"
                    placeholder="Enter EmailID*"
                    className="form-group"
                    required
                    onChange={(event) => {
                      this.setState({
                        Email_ID: event.target.value,
                      });
                    }}
                  />
                </div>
                {/* Guys, Input pattern for first name and last name is /^[A-Za-z]+$/ and it can only be verified when form is submitted, DURING BACKEND*/}
                <div className="row">
                  <div className="col-lg-6">
                    {/* <p>First Name :</p> */}
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Name"
                      className="form-group"
                      onChange={(event) => {
                        this.setState({
                          Name: event.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    {/* <p>Last Name :</p> */}
                    <input
                      type="text"
                      name="Contact"
                      placeholder="Enter Contact*"
                      required
                      onChange={(event) => {
                        this.setState({
                          contact: event.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    {/* <p>Gender :</p> */}
                    <br></br>
                    <RadioGroup
                      name="Gender"
                      style={{ display: "flex", width: "100%" }}
                      onChange={(event) => {
                        this.setState({
                          Gender: event,
                        });
                      }}
                    >
                      <Radio value="male" />
                      Male
                      <Radio value="female" />
                      Female
                    </RadioGroup>
                  </div>
                  <div className="col-lg-6">
                    {/* <p id="age">Age :</p> */}
                    <input
                      type="text"
                      name="age"
                      placeholder="Enter your Age for eg: 20 years"
                      onChange={(event) => {
                        this.setState({
                          Age: event.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                {/* <p>Address :</p> */}

                <textarea
                  type="textarea"
                  rows="2"
                  className="form-control"
                  cols="50"
                  name="address"
                  placeholder="Enter Address"
                  onChange={(event) => {
                    this.setState({
                      Address: event.target.value,
                    });
                  }}
                />
                <br />
                <div className="row">
                  <div className="col-lg-6">
                    {/* <p>College ID :</p> */}
                    <input
                      type="text"
                      name="cid"
                      className="required"
                      placeholder="Enter college ID*"
                      required
                      onChange={(event) => {
                        this.setState({
                          Clg_ID: event.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    {/* <p>Link for LinkedIn :</p> */}
                    <RadioGroup
                      required
                      name="UserType"
                      style={{ display: "flex", width: "100%" }}
                      onChange={(event) => {
                        this.setState({
                          UserType: event,
                        });
                      }}
                    >
                      <Radio value="student" />
                      Student
                      <Radio value="ClubCom" />
                      Club/Com
                    </RadioGroup>
                  </div>
                </div>
                <button class="form-group button button1">Add User</button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default UserForm;
