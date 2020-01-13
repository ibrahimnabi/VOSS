import React, { Component } from "react";
import "./Login.css";
import { connect } from "react-redux";
import mappingFunctions from "../../Mapping";
import Firebase from "../../Firebase/firebase";
import LOCAL_STORAGE from "../../Config/localStorage";
import logo from "../../Images/logo.png";
class Login extends Component {
  state = {
    username: "",
    password: ""
  };
  handler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  submit = async () => {
    if (
      this.state.username.trim() === "" ||
      this.state.password.trim() === ""
    ) {
      alert("Please fill all fields");
    } else {
      const user = await Firebase.login(
        this.state.username,
        this.state.password
      );
      if (user) {
        LOCAL_STORAGE.setUser(user);
        this.props.login(user);
      }
    }
  };
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="loginForm col-md-8 col-10">
            <div className="row justify-content-center">
              <img
                style={{
                  width: "200px",
                  alignSelf: "center",
                  marginTop: "20px",
                  marginBottom: "20px",
                  display: "block",
                  borderRadius: "10px"
                }}
                src={logo}
              ></img>
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                value={this.state.username}
                className="form-control"
                id="username"
                name="username"
                onChange={this.handler}
                placeholder="Enter your Username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={this.state.password}
                className="form-control"
                onChange={this.handler}
                id="password"
                name="password"
                placeholder="Enter your Password"
              />
            </div>
            <button
              onClick={this.submit}
              type="button"
              className="btn btn-dark btn-block"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  mappingFunctions.mapStateToProps,
  mappingFunctions.mapDispatchToProps
)(Login);
