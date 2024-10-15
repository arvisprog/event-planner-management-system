import "../styles/Navigation.css";
import Logo from "../images/logo.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/actions";

function NavigationBar({ name }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
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
        <a className="link" href="#">
          Create Event
        </a>
        <a className="cta-button" href="#">
          Hello, {name}
        </a>
        <button className="link logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default NavigationBar;
