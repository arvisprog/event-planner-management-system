import "../styles/Navigation.css";
import Logo from "../images/logo.png";

function NavigationBar({ name }) {
  return (
    <nav class="navbar">
      <div class="logo">
        <img src={Logo} alt="Logo" />
      </div>

      <div class="menu-right">
        <a href="#">Home</a>
        <a href="#">Create Event</a>
        <a href="#" class="cta-button">
          Hello, {name}
        </a>
        <a href="#">Logout</a>
      </div>
    </nav>
  );
}

export default NavigationBar;
