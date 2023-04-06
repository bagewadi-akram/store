import React, { Fragment, useEffect } from "react";
import ProductCard from "./ProductCard.js";
import "./Home.css";
import MetaData from "../layout/MetaData.js";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader.js";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

import connector from "../../images/connector.jpg";
import switches from "../../images/switches.jpg";
import prototype from "../../images/prototype.jpg";
import powerSupply from "../../images/powersupply.jpg";
import circuit from "../../images/curcuit.jpg";
import passive from "../../images/passive.jpg";
import active from "../../images/active.jpg";
import hardware from "../../images/hardware.jpg"; 

const Home = () => {
  const categories = [
    { title: "Connectors", image: connector, description: "" },
    { title: "Switches", image: switches, description: "" },
    { title: "Passive Components", image: passive, description: "" },
    { title: "Active Components", image: active, description: "" },
    { title: "Power Supply", image: powerSupply, description: "" },
    { title: "Circuit Protection", image: circuit, description: "" },
    { title: "Prototyping Testing", image: prototype, description: "" },
    { title: "Hardware", image: hardware, description: "" },
  ];

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

          <div>
            <h2 className="homeHeading">Find Products By Category</h2>

            <div className="categoryContainer">
              {categories.map((item) => (
                <Link key={item.title} to={`/product`}>
                  <img src={item.image} alt="" />

                  <p>
                    <strong>{item.title}</strong> {item.description}
                  </p>
                </Link>
              ))}
            </div>
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
