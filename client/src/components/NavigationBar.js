import "../styles/Navigation.css";
import Logo from "../images/logo.png";

function NavigationBar({ name }) {
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
        <a className="link" href="#">
          Logout
        </a>
      </div>
    </nav>
  );
}

export default NavigationBar;
