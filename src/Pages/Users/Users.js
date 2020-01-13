import React, { Component } from "react";
import "./Users.css";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import mappingFunctions from "../../Mapping";
import Firebase from "../../Firebase/firebase";
class Products extends Component {
  componentWillMount = async () => {
    const users = await Firebase.fetchUsers();
    this.props.updateUsers(users);
  };
  clickHandler = async id => {
    this.props.history.push("/user/" + id);
  };
  render() {
    const users = this.props.users.map((element, index) => {
      return (
        <tr onClick={() => this.clickHandler(element.phone)} key={index}>
          <th scope="row">{element.phone}</th>
          <td>{element.name}</td>
          <td>{element.userType}</td>
          <td>{element.gender}</td>
          <td>{element.birthday}</td>
        </tr>
      );
    });

    return (
      <div className="container">
        <div className="row align-items-center">
          <h1 className="product-heading">Users</h1>
        </div>
        <table className=" table table-bordered table-hover table-responsive table-dark">
          <thead>
            <tr>
              <th style={{ width: "20%" }} scope="col">
                Phone
              </th>
              <th style={{ width: "20%" }} scope="col">
                Name
              </th>
              <th style={{ width: "20%" }} scope="col">
                Type
              </th>
              <th style={{ width: "20%" }} scope="col">
                Gender
              </th>
              <th style={{ width: "20%" }} scope="col">
                Date of Birth
              </th>
            </tr>
          </thead>
          <tbody>{users}</tbody>
        </table>
      </div>
    );
  }
}
export default connect(
  mappingFunctions.mapStateToProps,
  mappingFunctions.mapDispatchToProps
)(withRouter(Products));
