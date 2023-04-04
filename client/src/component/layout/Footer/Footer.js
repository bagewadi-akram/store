import React from "react";
import "./Footer.css";
import delivery from "../../../images/delivery.png";
import payment from "../../../images/payments.png";
import logo from "../../../images/logo.png";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>.STORE</h4>
        <p>Some Key Features Of .STORE</p>
        <img src={payment} alt="Secure Payment" />
        <img src={delivery} alt="Fast Delivery" />
      </div>

      <div className="midFooter">
        <img src={logo} alt=">STORE.COM" width={250} />
        <p>High Quality is our first priority</p>

        <p>Copyrights 2023 &copy; ElectroPotentInfoTech</p>
      </div>

      <div className="rightFooter">
        <h4>My Account</h4>
        <a href="\">My Account</a>
        <a href="\">Order History</a>
        <a href="\">Wishlist</a>
      </div>
    </footer>
  );
};

export default Footer;
