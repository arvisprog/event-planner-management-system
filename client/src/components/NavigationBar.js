import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/actions";
import Logo from "../images/logo.png";

import "../styles/Navigation.css";

function NavigationBar({ name, handleEventModalData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    navigate("/");
  };

  const openModal = () => {
    handleEventModalData(true);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/home">
          <img src={Logo} alt="Logo" />{" "}
        </a>
      </div>

      <div className="menu-right">
        <a className="link" href="/home">
          Home
        </a>

        <button className="link button" onClick={openModal}>
          Create Event
        </button>
        <a className="cta-button" href="/home">
          Hello, {name}
        </a>
        <button className="link button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default NavigationBar;
