import React, { Component } from "react";

//import UserService from "../services/user.service";

import ProductService from "../services/product.service"

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: []
    };
  }

  componentDidMount() {
    ProductService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  renderProductsTable() {
    const { content } = this.state;

    return (
      <tbody>
        {content.map(product => (
          <tr key={product.productId}>
            <td>{product.productName}</td>
            <td>{product.ministryName}</td>
            <td>{product.statusName}</td>
            <td>{new Date(product.startDate).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Product Inventory</h3>
        </header>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr key="header-row">
                    <th key="product-name-header" scope="col">Product Name</th>
                    <th key="owner-header" scope="col">Owner</th>
                    <th key="status-header" scope="col">Status</th>
                    <th key="start-date-header" scope="col">Start Date</th>
                </tr>
            </thead>
            {this.renderProductsTable()}
          </table>
        </div>
      </div>
    );
  }

}

