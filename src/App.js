import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navigator from "./Navigator";
import { Provider } from "react-redux";
import store from "./Store/store";
import Firebase from "./Firebase/firebase";
import LOCAL_STORAGE from "./Config/localStorage";
import ActionTypes from "./Actions/ActionTypes";

class App extends React.Component {
  componentWillMount = async () => {
    const user = LOCAL_STORAGE.getUser();
    store.dispatch({ type: ActionTypes.LOGIN, payload: user });
  };
  render() {
    return (
      <Provider store={store}>
        <Navigator></Navigator>
      </Provider>
    );
  }
}

export default App;
