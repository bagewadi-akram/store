import React from "react";
import "./navbarStyles.css";
import { logout } from "../../actions/userAction";
import { FaBell, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";

export const DashboardNavbar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  function logoutUser() {
    dispatch(logout());
    navigate("/");
    alert.success("Logout Successfully");
  }
  return (
    <div className="dashboard-navbar">
      <div className="dashboard-navbar-options">
        <span>
          <h2>Welcome Back, {data.name}</h2>
          <p>Here is all your statistics </p>
        </span>
        <ul>
          <li>
            <FaSearch />
            <input type="text" />
          </li>

          <li>
            <Link to={"/notification"}>
              <FaBell />
            </Link>
          </li>
          <li onClick={logoutUser}>
            <FaSignOutAlt />
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};
