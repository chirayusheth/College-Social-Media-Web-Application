import React, { Component } from "react";
import Navbar from "./navbar";
import userlogo from "./login/user.png";
import { RadioGroup, Radio } from "react-radio-group";
import { NavLink } from "react-router-dom";
import { render } from "@testing-library/react";
import "./SimpleForm.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

// var sectionStyle = {
//   backgroundImage: "url(" + background + ")"
// };

class SimpleForm extends Component {
  state = {
    EventName: "default",
    Organizer: "default",
    Date: 1234,
    Time: 1234,
    Venue: "default",
    Duration: 123,
    Description: "default",
    Contact: "123456789",
    NoOfAttendees: 2345,
    userdetails: [],
  };

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
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

  submit(e) {
    e.preventDefault();

    const finalObject = {
      Name: this.state.EventName,
      Organizer: this.state.userdetails.username,
      Contact: this.state.Contact,
      Date: this.state.Date,
      Time: this.state.Time,
      Venue: this.state.Venue,
      Duration: this.state.Duration,
      Description: this.state.Description,
    };

    axios.post("http://localhost:5000/Event/add", finalObject).then((res) => {
      console.log(res.message);
      this.props.closePopup();
      toast.success("Event Added");
    });
  }

  render() {
    return (
      <React.Fragment>
        {/* <img src={background} className="main" /> */}
        <div className="main popup">
          <div className="SimpleForm">
            {/* <img src={userlogo} className="user" /> */}
            <h1>Request Event </h1>

            <form onSubmit={this.submit}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    {/* <p>User Name :</p> */}
                    <input
                      type="text"
                      name="EventName"
                      placeholder="Event Name"
                      required
                      onChange={(event) => {
                        this.setState({
                          EventName: event.target.value,
                        });
                      }}
                      className="form-group"
                    />
                  </div>
                  <div className="col-lg-6">
                    {/* <p>Password :</p> */}
                    <label>Organizer: {this.state.userdetails.username}</label>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    {/* <p>First Name :</p> */}
                    <input
                      type="text"
                      name="Venue"
                      placeholder="Venue"
                      required
                      className="form-group"
                      onChange={(event) => {
                        this.setState({
                          FirstName: event.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    {/* <p>Last Name :</p> */}
                    <input
                      type="text"
                      name="Duration"
                      placeholder="Duration"
                      required
                      className="form-group"
                      onChange={(event) => {
                        this.setState({
                          Duration: event.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    {/* <p>First Name :</p> */}
                    <input
                      type="date"
                      name="Date"
                      placeholder="Date"
                      required
                      className="form-group"
                      onChange={(event) => {
                        this.setState({
                          Date: event.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    {/* <p>Last Name :</p> */}

                    <input
                      type="time"
                      name="Time"
                      placeholder="like 07:30"
                      required
                      className="form-group"
                      onChange={(event) => {
                        this.setState({
                          Time: event.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    {/* <p>Gender :</p> */}
                    <input
                      type="tel"
                      pattern="[0-9]{10}"
                      name="Contact"
                      placeholder="Contact"
                      required
                      className="form-group"
                      onChange={(event) => {
                        this.setState({
                          Contact: event.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-lg-6">{/* <p id="age">Age :</p> */}</div>
                </div>
                {/* <p>Address :</p> */}

                <textarea
                  type="textarea"
                  rows="2"
                  className="form-control form-group"
                  cols="50"
                  name="Description"
                  placeholder="Description"
                  required
                  onChange={(event) => {
                    this.setState({
                      Description: event.target.value,
                    });
                  }}
                />
                <br />

                <button class="form-group button button1">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default SimpleForm;
