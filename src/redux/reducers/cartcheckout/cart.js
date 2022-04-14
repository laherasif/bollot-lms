import {
  REG_CART,
  GET_CART,
  DELETE_CART,
  UPDATE_CART_QUANTITY_CLIENT,
  
  REG_CHECKOUT_DATA,
  FETCH_CHECKOUT_DATA,
  RESET_CART,
  PAYEMENT_CARD
} from "../../types/types";

const initialState = {
  AddCart: [],
  CheckOuts: [],
  isAuth: false,
  payment_method : ''
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case REG_CART:

      return {
        ...state,
        AddCart: [ ...state.AddCart , action.payload],
      };

    case GET_CART:
      return {
        ...state,
        AddCart: action.payload,
      };

    case DELETE_CART:
      let cart = state.AddCart.filter((item) => item.id !== action.payload);
      return {
        ...state,
        AddCart: cart,
        isAuth: true

      };

    case RESET_CART:

      return {
        ...initialState,
      };


    case REG_CHECKOUT_DATA:
      return {
        ...state,
        CheckOuts: action.payload,
      };

    case FETCH_CHECKOUT_DATA:
      return {
        ...state,
        CheckOuts: action.payload,
      };

    case PAYEMENT_CARD:
      return {
        ...state,
        payment_method: action.payload,
      };
   
    default:
      return state;
  }
};

export default CartReducer;
