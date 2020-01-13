import React, { Component } from "react";
import "./Products.css";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import mappingFunctions from "../../Mapping";
import Firebase from "../../Firebase/firebase";
class Products extends Component {
  clickHandler = id => {
    this.props.history.push("/product/" + id);
  };
  componentWillMount = async () => {
    const products = await Firebase.fetchProducts();
    this.props.updateProducts(products);
  };
  deleteHandler = async id => {
    await Firebase.deleteProduct(id);
    this.props.history.push("/products");
  };
  render() {
    const products = this.props.products.map((element, index) => {
      return (
        <tr key={index}>
          <th
            onClick={e => {
              this.clickHandler(element.pid);
            }}
            scope="row"
          >
            {element.pid}
          </th>
          <td
            onClick={e => {
              this.clickHandler(element.pid);
            }}
          >
            {element.name}
          </td>
          <td
            onClick={e => {
              this.clickHandler(element.pid);
            }}
          >
            <img className="productImage" src={element.image}></img>
          </td>
          <td
            onClick={e => {
              this.clickHandler(element.pid);
            }}
          >
            Rs. {element.price}
          </td>
          <td
            onClick={e => {
              this.clickHandler(element.pid);
            }}
          >
            {element.gender}
          </td>
          <td
            onClick={e => {
              this.clickHandler(element.pid);
            }}
          >
            {element.description}
          </td>
          <td
            onClick={e => {
              this.clickHandler(element.pid);
            }}
          >
            {element.sizes}
          </td>
          <td
            onClick={e => {
              this.clickHandler(element.pid);
            }}
          >
            {element.dateAdded}
          </td>
          <td
            className="text-danger text-bold"
            onClick={e => {
              e.preventDefault();
              this.deleteHandler(element.pid);
            }}
          >
            Delete
          </td>
        </tr>
      );
    });

    return (
      <div className="container">
        <div className="row align-items-center">
          <h1 className="product-heading col-8">Products</h1>
          <Link to="/add/product/" className="btn btn-dark btn-block col-4">
            Add Product
          </Link>
        </div>
        <table className="table table-bordered table-hover table-responsive table-dark">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Gender</th>
              <th scope="col">Description</th>
              <th scope="col">Sizes</th>
              <th scope="col">Date Added</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>{products}</tbody>
        </table>
      </div>
    );
  }
}
export default connect(
  mappingFunctions.mapStateToProps,
  mappingFunctions.mapDispatchToProps
)(withRouter(Products));
