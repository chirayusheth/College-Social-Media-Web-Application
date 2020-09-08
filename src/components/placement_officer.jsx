import React, { Component } from "react";
import "./placement_officer.css";

class Placement_officer extends Component {
  state = {};
  render() {
    return (
      <div className="container row">
        <div className="col-lg-6">
          <div class="place_form">
            <h3 class="form_header">Add Company</h3>
            <form>
              <div class="row">
                <div class="col-md-5">
                  <p>Company Name</p>
                  <input
                    type="text"
                    name="company name"
                    placeholder="Enter Company Name"
                    required
                  />
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-5">
                  <p>Offer Type</p>
                  <input
                    type="text"
                    name="Offer Type"
                    placeholder="Enter Offer Type"
                    required
                  />
                </div>
                <div class="col-md-1"></div>
              </div>

              <div class="row">
                <div class="col-md-5">
                  <p>Select Category</p>
                  <div class="dropdown">
                    <button
                      class="btn btn-default dropdown-toggle"
                      type="button"
                      id="dropdownMenu1"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="true"
                    >
                      Select Category
                      <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu3">
                      <li class="dropdown-header">Category</li>
                      <li>
                        <a href="#">A1 - Above 9 lacs</a>
                      </li>
                      <li>
                        <a href="#">A - Between 5-9 lacs</a>
                      </li>
                      <li>
                        <a href="#">B - Below 5 lacs</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-5">
                  <p>Open For</p>
                  <div class="dropdown">
                    <button
                      class="btn btn-default dropdown-toggle"
                      type="button"
                      id="dropdownMenu1"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="true"
                    >
                      Select Criteria
                      <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu3">
                      <li class="dropdown-header">Criteria</li>
                      <li>
                        <a href="#">For All</a>
                      </li>
                      <li>
                        <a href="#">CPI greater than 7.5</a>
                      </li>
                      <li>
                        <a href="#">CPI greater than 7</a>
                      </li>
                      <li>
                        <a href="#">CPI greater than 6.5</a>
                      </li>
                      <li>
                        <a href="#">CPI greater than 6</a>
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-1"></div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3">
                  <p>Registratioin Starts</p>
                  <input type="text" placeholder="dd/mm/yyyy" required />
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-3">
                  <p>Registratioin Ends</p>
                  <input type="text" placeholder="dd/mm/yyyy" required />
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-3">
                  <p>Oncampus Date</p>
                  <input type="text" placeholder="dd/mm/yyyy" required />
                </div>
                <div class="col-md-1"></div>
              </div>

              <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                  <p align="center">Posting Location</p>
                  <input
                    type="text"
                    placeholder="Posting Location: Cities"
                    required
                  />
                </div>
                <div class="col-md-2"></div>
              </div>

              <div class="row">
                <div class="col-md-4"></div>
                <div class="col-md-4">
                  <input type="submit" />
                </div>
                <div class="col-md-4"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Placement_officer;
