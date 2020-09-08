import React, { useEffect, Component } from "react";
import Event_structure from "./event_structure";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./event_structure.css";
import "./event_list.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import $ from "jquery";
import Popper from "popper.js";


toast.configure();

class Events extends Component {
  state = {
    EventD: [],
    updated: false,
    organizerD: [],
    ComD: [],
    filterText: "",
    filteradded: false,
    url: "http://localhost:5000/Event/",
    urlcom: "http://localhost:5000/ClubCom/",
    refresh: false,
  };

  constructor(props) {
    super(props);
    this.Refresh = this.Refresh.bind(this);
  }

  componentDidMount() {
    console.log("fetch");
    axios.get(this.state.url).then((Response) => {
      this.state.EventD = Response.data;
      console.log("EDM", this.state.EventD);
      this.setState({
        updated: true,
      });
    });

    axios.get("http://localhost:5000/ClubCom/").then((Response) => {
      this.setState({
        ComD: Response.data,
      });
      console.log("comD", this.state.ComD);
    });
  }

  Refresh() {
    this.setState({
      refresh: !this.state.refresh,
    });
    console.log(this.state.refresh);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.refresh != this.state.refresh) {
      axios.get("http://localhost:5000/Event/").then((Response) => {
        this.state.EventD = Response.data;
        console.log(this.state.EventD);
        this.setState({
          updated: true,
        });
      });
    }
    if (prevState.filterText != this.state.filterText) {
      const url = `http://localhost:5000/Event/filterBy/${this.state.filterText}`;

      axios.get(url).then((Response) => {
        this.state.EventD = Response.data;
        this.setState({
          filteradded: true,
        });
        toast.success("Filter Added!!");
        console.log("EventD", this.state.EventD);
      });
    }
  }

  render() {
    if (this.state.updated) {
      console.log("EventD", this.state.EventD);
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
          description={data.Description}
          status={data.Approved}
          duration={data.Duration}
          NoOfAttendees={data.NoOfAttendees}
          refresh={this.Refresh}
        />
      );
    });

    const filterlist = this.state.ComD.map((data) => {
      return (
        <a
          class="dropdown-item "
          onClick={() => {
            this.setState({
              filterText: data.username,
            });
          }}
        >
          {data.username}
        </a>
      );
    });

    return (
      <div>
        <div className=" container header">
          <div class="row">
            <div className="col-lg-8 col-md-8 col-sm-6">
              <h1 style={{ color: "black", fontSize: "30px" }}>Events</h1>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div class="filter">
                <div class="dropdown">
                  <button
                    class="btn btn-light dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Filter
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    {filterlist}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row event-back scrollEvent">
          <div className="eventList">{EventList}</div>
        </div>
      </div>
    );
  }
}

export default Events;
