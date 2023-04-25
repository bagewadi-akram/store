import React, { Fragment, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "../cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { createOrder, clearErrors } from "../../actions/orderAction";
import "./PaymentSuccess.css";
import paymentImage from "../../images/successful_payment.png";
import { emptyCart } from "../../actions/cartAction";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const searchQuery = useSearchParams()[0];
  const dispatch = useDispatch();
  const alert = useAlert();
  const referenceNum = searchQuery.get("reference");
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { err } = useSelector((state) => state.newOrder);

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
  const handleSubmit = () => {
    try {
      order.paymentInfo = {
        id: referenceNum,
        status: "paid",
      };
      dispatch(createOrder(order));
      dispatch(emptyCart());
      navigate("/success");
    } catch (error) {
      alert.error(error);
    }
  };
  useEffect(() => {
    if (err) {
      alert.error(err);
      dispatch(clearErrors());
    }
  }, [dispatch, err, alert]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentSuccess">
        <img src={paymentImage} alt="Payment Successfully" />
        <h1>Payment Success</h1>
        <p>Reference No. {referenceNum}</p>
        <button onClick={handleSubmit}>Ok</button>
      </div>
    </Fragment>
  );
};

export default PaymentSuccess;
