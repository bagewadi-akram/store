import React, { Fragment, useEffect } from "react";
import { Login, Register } from "./FormDesign";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors } from "../../actions/userAction";
const SellerLogin = () => {
  const alert = useAlert();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { err, isAuthenticated, user } = useSelector((state) => state.user);

  const { type } = useParams();

  useEffect(() => {
    if (isAuthenticated) {
      if (user) {
        if (user.role === "seller") {
          navigate("/login/dashboard");
        }
      }
    } else {
      navigate("/login/seller");
    }

    if (err) {
      alert.error(err);
      dispatch(clearErrors());
    }
  }, [dispatch, err, alert, isAuthenticated, user]);

  return <Fragment>{type === "signin" ? <Login /> : <Register />}</Fragment>;
};

export default SellerLogin;
