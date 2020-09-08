import React, { Component } from "react";
import Navbar from "./navbar";
import userlogo from "./login/user.png";
import { RadioGroup, Radio } from "react-radio-group";
import { NavLink } from "react-router-dom";
import { render } from "@testing-library/react";
import "./add_news.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// var sectionStyle = {
//   backgroundImage: "url(" + background + ")"
// };
toast.configure();
class AddNews extends Component {
  state = {
    Title: "default",
    Date: 1234,
    Description: "default",
  };

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();

    console.log("v rehbv");
    const finalObject = {
      Title: this.state.Title,
      Date: this.state.Date,
      Description: this.state.Description,
    };
    console.log(finalObject);
    axios.post("http://localhost:5000/News/add", finalObject).then((res) => {
      toast.success("News Added");

      return this.props.closePopup();
    });
  }

  render() {
    return (
      <React.Fragment>
        {/* <img src={background} className="main" /> */}
        <div className="main popup">
          <div className="NewsForm">
            {/* <img src={userlogo} className="user" /> */}
            <h1>Add News</h1>

            <form onSubmit={this.submit}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    {/* <p>User Name :</p> */}
                    <input
                      type="text"
                      name="Title"
                      placeholder="Title"
                      required
                      onChange={(event) => {
                        this.setState({
                          Title: event.target.value,
                        });
                      }}
                      className="form-group"
                    />
                  </div>
                  <div className="col-lg-6">
                    {/* <p>Password :</p> */}
                    <input
                      type="date"
                      placeholder="Date"
                      required
                      name="Date"
                      onChange={(event) => {
                        this.setState({
                          Date: event.target.value,
                        });
                      }}
                      className="form-group"
                    />
                  </div>
                </div>
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

                <button type="submit" class="form-group button button1">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default AddNews;
