import React, { Fragment, Suspense, useEffect } from "react";
// import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { Doughnut, Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";
import {
  FaArrowDown,
  FaArrowUp,
  FaPercentage,
  FaRupeeSign,
} from "react-icons/fa";
import MetaData from "../layout/MetaData";
import { DashboardNavbar } from "./DashboardNavbar.js";
import Loader from "../layout/loader/Loader";
import { RecentOrders, StaticsCard, ListedProducts } from "./Utils.js";

const Sidebar = React.lazy(() => import("./Sidebar.js"));

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
    labels: ["Jan", "Feb", "Mar"],
    datasets: [
      {
        label: "Total Sales",
        backgroundColor: ["#27abce"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
      {
        label: "Amount Earned",
        backgroundColor: ["#27abce"],
        data: [0, 350],
      },
      {
        label: "Products",
        backgroundColor: ["#27abce"],
        data: [0, 600],
      },
    ],
  };

  const doughnutState = products && {
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
  const statics = products && [
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
            <Suspense fallback={<div>Loading...</div>}>
              <Sidebar />
            </Suspense>
          </div>
          <div className="right">
            <DashboardNavbar data={user && user} />
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
                  <Bar data={lineState} />
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
