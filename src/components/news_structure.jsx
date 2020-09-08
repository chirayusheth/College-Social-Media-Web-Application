import React, { Component } from "react";
import "./news_structure.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

class News_structure extends Component {
  state = {
    Remove: false,
    key: this.props.id,
  };

  componentDidUpdate(prevprops, prevstate) {
    if (prevstate.Remove != this.state.Remove) {
      console.log(this.state.key);
      axios
        .delete(`http://localhost:5000/News/${this.state.key}`)
        .then((res) => {
          console.log(res.data);
          this.props.refresh();
          toast.success("News Deleted");
        });
    }
  }

  render() {
    return (
      <div>
        <div className="news-template col-lg-12 ">
          <span>
            <h2 className="event-heading">{this.props.Heading}</h2>
            <p className="writer">{this.props.Date}</p>
            <p class="Description">{this.props.Description}</p>
            {this.props.showRemove ? (
              <button
                class="remove"
                onClick={() => {
                  this.setState({
                    Remove: true,
                  });
                }}
              >
                Remove
              </button>
            ) : null}
          </span>
        </div>
      </div>
    );
  }
}

export default News_structure;
