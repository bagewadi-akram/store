import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";

const MyOrders = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, err, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    {
      field: "actions",
      // flex: 0.5,
      headerName: "Actions",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
    { field: "id", headerName: "Order ID", minWidth: 300 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      // flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      // flex: 0.5,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 160,
      // flex: 0.5,
    },
    {
      field: "address",
      headerName: "Shipping Address",
      type: "string",
      minWidth: 280,
      // flex: 0.5,
    },
    {
      field: "payment",
      headerName: "Payment Status",
      type: "string",
      minWidth: 250,
      // flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "success"
          ? "redColor"
          : "greenColor";
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
        address:
          item.shippingInfo.address +
          "," +
          item.shippingInfo.city +
          "," +
          item.shippingInfo.state +
          "," +
          item.shippingInfo.pinCode,
        payment: item.paymentInfo.status,
      });
    });

  useEffect(() => {
    if (err) {
      alert.error(err);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, err]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
