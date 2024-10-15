import "../styles/Navigation.css";
import Logo from "../images/logo.png";

function NavigationBar({}) {
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/home">
          <img src={Logo} alt="Logo" />{" "}
        </a>
      </div>

      <div className="menu-right">
        <a className="link" href="#">
          Home
        </a>
        <a className="link" href="#">
          Create Event
        </a>
        <a className="cta-button" href="#">
          Hello, {}
        </a>
        <a className="link" href="#">
          Logout
        </a>
      </div>
    </nav>
  );
}

export default NavigationBar;
