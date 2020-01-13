import ActionTypes from "../Actions/ActionTypes";

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    login: payload => dispatch({ type: ActionTypes.LOGIN, payload }),
    updateUsers: payload =>
      dispatch({ type: ActionTypes.UPDATE_USERS, payload }),
    updateProducts: payload =>
      dispatch({ type: ActionTypes.UPDATE_PRODUCTS, payload }),
    updateOrders: payload =>
      dispatch({ type: ActionTypes.UPDATE_ORDERS, payload })
  };
};

const mappingFunctions = {
  mapDispatchToProps,
  mapStateToProps
};

export default mappingFunctions;
