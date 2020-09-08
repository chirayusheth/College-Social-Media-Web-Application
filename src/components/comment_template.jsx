import React, { Component } from "react";
import axios from "axios";
import "./comment_template.css"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

class CommentTemplate extends Component {
  state = {
    commentID: this.props.id,
    EventName: this.props.Event,
    User: this.props.User,
    description: this.props.Description,
    reported: this.props.Reported,
    userdetails: [],
    loggedin: false,
    userdetails:[],
    reported: false,
  };

  componentDidUpdate(prevprop, prevstate){
    if(prevstate.reported != this.state.reported)
    {
      axios.post(`http://localhost:5000/Comment/report/${this.state.commentID}`).then(res=>
      {
        toast.error("Comment Reported!!");
        this.props.refresh();
      }
      )
    }
  }

  componentDidMount() {
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


    // axios.get(`http://localhost:5000/User/${this.state.userID}`).then((res) =>
    //   this.setState({
    //     userdetails: res.data,
    //   })
    // );
  }
  render() {
    return (
      <div>
  

<div class="container">
            <div class="row">
                <div class="col-md-8">
                   <div class="comments-list">
                       <div class="media">
                            <div class="media-body">
                                
                              <h4 class="media-heading user_name">{this.state.User} {this.props.Reported && (<span style={{color: "red", float:"right"}}><i>Reported</i></span>)}</h4>
                              {this.state.description}
                              
                              {this.state.loggedin && <p><small><a href="" onClick={() => this.setState({
                                reported: true
                              })}>Report</a></small></p>}
                            </div>
                          </div>
                   </div>
                    
                    
                    
                </div>
            </div>
        </div>




      </div>
    );
  }
}

export default CommentTemplate;
