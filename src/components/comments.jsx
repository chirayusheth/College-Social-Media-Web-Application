import React, { Component } from "react";
import CommentTemplate from "./comment_template";
import axios from "axios";
import "./comment.css"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
class Comments extends Component {
  state = {
    event_id: this.props.id,
    Eventname: this.props.name,
    userdetails: [],
    Description:"default",
    comments: [],
    refresh: false,
    refreshed: false,
    loggedin: false,
  };

  componentDidUpdate(prevprops,prevstate){
    if(prevstate.refresh != this.state.refresh)
    {
       axios
      .get(`http://localhost:5000/Comment/${this.state.event_id}`)
      .then((response) => {
        console.log("comment", response);
        this.setState({
          comments: response.data,
          refreshed: !this.state.refreshed
        });
      });
    }


  }
  componentDidMount() {
    axios
      .get(`http://localhost:5000/Comment/${this.state.event_id}`)
      .then((response) => {
        console.log("comment", response);
        this.setState({
          comments: response.data,
        });
      });
    axios
      .get("http://localhost:5000/User/isLoggedIn", { withCredentials: true })
      .then((res) => {
        console.log("simple form user", res);
        if (res.data.user != null) {
          this.setState({
            userdetails: res.data.user,
            loggedin: true,
          });
        }
      });
  }

post_comment(e){
e.preventDefault();

  const comment={
    // id: this.state.event_id,
    username: this.state.userdetails.username,
    Description: this.state.Description,
  }
  axios.post(`http://localhost:5000/Comment/add/${this.state.event_id}`,comment).then(
    res=> {
      console.log(res)
      toast.success("comment posted")
      this.setState({
        refresh: !this.state.refresh
      })
    }
  )
}

refresh(){
  this.setState({
    refresh : !this.state.refresh
  })
}
  render() {
    const commentList = this.state.comments.map((data) => (
      <CommentTemplate
        key={data._id}
        id={data._id}
        Event={this.state.Eventname}
        User={data.User}
        Reported={data.reported}
        Description={data.Description}
        refresh={this.refresh.bind(this)}
      />
    ));
    return <div>{commentList}
   { this.state.loggedin &&(
   
   <form class="addcomment" onSubmit={this.post_comment.bind(this)}>
   <span  class="heading" style={{fontSize: "20px" }}><b>Add Comment</b></span>
  <div class="form-group">
    <label  class="username"><span><b>User name:</b></span>&nbsp; {this.state.userdetails.username}</label>
  </div>
  <div class="form-group">
      <textarea
                  type="textarea"
                  rows="2"
                  className="form-control"
                  cols="50"
                  name="Description"
                  placeholder="Description"
                  onChange={(event) => {
                    this.setState({
                      Description: event.target.value,
                    });
                  }}
                />
  </div>
  <button type="submit" class="btn btn-primary">Post</button>
</form>
   )}
    </div>;
  }
}

export default Comments;
