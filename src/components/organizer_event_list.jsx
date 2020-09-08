import React, { useEffect, Component } from "react";
import Event_structure from "./event_structure";
import axios from "axios";
import "./event_structure.css";
import "./event_list.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import $ from "jquery";
import Popper from "popper.js";

class Organizer_Events extends Component {
  state = {
    EventD: [],
    updated: false,
    organizerD: [],
    ComD: [],
    loadevents: false,
    urlcom: "http://localhost:5000/ClubCom/",
    userdetails: [],
    refreshed: this.props.Event,
  };

  constructor(props) {
    super(props);
    this.Refresh = this.Refresh.bind(this);
  }

  componentDidUpdate(prevprops, prevstate) {
    if (prevstate.refreshed != this.state.refreshed) {
      axios
        .get(
          `http://localhost:5000/Event/getallEvents/${this.state.userdetails.username}`
        )
        .then((Response) => {
          this.state.EventD = Response.data;
          console.log(this.state.EventD);
          this.setState({
            refreshed: !this.state.refreshed,
          });
        });
    }

    if (prevstate.loadevents != this.state.loadevents) {
      axios
        .get(
          `http://localhost:5000/Event/getallEvents/${this.state.userdetails.username}`
        )
        .then((Response) => {
          this.state.EventD = Response.data;
          console.log(this.state.EventD);
          this.setState({
            updated: true,
          });
        });
    }
  }
  componentDidMount() {
    console.log("fetch");

    axios
      .get("http://localhost:5000/User/isLoggedIn", { withCredentials: true })
      .then((Response) => {
        console.log("in");
        this.setState({
          userdetails: Response.data.user,
          loadevents: true,
        });
      });

    axios.get(this.state.urlCom).then((Response) => {
      this.state.ComD = Response.data;
      console.log(this.state.ComD);
    });
  }
  Refresh() {
    this.setState({
      refreshed: !this.state.refreshed,
    });
    console.log(this.state.refreshed);
  }
  render() {
    if (this.state.updated) {
      console.log(this.state.EventD);
    }
    const EventList = this.state.EventD.map((data) => {
      return (
        <Event_structure
          key={data._id}
          id={data._id}
          name={data.Name}
          organizer={data.Organizer}
          date={data.Date}
          time={data.Time}
          venue={data.Venue}
          status={data.Approved}
          description={data.Description}
          duration={data.Duration}
          refresh={this.Refresh}
        />
      );
    });
    return (
      <div>
        <div className=" container header">
          <h1 style={{ color: "black", fontSize: "30px" }}>Events</h1>
        </div>
        <div className="">
          <div className="row event-back scrollEvent">
            <div className="eventList">{EventList}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Organizer_Events;
