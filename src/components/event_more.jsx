import React, { Component } from "react";
import axios from "axios";
import "./event_structure.css";
import "./event_list.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { NavLink, Redirect } from "react-router-dom";
import Comments from "./comments";

class Event_more extends Component {
  state = {
    userdetails: [],
    id: this.props.location.state.id,
    EventD: [],
    loginStatus: "Log Out",
    loggedOut: false,
    logoutstate: false,
    organizer: this.props.location.state.organizer,
  };

  logout() {
    if (this.state.loginStatus == "Back to login") {
      this.setState({
        loggedOut: true,
      });
    } else {
      this.setState({
        logoutstate: true,
      });
    }
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
            loggedOut: true,
          });
        });
    }
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
        } else {
          this.setState({
            loginStatus: "Back to login",
          });
        }
      });

    axios
      .get(`http://localhost:5000/Event/${this.props.location.state.id}`)
      .then((Response) => {
        this.state.EventD = Response.data;
        console.log(this.state.EventD);
        this.setState({
          updated: true,
        });
      });
  }
  render() {
    if (this.state.loggedOut) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div className="brand">
          <nav class="container  navbar navbar-expand-lg navbar-light navtemp">
            <NavLink to="/DashBoard" class="col-lg-4 navbar-brand navtemp">
              <h2> Campus Connect</h2>
            </NavLink>

            <div className="col-lg-5"></div>
            <div class=" collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a class="nav-item nav-link" href="#">
                  {this.state.userdetails.username}
                </a>
                {/* <NavLink to="/" class="nav-item nav-link " tabindex="-1"> */}
                <a class="nav-item nav-link" onClick={this.logout.bind(this)}>
                  {" "}
                  {this.state.loginStatus}
                </a>
                {/* </NavLink> */}
              </div>
            </div>
          </nav>
        </div>
        <div>
          <div style={{padding: "10px", lineHeight: "40px"}} className="event-template">
            <span>
              <h2 className="event-heading">{this.state.EventD.Name}</h2>
              <span className="organize">
                By <span className="organizer">{this.state.organizer}</span>
              </span>
            </span>

            <div className="date">
              <span className="textclr"> Date : {this.state.EventD.Date}</span>
              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
              <span className="textclr"> Time : {this.state.EventD.Time}</span>
            </div>

            <div className="date">
              <span className="textclr"> Venue : {this.state.EventD.Venue}</span>
              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
              <span className="textclr"> Duration : {this.state.EventD.Duration} hr</span>
            </div>
            <span className="date textclr"> Contact : {this.state.EventD.Contact} </span>
            <div className="info">{this.state.EventD.Description}</div>

            {this.state.userdetails.UserType != "ClubCom" &&
              this.state.EventD.Approved && (
                <button className="RSVP">I'm interested</button>
              )}

            {!this.state.EventD.Approved && this.state.userdetails.username=="admin" && (
              <button
                href="/Admin_dashboard"
                onClick={() => {
                  this.setState({
                    request: true,
                  });

                  // this.requestApprove(this.state.id);
                }}
                className="approval"
              >
                Approve
              </button>
            )}
<hr/>
            <div class="comments">
              <span class="heading"> Comments</span>
              <Comments
                key={this.state.EventD._id}
                id={this.state.EventD._id}
                name={this.state.EventD.Name}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Event_more;
