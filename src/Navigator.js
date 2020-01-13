import React, { Component } from "react";
import { BrowserRouter, Switch, Route, withRouter } from "react-router-dom";
import Login from "./Pages/Login/Login";
import AddProduct from "./Pages/AddProduct/AddProduct";
import UpdateProducts from "./Pages/UpdateProducts/UpdateProducts";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import Order from "./Pages/Order/Order";
import Users from "./Pages/Users/Users";
import Orders from "./Pages/Orders/Orders";
import User from "./Pages/User/User";
import Navbar from "./Components/Navbar";
import { connect } from "react-redux";
import mappingFunctions from "./Mapping";
import Firebase from "./Firebase/firebase";
class Redirector extends Component {
  componentWillMount = () => {
    this.props.history.push("/");
  };
  render() {
    return <div></div>;
  }
}
const Redirect = withRouter(Redirector);
class Navigator extends Component {
  componentWillMount = async () => {
    const users = await Firebase.fetchUsers();
    const products = await Firebase.fetchProducts();
    const orders = await Firebase.fetchOrders();
    this.props.updateProducts(products);
    this.props.updateUsers(users);
    this.props.updateOrders(orders);
  };
  render() {
    return (
      <BrowserRouter>
        {this.props.user && <Navbar></Navbar>}
        <Switch>
          {this.props.user ? (
            <React.Fragment>
              <Route exact path="/add/product/">
                <AddProduct></AddProduct>
              </Route>
              <Route exact path="/product/:id">
                <UpdateProducts></UpdateProducts>
              </Route>
              <Route exact path="/">
                <Products></Products>
              </Route>
              <Route exact path="/order/:id">
                <Order></Order>
              </Route>
              <Route exact path="/orders">
                <Orders></Orders>
              </Route>
              <Route exact path="/users">
                <Users></Users>
              </Route>
              <Route exact path="/user/:id">
                <User></User>
              </Route>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Route exact path="/">
                <Login></Login>
              </Route>

              <Route path="/*">
                <Redirect></Redirect>
              </Route>
            </React.Fragment>
          )}
        </Switch>
      </BrowserRouter>
    );
  }
}
export default connect(
  mappingFunctions.mapStateToProps,
  mappingFunctions.mapDispatchToProps
)(Navigator);
