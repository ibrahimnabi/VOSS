import React, { Component } from "react";
import "./Order.css";
import { connect } from "react-redux";
import mappingFunctions from "../../Mapping";
import { withRouter } from "react-router-dom";
import Firebase from "../../Firebase/firebase";
class Order extends Component {
  state = {
    orderId: "",
    city: "",
    dateTime: "",
    name: "",
    phone: "",
    postalCode: "",
    status: "",
    totalAmount: "",
    items: []
  };
  handler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentWillMount = async () => {
    const order = await Firebase.fetchOrder(this.props.match.params.id);
    const items = Object.keys(order.items).map(element => {
      return { ...order.items[element] };
    });
    this.setState({
      orderId: order.orderId,
      city: order.city,
      dateTime: order.dateTime,
      name: order.name,
      phone: order.phone,
      postalCode: order.postalCode,
      status: order.status,
      totalAmount: order.totalAmount,
      items
    });
  };
  submit = async () => {
    await Firebase.updateOrder(this.state.orderId, this.state.status);
    this.props.history.push("/orders");
  };
  render() {
    const items = this.state.items.map(element => {
      return (
        <div
          style={{ padding: "10px", margin: "20px", borderRadius: "10px" }}
          className="row bg-dark text-light"
        >
          <p className="col-3 text-align-center">{element.name}</p>
          <p className="col-3 text-align-center">{element.price}</p>
          <p className="col-3 text-align-center">{element.quantity}</p>
          <p className="col-3 text-align-center">{element.size}</p>
        </div>
      );
    });
    return (
      <div className="container">
        <h1>Order</h1>
        <form className="form-custom">
          <div className="form-group">
            <label htmlFor="orderId">Order ID</label>
            <input
              type="text"
              value={this.state.orderId}
              className="form-control"
              onChange={this.handler}
              id="orderId"
              disabled
              name="orderId"
              placeholder="Enter the id of the Order"
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              value={this.state.city}
              className="form-control"
              onChange={this.handler}
              id="city"
              disabled
              name="city"
              placeholder="Enter the city of the Order"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateTime">Datetime</label>
            <input
              type="text"
              value={this.state.dateTime}
              className="form-control"
              onChange={this.handler}
              id="dateTime"
              disabled
              name="dateTime"
              placeholder="Enter the Date Time of the Order"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={this.state.name}
              className="form-control"
              onChange={this.handler}
              id="name"
              disabled
              name="name"
              placeholder="Enter the name of the Order"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              value={this.state.phone}
              className="form-control"
              onChange={this.handler}
              id="phone"
              disabled
              name="phone"
              placeholder="Enter the phone of the Order"
            />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              value={this.state.postalCode}
              className="form-control"
              onChange={this.handler}
              id="postalCode"
              disabled
              name="postalCode"
              placeholder="Enter the postal code of the Order"
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalAmount">Total Amount</label>
            <input
              type="text"
              value={this.state.totalAmount}
              className="form-control"
              onChange={this.handler}
              id="totalAmount"
              disabled
              name="totalAmount"
              placeholder="Enter the total amount of the Order"
            />
          </div>
          <label>Items</label>
          {items}
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              onChange={this.handler}
              value={this.state.status}
              className="form-control"
              id="status"
              name="status"
            >
              <option value="completed">completed</option>
              <option value="dispatched">dispatched</option>
              <option value="pending">pending</option>
            </select>
          </div>
          <button
            className="btn btn-dark btn-block"
            onClick={this.submit}
            type="button"
          >
            Update Order
          </button>
        </form>
      </div>
    );
  }
}
export default connect(
  mappingFunctions.mapStateToProps,
  mappingFunctions.mapDispatchToProps
)(withRouter(Order));
