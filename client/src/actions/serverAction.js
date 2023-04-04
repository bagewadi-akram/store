import axios from "axios";
import {
  SERVER_FAIL,
  SERVER_REQUEST,
  SERVER_SUCCESS,
} from "../constants/serverConstants";

export const checkServer = () => async (dispatch) => {
  try {
    dispatch({ type: SERVER_REQUEST });
    await axios.get(`/online/offline`);
    dispatch({ type: SERVER_SUCCESS });
  } catch (error) {
    dispatch({ type: SERVER_FAIL, payload: error.response.data.message });
  }
};
