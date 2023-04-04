import {
  SERVER_FAIL,
  SERVER_REQUEST,
  SERVER_SUCCESS,
} from "../constants/serverConstants";

export const serverReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVER_REQUEST:
      return {
        loading: true,
        server: false,
      };

    case SERVER_SUCCESS:
      return {
        loading: false,
        server: true,
      };

    case SERVER_FAIL:
      return {
        loading: false,
        server: false,
      };

    default:
      return state;
  }
};
