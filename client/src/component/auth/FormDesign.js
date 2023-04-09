import React, { Fragment, useRef, useState } from "react";
import "./SellerLogin.css";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import signin from "../../images/signin.jpg";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import signup from "../../images/signup.jpg";
import { registerSeller, logSeller } from "../../actions/userAction";
import { useDispatch } from "react-redux";

export const Register = () => {
  const dispatch = useDispatch();
  const registerTab = useRef(null);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);

    dispatch(registerSeller(myForm));
  };

  return (
    <Fragment>
      <div className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <form
                className="register-form"
                ref={registerTab}
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <label>
                    <FaceIcon className=" zmdi-account material-icons-name" />
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="form-group">
                  <label>
                    <MailOutlineIcon className=" zmdi-email" />
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="form-group">
                  <label>
                    <LockOpenIcon className="zmdi-lock" />
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="pass"
                    placeholder="Password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="checkbox"
                    name="agree-term"
                    id="agree-term"
                    className="agree-term"
                  />
                  <label className="label-agree-term">
                    <span>
                      <span></span>
                    </span>
                    I agree all statements in
                    <Link to="/login/terms" className="term-service">
                      Terms of service
                    </Link>
                  </label>
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    className="form-submit"
                    value="Register"
                  />
                </div>
              </form>
            </div>
            <div className="signup-image">
              <figure>
                <img src={signup} alt="sign up here" />
              </figure>
              <Link to="/login/signin" className="signup-image-link">
                I am already member
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export const Login = () => {
  const dispatch = useDispatch();

  const loginTab = useRef(null);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    myForm.set("password", password);

    dispatch(logSeller(myForm));
  };
  return (
    <Fragment>
      <div className="sign-in">
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <figure>
                <img src={signin} alt="sign in  here" />
              </figure>
              <Link to={`/login/register`} className="signup-image-link">
                Create an account
              </Link>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Sign up</h2>
              <form
                className="register-form"
                ref={loginTab}
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <label>
                    <FaceIcon className=" zmdi-account material-icons-name" />
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="your_name"
                    placeholder="Your Name"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="form-group">
                  <label>
                    <LockOpenIcon className=" zmdi-lock" />
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="your_pass"
                    placeholder="Password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    className="agree-term"
                  />
                  <label className="label-agree-term">
                    <span>
                      <span></span>
                    </span>
                    Remember me
                  </label>
                </div>
                <div className="form-group form-button">
                  <input type="submit" className="form-submit" value="Log in" />
                </div>
              </form>
              <div className="social-login">
                <span className="social-label">Or login with</span>
                <ul className="socials">
                  <li>
                    <Link to="/">
                      <FaFacebook />
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <FaTwitter />
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <FaGoogle />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
