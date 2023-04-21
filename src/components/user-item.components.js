import React, { Component } from "react";
import UserService from "../services/user.service";
import { withRouter } from '../common/with-router';

class UserItem extends Component {
    constructor(props) {
        super(props);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.getUser = this.getUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.onChangeRoles = this.onChangeRoles.bind(this);
        this.getAllRoles = this.getAllRoles.bind(this);
    
        this.state = {
          currentUser: {
            id: null,
            username: "",
            email: "",
            roles: [],
            rolesName: []
          },
          allRoles: [],
          message: ""
        };
    }

    componentDidMount() {
        this.getUser(this.props.router.params.userId);
        this.getAllRoles();
    }
    //remember to change the "userID" part of this.props in order to manage a specific item

    onChangeUserName(e) {
        const username = e.target.value;
    
        this.setState(prevState => ({
          currentUser: {
            ...prevState.currentUser,
            username: username
          }
        }));
    }
    
    onChangeEmail(e) {
        const email = e.target.value;
        
        this.setState(prevState => ({
          currentUser: {
            ...prevState.currentUser,
            email: email
          }
        }));
      }
    
      onChangeRoles(e) {
        const roleId = e.target.value;
        const checked = e.target.checked;
        const { currentUser } = this.state;
        const roles = [...currentUser.roles];
        
        if (checked) {
          roles.push(roleId);
        } else {
          const index = roles.indexOf(roleId);
          if (index !== -1) {
            roles.splice(index, 1);
          }
        }
      
        this.setState({
          currentUser: {
            ...currentUser,
            roles,
          },
        });
      }
      
    getAllRoles() {
      UserService.getAllRoles()
        .then(response => {
          this.setState({
            allRoles: response.data
          });
        })
        .catch(e => {
          console.log(e);
        });
    }

    getUser(userId) {
        console.log('userId:', userId);
        UserService.getUser(userId)
          .then(response => {
            this.setState({
              currentUser: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }

    handleClick = () => {
        this.props.router.navigate("/adminallusers");
    };// note the navigate which allowed to route to location

    updateUser(){
      UserService.updateUser(
          this.state.currentUser.userId,
          this.state.currentUser
      )
      .then(response => {
          console.log(response.data);
          this.props.router.navigate('/adminallusers');
        })
        .catch(e => {
          console.log(e);
        });
  }
    
    deleteUser(){
        UserService.deleteUser(this.state.currentUser.userId)
        .then(response => {
            console.log(response.data);
            this.props.router.navigate('/adminallusers');
          })
          .catch(e => {
            console.log(e);
          });
    }

    render(){
        const { currentUser, allRoles } = this.state;

        return(
            <div>
                {currentUser ? (
                    <div className="edit-form">
                        <h4>Manage User</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="username">User Name:</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={currentUser.username}
                                    onChange={this.onChangeUserName}
                                    />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Email:</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    value={currentUser.email}
                                    onChange={this.onChangeEmail}
                                    />
                            </div>
                            <div className="form-group">
                              <label htmlFor="roles">Roles</label>
                              <div>
                              {allRoles.map(role => (
                                <div key={role._id} className="form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    value={role._id}
                                    checked={currentUser.roles.includes(role._id)}
                                    onChange={this.onChangeRoles}
                                  />
                                  <label htmlFor={role.name} className="form-check-label">
                                    {role.name}
                                  </label>
                                </div>
                              ))}


                              </div>
                            </div>


                        </form>

                        <button className="badge badge-success" onClick={this.handleClick}>
                        Cancel
                        </button>
                        
                        <button
                        type="submit"
                        className="badge badge-warning"
                        onClick={this.updateUser}
                        >
                            Update
                        </button> 

                        <button
                        className="badge badge-danger mr-2"
                        onClick={this.deleteUser}
                        >
                            Delete
                        </button>
                        
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a user...</p>
                    </div>
                )}
            </div>
        )
    }

}

export default withRouter(UserItem);