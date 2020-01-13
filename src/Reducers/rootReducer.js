import ActionTypes from "../Actions/ActionTypes";

const initialState = {
  user: null,
  users: [],
  orders: [],
  products: []
};
const reducer = (
  state = initialState,
  action = { type: "DEFAULT", payload: {} }
) => {
  switch (action.type) {
    case ActionTypes.LOGIN: {
      return { ...state, user: action.payload };
    }
    case ActionTypes.UPDATE_ORDERS: {
      return { ...state, orders: action.payload };
    }
    case ActionTypes.UPDATE_PRODUCTS: {
      return { ...state, products: action.payload };
    }
    case ActionTypes.UPDATE_USERS: {
      return { ...state, users: action.payload };
    }
    default: {
      return state;
    }
  }
};
export default reducer;
