import React, { Component } from "react";

//import UserService from "../services/user.service";

import ProductService from "../services/product.service"

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.retrieveAllProducts = this.retrieveAllProducts.bind(this)

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    this.retrieveAllProducts();
  }

  retrieveAllProducts(){
    ProductService.getProductsDraft().then(
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

  render() {

    const { content } = this.state;

    return (

      <div>
        <header className="jumbotron">
          <h3>Product Inventory - Draft</h3>
        </header>
        <div className="table-responsive">
          <table className="table table-striped" key="product-table">
            <thead key="product-table-head">
                <tr key="header-row">
                    <th key="product-name-header" scope="col">Product Name</th>
                    <th key="owner-name-header" scope="col">Owner Name</th>
                    <th key="owner-header" scope="col">Owner</th>
                    <th key="scrum-master-header" scope="col">Scrum Master</th>
                    <th key="developers-header" scope="col">Developers</th>
                    <th key="methodology-header" scope="col">Methodology</th>
                    <th key="status-header" scope="col">Status</th>
                    <th key="start-date-header" scope="col">Start Date</th>
                </tr>
            </thead>
            <tbody key ="product-table-body">
                {content && content.map(product => {
                return (
                    <tr key={product.productId}>
                    <td key={product.productId + "product-data-name"}>{product.productName}</td>
                    <td key={product.productId + "product-data-ownerName"}>{product.ownerName}</td>
                    <td key = {product.productId + "product-data-ministryName"}>{product.ministryName}</td>
                    <td key = {product.productId + "product-data-scrumMasterName"}>{product.scrumMasterName}</td>
                    <td key={product.productId + "product-data-developers"}>
                        <ul className="list-unstyled">
                        {product.developerName.map((developer, index) => (
                            <li key={index}>{developer}</li>
                        ))}
                        </ul>
                    </td>
                    <td key= {product.productId + "product-data-methodology-name"}>{product.methodologyName}</td>
                    <td key= {product.productId + "product-data-status"}>{product.statusName}</td>
                    <td key = {product.productId + "product-data-date"}>{new Date(product.startDate).toLocaleDateString()}</td>
                    </tr>
                );
                })}
            </tbody>
          </table>
        </div>
      </div>

    );
  }
}