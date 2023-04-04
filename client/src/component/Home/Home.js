import React, { Fragment, useEffect } from "react";
import ProductCard from "./ProductCard.js";
import "./Home.css";
import MetaData from "../layout/MetaData.js";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader.js";
import { useAlert } from "react-alert";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, err, products } = useSelector((state) => state.products);
  useEffect(() => {
    if (err) {
      alert.error(err);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, err, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Store" />
          <div className="banner">
            <p>Welcome to STORE </p>
            <h1>FIND AMAZING PRODUCTS BELLOW</h1>

            <a href="#container">
              <button>Scroll </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
