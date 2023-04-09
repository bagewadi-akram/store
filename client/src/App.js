import "./App.css";
import React, { Fragment, useEffect } from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Navbar from "./component/layout/Header/Navbar";
import ProductDetails from "./component/product/ProductDetails.js";
import Product from "./component/product/Product.js";
import Login from "./component/auth/Login";
import store from "./store";
import { loadUser } from "./actions/userAction";
import Profile from "./component/auth/Profile";
import UpdateProfile from "./component/auth/UpdateProfile";
import UpdatePassword from "./component/auth/UpdatePassword";
import ResetPassword from "./component/auth/ResetPassword";
import SellerLogin from "./component/auth/SellerLogin";
import ForgotPassword from "./component/auth/ForgetPassword";
import Cart from "./component/cart/Cart";
import Shipping from "./component/cart/Shipping";
import ConfirmOrder from "./component/cart/ConfirmOrder";
import PaymentSuccess from "./component/cart/PaymentSuccess";
import { useDispatch, useSelector } from "react-redux";
import OrderSuccess from "./component/cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/admin/Dashboard";
import NewProduct from "./component/admin/NewProduct";
import ProductList from "./component/admin/ProductList";
import OrderList from "./component/admin/OrderList";
import ProcessOrder from "./component/admin/ProcessOrder";
import UpdateProduct from "./component/admin/UpdateProduct";
import { checkServer } from "./actions/serverAction";

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { server } = useSelector((state) => state.server);
  const dispatch = useDispatch();
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    dispatch(checkServer());
    store.dispatch(loadUser());
  }, [dispatch]);

  return (
    <Fragment>
      {server ? (
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" Component={Home} />

            <Route exact path="/getProduct/:id" Component={ProductDetails} />

            <Route exact path="/product" Component={Product} />

            <Route path="/product/:keyword" Component={Product} />

            <Route exact path="/login" Component={Login} />

            <Route exact path="/login/:type" Component={SellerLogin} />

            <Route exact path="/account" Component={Profile} />

            <Route exact path="/update" Component={UpdateProfile} />

            <Route exact path="/password/update" Component={UpdatePassword} />

            <Route exact path="/password/forgot" Component={ForgotPassword} />

            <Route
              exact
              path="/user/passwordReset/:token"
              Component={ResetPassword}
            />

            <Route exact path="/cart" Component={Cart} />

            {isAuthenticated && (
              <Route path="/login/shipping" Component={Shipping} />
            )}

            {isAuthenticated && (
              <Route exact path="/order/confirm" Component={ConfirmOrder} />
            )}

            {isAuthenticated && (
              <Route
                exact
                path="/paymentSuccess"
                element={<PaymentSuccess />}
              />
            )}

            {isAuthenticated && (
              <Route exact path="/success" Component={OrderSuccess} />
            )}

            {isAuthenticated && (
              <Route exact path="/orders" Component={MyOrders} />
            )}

            {isAuthenticated && (
              <Route exact path="/order/:id" Component={OrderDetails} />
            )}

            {isAuthenticated && (
              <Route exact path="/login/dashboard" Component={Dashboard} />
            )}

            <Route exact path="/admin/products" Component={ProductList} />

            <Route exact path="/admin/product" Component={NewProduct} />

            <Route exact path="/admin/product/:id" Component={UpdateProduct} />

            <Route exact path="/admin/orders" Component={OrderList} />

            <Route exact path="/admin/order/:id" Component={ProcessOrder} />
          </Routes>
          <Footer />
        </Router>
      ) : (
        <div className="offline">
          <h1>Server is Offline, Please Try After Sometime..!</h1>
          <a href="/">Retry</a>
        </div>
      )}
    </Fragment>
    // }
  );
}

export default App;
