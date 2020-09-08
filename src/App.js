import React, { Component } from "react";
import Login from "./components/login/login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  DashBoard,
  Admin_dashboard,
  Organizer_dashboard,
  Student_DashBoard,
} from "./components/DashBoard";
import Add_events from "./components/add_events";
import UserForm from "./components/UserForm";
import Placement_updates from "./components/placement_updates";
import Placement_officer from "./components/placement_officer";
import { PopLogin } from "./components/popupLogin";
import News_list from "./components/news_list";
import AddNews from "./components/add_news";
import Event_more from "./components/event_more";
import axios from "axios";
// import checkAuthentication from "../backend/auth/protect";

class LoginPage extends Component {
  state = {
    loginstatus: false,
    userdetails: [],
  };
  componentDidMount() {
    console.log("apppppppp");
    // axios.get("http://localhost:5000/User/isLoggedIn").then((response) => {
    //   console.log("loggedin user: ", response.data);
    //   if (response.data.user != null) {
    //     this.setState({
    //       loginstatus: true,
    //     });
    //   }
    // });
  }

  render() {
    console.log("App.js", this.state.userdetails);
    if (true) {
      return (
        <BrowserRouter>
          <Switch>
            {/* <Route path="/" component={Login} exact /> */}
            <Route path="/" component={DashBoard} exact />
            <Route path="/Event_more" component={Event_more} />
            <Route path="/Admin_dashboard" component={Admin_dashboard} />
            <Route path="/student" component={Student_DashBoard} />
            <Route path="/organizer" component={Organizer_dashboard} />
            <Route path="/PlacementUpdates" component={Placement_updates} />
            <Route path="/PlacementOfficer" component={Placement_officer} />

            <Route component={nopagefound} />
          </Switch>
        </BrowserRouter>
      );
    } else {
      return (
        <BrowserRouter>
          <Switch>
            {/* <Route path="/" component={Login} exact /> */}
            <Route path="/" component={DashBoard} />
            <Route component={nopagefound} />
          </Switch>
        </BrowserRouter>
      );
    }
  }
}

export default LoginPage;
class nopagefound extends Component {
  state = {};
  render() {
    return <div>no page found</div>;
  }
}

export { nopagefound };
