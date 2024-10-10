import "../styles/App.css";

function Login() {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form id="loginForm">
        <div className="input-group">
          <input type="text" id="username" placeholder="Username" required />
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
          <button type="submit">Login</button>
        </div>
      </form>
      <div className="links">
        <a href="/">Don't have an account? Register</a>
      </div>
    </div>
  );
}

export default Login;
