import React, { useState, Fragment } from "react";
import logo from "../../../images/logo.png";
import "./Style.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserOptions from "./UserOptions";
import DropMenu from "./DropMenu";
import { IconButton, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/product/${keyword}`);
    } else {
      navigate("/product");
    }
  };

  return (
    <Fragment>
      <div className="navbar">
        <img
          src={logo}
          alt="store.com"
          className="logo"
          onClick={() => navigate("/")}
        />
        <span className="searchBar">
          <form onSubmit={searchSubmitHandler}>
            <input
              type="text"
              placeholder="Search a Product ..."
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" value="Search">
              <SearchIcon />
            </button>
          </form>
        </span>
        <div className="link-container">
          <Tooltip title="Seller account">
            <IconButton
              onClick={() => navigate("/login?redirect=dashboard")}
              size="small"
            >
              <AddBusinessIcon className="link-icon" />
              <small className="link-text">Seller</small>
            </IconButton>
          </Tooltip>
          <Tooltip title="Cart">
            <IconButton onClick={() => navigate("/cart")} size="small">
              <LocalGroceryStoreIcon className="link-icon" />
              <small className="link-text">Cart</small>
            </IconButton>
          </Tooltip>
          {isAuthenticated ? <UserOptions /> : <DropMenu />}
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
