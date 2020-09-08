import React, { Component } from "react";
import "./event_structure.css";
import axios from "axios";
import { browserHistory, Router, Route, Redirect, history } from "react-router";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

// function approve(id, request) {
//   if (request) {
//     const url = `http://localhost:5000/Event/approve/${id}`;
//     // const url_final = url + this.props.id.toString();
//     axios.post(url).then(Response => console.log(Response));
//     return true;
//   }
// }

class Event_structure extends Component {
  state = {
    id: this.props.id,
    request: false,
    temp: false,
    organizer: this.props.organizer,
    organizerD: [],
    organizer1: "default",
    Rsvpadd: false,
    Rsvpremove: false,
    rsvp: 0,
    remove: false,
    loggedin: true,
    userdetails: [],
  };
  // componentDidMount() {

  // }

  constructor(props) {
    super(props);
    // this.requestApprove = this.requestApprove.bind(this);
    this.updateOrganizer = this.updateOrganizer.bind(this);
  }

  // requestApprove(id) {
  //   this.setState({
  //     temp: approve(id, this.state.request)
  //   });
  // }

  componentDidUpdate(prevProp, PrevState) {
    if (PrevState.remove != this.state.remove) {
      axios
        .delete(`http://localhost:5000/Event/${this.state.id}`)
        .then((Response) => {
          this.props.refresh();
          toast.success("Event Deleted !!");
        });
    }

    if (PrevState.request != this.state.request) {
      const url = `http://localhost:5000/Event/approve/${this.state.id}`;
      axios.post(url).then((Response) => {
        this.props.refresh();
        toast.success("Event Approved!!");
      });
    }

    if (PrevState.RsvpAdd != this.state.Rsvpadd && this.state.RsvpAdd) {
      axios
        .post(`http://localhost:5000/Event/rsvp/${this.state.id}`)
        .then((Response) => {
          console.log("rsvp add", Response);
          this.props.refresh();
        });
    }

    if (
      PrevState.Rsvpremove != this.state.Rsvpremove &&
      this.state.Rsvpremove
    ) {
      axios
        .post(`http://localhost:5000/Event/rsvpcancel/${this.state.id}`)
        .then((Response) => {
          this.props.refresh();
        });
    }
  }

  RsvpAdd() {
    if (this.state.Rsvpadd) {
      this.setState({
        RsvpAdd: false,
        Rsvpremove: true,
      });
    } else {
      this.setState({
        RsvpAdd: true,
        Rsvpremove: false,
      });
    }
  }

  updateOrganizer(event) {
    this.setState({
      organizer1: event,
    });
    console.log("organizer name", this.state.organizer1);
  }

  componentDidMount() {
    console.log("id", this.props.id);
    console.log("namee", this.props.name);
    axios
      .get(`http://localhost:5000/ClubCom/${this.state.organizer}`)
      .then((Response) => {
        console.log(Response);
        this.state.organizerD = Response.data;
        this.updateOrganizer(this.state.organizerD.username);
      });

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
            loggedin: false,
          });
        }
      });
  }

  render() {
    if (this.state.temp) {
      return <Redirect to="/Admin_dashboard" />;
    } else {
      return (
        <div>
          <div className="event-template">
            <span>
              <h2 className="event-heading">{this.props.name}</h2>
              <span className="organize">
                By{" "}
                <span className="organizer">
                  {this.state.organizerD.username}
                </span>
              </span>
            </span>

            <div className="date">
              <span className="textclr"> Date : {this.props.date}</span>
              &nbsp;&nbsp;&nbsp;
              <span className="textclr"> Time : {this.props.time}</span>
            </div>
            <div className="info">{this.props.description}</div>
            <div className="container row">
              <NavLink
                to={{
                  pathname: "/Event_more",
                  state: {
                    id: this.state.id,
                    organizer: this.state.organizer1,
                  },
                }}
              >
                <button className="more-info">More Info >></button>
              </NavLink>
              {this.props.status &&
                this.state.userdetails.UserType != "ClubCom" &&
                this.state.userdetails.username != "admin" &&
                this.state.loggedin && (
                  <div>
                    <button onClick={this.RsvpAdd.bind(this)} className="RSVP">
                      I'm interested
                    </button>{" "}
                    &nbsp;
                    {/* <span>{this.props.NoOfAttendees}</span> */}
                  </div>
                )}
              {this.state.userdetails.username == "admin" &&
                !this.props.status && (
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
              {!this.props.status &&
                this.state.userdetails.username != "admin" && (
                  <button
                    style={{ backgroundColor: "black" }}
                    className="approval"
                    disabled
                  >
                    Not approved
                  </button>
                )}

              {(this.state.userdetails.UserType == "ClubCom" ||
                this.state.userdetails.username == "admin") && (
                <button
                  onClick={() =>
                    this.setState({
                      remove: true,
                    })
                  }
                  style={{ backgroundColor: "Red" }}
                  className="approval"
                >
                  Remove Event
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Event_structure;
