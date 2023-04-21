import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import Product from "./components/product.component";
import BoardDirector from "./components/board-director.component";
import BoardDevOps from "./components/board-devops.component";
import BoardAdmin from "./components/board-admin.component";
import AllUsers from "./components/all-users.component";
import AdminAllUsers from "./components/admin-all-users.component";
import UserItem from "./components/user-item.components";


import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      showAllUsers: false,
      showAdminAllUsers: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showDevOpsBoard: user.roles.includes("ROLE_DEVOPS"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showAllUsers: user.roles.includes("ROLE_ADMIN"),
        showAdminAllUsers: user.roles.includes("ROLE_ADMIN")
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showDevOpsBoard: false,
      showAdminBoard: false,
      showAllUsers: false,
      showAdminAllUsers: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showDevOpsBoard, showAdminBoard, showAllUsers, showAdminAllUsers } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Web 110
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {currentUser && (
              <li className="nav-item">
                <Link to={"/draft-products-inventory"} className="nav-link">
                  Products
                </Link>
              </li>
            )}

            {showDevOpsBoard && (
              <li className="nav-item">
                <Link to={"/devops"} className="nav-link">
                  DevOps Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {showAllUsers && (
              <li className="nav-item">
                <Link to={"/allusers"} className="nav-link">
                  Users
                </Link>
              </li>
            )}

            {showAdminAllUsers && (
              <li className="nav-item">
                <Link to={"/adminallusers"} className="nav-link">
                  All Users
                </Link>
              </li>
            )}


          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/draft-products-inventory" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/director" element={<BoardDirector />} />
            <Route path="/devops" element={<BoardDevOps />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/allusers" element={<AllUsers />} />
            <Route path="/adminallusers" element={<AdminAllUsers />} />
            <Route path="/adminallusers/:userId" element={<UserItem/>} />
          </Routes>
        </div>

        <AuthVerify logOut={this.logOut}/>
      </div>
    );
  }
}

export default App;
