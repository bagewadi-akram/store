import {
  PAYMENT_FAIL,
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
} from "../constants/paymentConstants";

export const paymentReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_REQUEST:
      return {
        loading: true,
      };
    case PAYMENT_SUCCESS:
    case PAYMENT_FAIL:
      return {
        loading: false,
      };

    default:
      return state;
  }
};
