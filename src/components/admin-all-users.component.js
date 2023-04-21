import React, { Component } from "react";
import UserService from "../services/user.service";
import { Link } from "react-router-dom";
// import EventBus from "../common/EventBus"; to add in if need to logout 

export default class AdminAllUsers extends Component{
    constructor(props){
        super(props);
        this.onChangeSearchUserName = this.onChangeSearchUserName.bind(this);
        this.retrieveAllUsers = this.retrieveAllUsers.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveUser = this.setActiveUser.bind(this);
        this.searchUserName = this.searchUserName.bind(this);

        this.state = {
        users: [],
        currentUser: null,
        currentIndex: -1,
        searchUserName: ""
        }
    }

    componentDidMount() {
        this.retrieveAllUsers();
    }
    
    onChangeSearchUserName(e) {
        const searchUserName = e.target.value;
    
        this.setState({
          searchUserName: searchUserName
        });
    }

    retrieveAllUsers() {
        UserService.getAllUsers()
          .then(response => {
            this.setState({
              users: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }
    
    refreshList() {
        this.retrieveAllUsers();
        this.setState({
          currentUser: null,
          currentIndex: -1,
          searchUserName: ""
        });
    }
    
    setActiveUser(user, index) {
        console.log('user:', user);
        this.setState({
          currentUser: user,
          currentIndex: index
        });
    }

    searchUserName() {
        UserService.findByName(this.state.searchUserName)
          .then(response => {
            this.setState({
              users: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });

    }

    render(){
        const { searchUserName, users, currentUser, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by user name"
                            value={searchUserName}
                            onChange={this.onChangeSearchUserName}
                        />
                        <div className="input-group-append">
                            <button key="search-button"
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={this.searchUserName}
                            >
                                Search
                            </button>
                            
                        </div>
                        <div className="input-group-append">
                            <button key = "clear-button" 
                            className="btn btn-outline-secondary" 
                            type="button" 
                            id="button-addon1"
                            onClick={this.refreshList}
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    {users.length === 0 ? (
                        <div>
                        <p>No user found matching that search. </p>
                        <button className="btn btn-dark" onClick={this.refreshList}>Refresh Inventory</button>
                        </div>
                    ) : (
                        <div>
                        <h4>Users Inventory</h4>
                        <ul className="list-group">
                            {users.map((user, index) => (
                            <li
                                className={
                                "list-group-item " +
                                (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveUser(user, index)}
                                key={index}
                            >
                                {user.username}
                            </li>
                            ))}
                        </ul>
                        </div>
                    )}
                </div>
                <div className="col-md-6">
                    {currentUser ? (
                        <div>
                            <h4>Selected User</h4>
                            <div>
                                <label>
                                    <strong>User Name:</strong>
                                </label>{" "}{currentUser.username}
                            </div>
                            <div>
                                <label>
                                    <strong>Email:</strong>
                                </label>{" "}{currentUser.email}
                            </div>
                            <div>
                                <label>
                                    <strong>
                                        Roles:
                                    </strong>
                                </label>{" "}
                                {currentUser.rolesName.map((role, index) => <li key={index}>{role}</li>)}
                            </div>
                            
                                
                                <Link to={"/adminallusers/" + currentUser.userId} className="badge badge-warning">
                                Manage User
                              </Link>
                              
                            
                        </div>
                    ) :(
                        <div>
                            <br />
                                <p>Please click on a user...</p>
                        </div>
                    )}
                </div>
            </div>
        );   
    }
}