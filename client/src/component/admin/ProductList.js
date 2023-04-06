import React, { Fragment, useEffect } from "react";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const alert = useAlert();

  const { err, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    alert.error(`Deleting Product : ${id}   `);
    alert.error(` Please Wait .... `);
    dispatch(deleteProduct(id));
  };
  const editProductHandler = (id) => {
    navigate(`/admin/product/${id}`);
  };

  useEffect(() => {
    if (err) {
      alert.error(err);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      navigate("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, err, deleteError, navigate, isDeleted]);

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          <section>
            {products &&
              products.map((product) => (
                <div className="card" key={product._id}>
                  <img src={product.image[0].url} alt={product.title} />
                  <p>{product.title}</p>
                  <span>
                    <p>Price : {product.price}</p>
                    <p>Stock Remaining : {product.stock}</p>
                  </span>
                  <div className="buttonContainer">
                    <button onClick={() => editProductHandler(product._id)}>
                      <EditIcon fontSize="small" /> Edit
                    </button>
                    <button onClick={() => deleteProductHandler(product._id)}>
                      <DeleteIcon fontSize="small" /> Remove
                    </button>
                  </div>
                </div>
              ))}
          </section>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
