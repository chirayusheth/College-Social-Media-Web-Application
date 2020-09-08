import React, { Component } from "react";
import "./event_structure.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import $ from "jquery";
import Popper from "popper.js";
class Filter extends Component {
  addFilter(event) {
    return;
  }
  render() {
    return (
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
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="/">
              Cultural
            </a>
            <a class="dropdown-item ">Annual</a>
            <a class="dropdown-item ">DTG</a>
            <a class="dropdown-item ">Cubic</a>
            <a class="dropdown-item ">Debate</a>
            <a class="dropdown-item ">DSC</a>
            <a class="dropdown-item ">Sport</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
