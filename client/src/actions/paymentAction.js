import axios from "axios";
import logo from "../images/logo.png";

// function loadScript(src) {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = src;
//     script.onload = () => {
//       resolve(true);
//     };
//     script.onerror = () => {
//       resolve(false);
//     };
//     document.body.appendChild(script);
//   });
// }

async function MakePayment({ totalPrice, user, phoneNo }) {
  // const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  // if (!res) {
  // return console.log(
  // "Razorpay SDK failed to load. Please Check Internet Connection and Try Again..."
  // );
  // }
  // try {

  const {
    data: { key },
  } = await axios.get(`/payment/apiKey`);
  const {
    data: { order },
  } = await axios.post(`/payment/create`, { totalPrice });

  const options = {
    key,
    amount: totalPrice,
    currency: "INR",
    name: "store.com",
    description: "This is Payment from store",
    image: logo,
    order_id: order.id,
    callback_url: "http://localhost:8080/payment/pay",
    prefill: {
      name: user.name,
      email: user.email,
      contact: phoneNo,
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#121212",
    },
  };
  const razor = new window.Razorpay(options);
  razor.open();
  // } catch (error) {
  // return error.message;
  // }
}

export { MakePayment };
