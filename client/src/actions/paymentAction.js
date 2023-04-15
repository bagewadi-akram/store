import axios from "axios";
import logo from "../images/logo.png";

const loadScript = (src, alert) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
      alert.success("Payment GateWay Load Success");
    };

    script.onerror = () => {
      resolve(false);
      alert.error("Failed To Load Payment Gateway.... ");
      alert.error("Check Internet Connection.... ");
    };

    document.body.appendChild(script);
  });
};

export const MakePayment = async ({ totalPrice, user, phoneNo }, alert) => {

  
  await loadScript("https://checkout.razorpay.com/v1/checkout.js", alert);

  const {
    data: { key },
  } = await axios.get(`/payment/apiKey`);

  const {
    data: { order },
  } = await axios.post(`/payment/create`, { totalPrice });

  if (!order && !key) {
    alert.error("Please Check Your Internet Connection ....");
  }

  const options = {
    key,
    amount: totalPrice,
    currency: "INR",
    name: "store.com",
    description: `This is Payment to store from ${user.name}`,
    image: logo,
    order_id: order.id,
    callback_url: "http://localhost:8080/payment/pay",
    prefill: {
      name: user.name,
      email: user.email,
      contact: phoneNo,
    },
    notes: {
      address: "Store Pune ",
    },
    theme: {
      color: "#121212",
    },
  };
  const razor = new window.Razorpay(options);
  razor.open();
};
