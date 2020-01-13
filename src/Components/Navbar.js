import React, { Component } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import mappingFunctions from "../Mapping";
import LOCAL_STORAGE from "../Config/localStorage";
import logo from "../Images/logo.png";
class Navbar extends Component {
  logout = async () => {
    LOCAL_STORAGE.removeUser();
    this.props.login(null);
  };
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <Link className="navbar-brand" to="/">
          <img
            style={{
              width: "70px",
              borderRadius: "5px",
              boxShadow: "0 0 8px rgba(255,255,255,0.1)"
            }}
            src={logo}
          ></img>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Products
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/users">
                Users
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/orders">
                Orders
              </Link>
            </li>
          </ul>

          <form className="form-inline">
            <button
              onClick={this.logout}
              className="btn btn-light my-2 my-sm-0"
              type="button"
            >
              Logout
            </button>
          </form>
        </div>
      </nav>
    );
  }
}
export default connect(
  mappingFunctions.mapStateToProps,
  mappingFunctions.mapDispatchToProps
)(Navbar);
