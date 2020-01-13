import React, { Component } from "react";
import { connect } from "react-redux";
import mappingFunctions from "../../Mapping";
import { withRouter } from "react-router-dom";
import Firebase from "../../Firebase/firebase";
class UpdateUser extends Component {
  state = {
    name: "",
    phone: "",
    birthday: "",
    gender: "",
    password: "",
    userType: ""
  };
  handler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentWillMount = async () => {
    const user = await Firebase.fetchUser(this.props.match.params.id);
    this.setState({
      name: user.name,
      phone: user.phone,
      birthday: user.birthday,
      gender: user.gender,
      password: user.password,
      userType: user.userType
    });
  };
  submit = async () => {
    await Firebase.updateUser(
      this.state.name,
      this.state.gender,
      this.state.birthday,
      this.state.userType,
      this.state.phone,
      this.state.password
    );
    this.props.history.push("/users");
  };
  render() {
    return (
      <div className="container">
        <h1>Update User</h1>
        <form className="form-custom">
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
              placeholder="Enter the phone of the user"
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
              placeholder="Enter the name of the user"
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              value={this.state.gender}
              className="form-control"
              onChange={this.handler}
              id="gender"
              disabled
              name="gender"
              placeholder="Enter the gender of the user"
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthday">Birthday</label>
            <input
              type="text"
              value={this.state.birthday}
              className="form-control"
              onChange={this.handler}
              id="birthday"
              disabled
              name="birthday"
              placeholder="Enter the birthday of the user"
            />
          </div>
          <div className="form-group">
            <label htmlFor="userType">User Type</label>
            <input
              type="text"
              value={this.state.userType}
              className="form-control"
              onChange={this.handler}
              id="userType"
              disabled
              name="userType"
              placeholder="Enter the type of the user"
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
              placeholder="Enter the password of the user"
            />
          </div>
          <button
            style={{ marginTop: "40px" }}
            type="button"
            onClick={this.submit}
            className="btn btn-dark btn-block"
          >
            Update User
          </button>
        </form>
      </div>
    );
  }
}
export default connect(
  mappingFunctions.mapStateToProps,
  mappingFunctions.mapDispatchToProps
)(withRouter(UpdateUser));
