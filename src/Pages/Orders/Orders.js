import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import mappingFunctions from "../../Mapping";
import Firebase from "../../Firebase/firebase";
class Products extends Component {
  clickHandler = id => {
    this.props.history.push("/order/" + id);
  };
  componentWillMount = async () => {
    const orders = await Firebase.fetchOrders();
    this.props.updateOrders(orders);
  };
  render() {
    const orders = this.props.orders.map((element, index) => {
      return (
        <tr
          onClick={e => {
            this.clickHandler(element.orderId);
          }}
          key={index}
        >
          <th scope="row">{element.orderId}</th>
          <td>{element.name}</td>
          <td>{element.phone}</td>
          <td>Rs.{element.totalAmount}</td>
          <td>{element.city}</td>
          <td>{element.address}</td>
          <td>{element.postalCode}</td>
          <td>{element.status}</td>
          <td>{element.dateTime}</td>
        </tr>
      );
    });

    return (
      <div className="container">
        <div className="row align-items-center">
          <h1 className="product-heading col-12">Orders</h1>
        </div>
        <table className="table table-bordered table-hover table-responsive table-dark">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Total Amount</th>
              <th scope="col">City</th>
              <th scope="col">Address</th>
              <th scope="col">Postal Code</th>
              <th scope="col">Status</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>{orders}</tbody>
        </table>
      </div>
    );
  }
}
export default connect(
  mappingFunctions.mapStateToProps,
  mappingFunctions.mapDispatchToProps
)(withRouter(Products));
