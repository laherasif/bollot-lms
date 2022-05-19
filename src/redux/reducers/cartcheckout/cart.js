import {
  REG_CART,
  GET_CART,
  DELETE_CART,
  UPDATE_CART_QUANTITY_CLIENT,
  INCREMENT,
  DECREMENT,
  REG_CHECKOUT_DATA,
  FETCH_CHECKOUT_DATA,
  RESET_CART,
  PAYEMENT_CARD,
  REG_BOOK_MARK,
} from "../../types/types";

const initialState = {
  AddCart: [],
  BookMark: [],
  CheckOuts: [],
  isAuth: false,
  payment_method: ''
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case REG_CART:

      return {
        ...state,
        AddCart: [...state.AddCart, action.payload],
      };
    case REG_BOOK_MARK:
      const titles = new Set(state.BookMark?.map(item => item.id));
      if (titles.has(action.payload.id)) {
        let find = state.BookMark.filter((i) => i.id !== action.payload.id);
        return {
          ...state,
          BookMark: find
        }
      }
      return {
        ...state,
        BookMark: [...state.BookMark, action.payload]
      }



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
    case INCREMENT:
      state.localD[state.localD.findIndex((item) => item._id === action.id)]
        .Quantity++;

      localStorage.setItem("carts", JSON.stringify(state.localD));

      return {
        ...state,
        localD: [...state.localD],
      };

    case DECREMENT:
      state.localD[state.localD.findIndex((item) => item._id === action.id)]
        .Quantity--;

      localStorage.setItem("carts", JSON.stringify(state.localD));
      return {
        ...state,
        localD: [...state.localD],
      };

    default:
      return state;
  }
};

export default CartReducer;
