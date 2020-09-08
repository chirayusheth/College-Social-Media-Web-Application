import React, { Component } from "react";
import "./event_structure.css";
import axios from "axios";
import { browserHistory, Router, Route, Redirect, history } from "react-router";
import { NavLink } from "react-router-dom";

class Placement_Template extends Component {
  state = {};
  // componentDidMount() {

  // }

  render() {
    return (
      <div>
        <div className="event-template">
          <div class=" container">
            <div className="row">
              <h2 className="event-heading col-lg-6 col-md-6 col-sm-12">
                {this.props.name}
              </h2>
              <div className="info col-lg-6 col-md-6 col-sm-12">
                <b style={{ fontSize: "20px" }}>Date:</b> {this.props.Date}
              </div>
            </div>
            <br />
            <div className="row">
              <div className=" info col-lg-6 col-md-6 col-sm-12">
                {" "}
                <b>Registration Starts:</b> {this.props.RegDateStart}
              </div>
              <div className=" col-lg-6 col-md-6 col-sm-12">
                <b>Registration ends:</b> {this.props.RegDateEnd}
              </div>
            </div>
            <div className="row">
              <div className="info  col-lg-6 col-md-6 col-sm-12">
                <b>Type:</b> {this.props.OfferType}
              </div>
              <div className="info  col-lg-6 col-md-6 col-sm-12">
                <b>Category:</b> {this.props.Category}
              </div>
            </div>
            <div className="row">
              <div className="info  col-lg-6 col-md-6 col-sm-12">
                <b>Open for:</b> {this.props.OpenFor}
              </div>
              <div className="info  col-lg-6 col-md-6 col-sm-12">
                <b>Location:</b> {this.props.Locations}
              </div>
            </div>
          </div>
          <button className="more-info">More Info >></button>
          {this.props.status && (
            <button className="RSVP">I'm interested</button>
          )}
        </div>
      </div>
    );
  }
}

export default Placement_Template;
