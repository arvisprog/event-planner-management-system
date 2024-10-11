import "../styles/App.css";

function Register() {
  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form id="authForm">
        <div className="input-group">
          <input type="text" id="name" placeholder="Name" required />
        </div>
        <div className="input-group">
          <input type="email" id="email" placeholder="Email" required />
        </div>
        <div className="input-group">
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="actions">
          <button type="submit">Register</button>
        </div>
      </form>
      <div className="links">
        <a href="/">Already have an account? Log in</a>
      </div>
    </div>
  );
}

export default Register;
