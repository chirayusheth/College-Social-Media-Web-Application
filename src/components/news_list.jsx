import React, { useEffect, Component } from "react";
import News_structure from "./news_structure";
import axios from "axios";
import "./news_structure.css";
import "./news_list.css";

class News_list extends Component {
  state = {
    NewsD: [],
    refreshtoken: false,
    updated: false,
    newsreload: false,
  };

  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
  }

  refresh() {
    this.setState({ refreshtoken: true });
  }

  componentDidUpdate(prevprops, prevstate) {
    if (prevstate.refresh != this.state.refresh) {
      axios.get("http://localhost:5000/News/").then((Response) => {
        this.state.NewsD = Response.data;
        this.setState({
          newsreload: !this.state.newsreload,
        });
        console.log(this.state.NewsD);
      });
    }
  }

  componentDidMount() {
    console.log("fetch");
    axios.get("http://localhost:5000/News/").then((Response) => {
      this.state.NewsD = Response.data;
      console.log(this.state.NewsD);
      this.setState({
        updated: true,
      });
    });
  }
  render() {
    if (this.state.updated) {
      console.log(this.state.NewsD);
    }
    const NewsList = this.state.NewsD.map((data) => {
      return (
        <News_structure
          id={data._id}
          Heading={data.Title}
          Date={data.Date}
          Description={data.Description}
          showRemove={this.props.showRemove}
          refresh={this.refresh}
        />
      );
    });
    return (
      <div>
        <div className="header">
          <h1 style={{ color: "black", fontSize: "30px" }}>News</h1>
        </div>
        <div className="news-back">
          <div className="event-list">{NewsList}</div>
        </div>
      </div>
    );
  }
}

export default News_list;
