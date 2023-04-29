import React, { Fragment, useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { AccordionSummary, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";
import {
  FaArrowDown,
  FaArrowUp,
  FaBell,
  FaCaretDown,
  FaJediOrder,
  FaMoneyBillWaveAlt,
  FaPercentage,
  FaRupeeSign,
  FaSearch,
} from "react-icons/fa";
import MetaData from "../layout/MetaData";
import PersonIcon from "@material-ui/icons/Person";
import { DashboardNavbar } from "./DashboardNavbar.js";
import Loader from "../layout/loader/Loader";
import { RecentOrders, StaticsCard,ListedProducts } from "./Utils.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  const deliveredOrders = [];

  orders &&
    orders.forEach((item) => {
      if (item.orderStatus === "Delivered") {
        deliveredOrders.push(item);
      }
    });

  useEffect(() => {
    if (isAuthenticated === false) {
      return navigate("/login/seller");
    }
    if (isAuthenticated === true) {
      if (user.role !== "seller") {
        return navigate("/login/seller");
      }
    }
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
  }, [dispatch, isAuthenticated, navigate, user.role]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["#27abce"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  const icons = {
    down: <FaArrowDown className="redColor" />,
    up: <FaArrowUp className="greenColor" />,
    percentage: <FaPercentage />,
  };
  const statics = [
    {
      name: "Total Sales",
      value: totalAmount,
      upDown: "30",
      rupee: <FaRupeeSign />,
      icons,
    },
    {
      name: "Total Orders",
      value: 10,
      upDown: "20",
      icons,
    },
    {
      name: "Order  Delivered",
      value: deliveredOrders.length,
      upDown: "20",
      icons,
    },
    {
      name: "Listed Products",
      value: products.length,
      upDown: "32",
      icons,
    },
  ];

  return (
    <Fragment>
      {products && orders ? (
        <div className="dashboard">
          <MetaData title="Dashboard - Admin Panel" />
          <div className="left">
            <Sidebar />
          </div>
          <div className="right">
            <DashboardNavbar />
            <div className="dashboard-container">
              <div className="statics">
                {statics.map((item) => (
                  <>
                    <StaticsCard {...item} />
                  </>
                ))}
              </div>
              <div className="graphs">
                <div className="lineChart">
                  <Line data={lineState} />
                </div>
                <div className="doughnutChart">
                  <Doughnut data={doughnutState} />
                </div>
              </div>
              <RecentOrders data={orders} />
              <ListedProducts data={products} />
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </Fragment>
  );
};

export default Dashboard;
