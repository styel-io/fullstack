import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CHECKPASS_SUCCESS,
  CHECKPASS_FAIL,
  MODIFY_FAIL,
  MODIFY_SUCCESS,
  GET_USEREMAIL
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = ({ name, email, password, role }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password, role });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "negative")));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "negative")));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// check Pass
export const check = (password, email) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ password, email });

  try {
    const res = await axios.post("/api/auth/check_pass", body, config);
    dispatch({
      type: CHECKPASS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "negative")));
    }
    dispatch({
      type: CHECKPASS_FAIL
    });
  }
};

// UpdateBasic
export const updatebasic = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.put("/api/users/modify", body, config);

    dispatch({
      type: MODIFY_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "negative")));
    }

    dispatch({
      type: MODIFY_FAIL
    });
  }
};

// ForgotPassword
export const forgotPassword = email => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/auth/forgotpassword", email, config);
    dispatch(setAlert(res.data, "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "negative")));
    }
  }
};

// getResetPasswordToken
export const getResetPasswordToken = token => async dispatch => {
  try {
    // console.log(token);
    const res = await axios.get("/api/auth/reset/", {
      params: {
        resetPasswordToken: token
      }
    });
    console.log(res.data);
    dispatch({
      type: GET_USEREMAIL,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "negative")));
    }
  }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};
