import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { logout } from "../store/actions";
import Logo from "../images/logo.png";

import "../styles/Navigation.css";

function NavigationBar({ name, handleEventModalData, handleSearch }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    navigate("/");
  };

  const openModal = () => {
    handleEventModalData(true);
  };

  const onSearch = (event) => {
    setSearchQuery(event.target.value);
    handleSearch(event);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/home">
          <img src={Logo} alt="Logo" />{" "}
        </a>
      </div>
      {!id && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => onSearch(e)}
          />
        </div>
      )}

      <div className="menu-right">
        <a className="link" href="/home">
          Home
        </a>

        <button className="link button" onClick={openModal}>
          Create Event
        </button>
        <a className="cta-button" href="/myevents">
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
