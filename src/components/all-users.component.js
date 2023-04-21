import React, { Component } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class AllUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      error: null,
    };
  }

  componentDidMount() {
    UserService.getAllUsers()
      .then((response) => {
        this.setState({
          users: response.data,
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
        this.setState({ error: error.message });
      });
  }

  render() {
    const { users, error } = this.state;
    return (
      <div className="col-md-8 mx-auto">
        <h3 className="my-4">All Users</h3>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Roles</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.roles && user.roles.map((role, index) => <li key={index}>{role}</li>)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
