
import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function register(e) {
    e.preventDefault();

    localStorage.setItem(
      "user",
      JSON.stringify({ name, email, password })
    );

    setMessage("Registration successful! Please login.");
    setPage("login");
  }

  function login(e) {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (user && user.email === email && user.password === password) {
      setName(user.name);
      setMessage("");
      setPage("dashboard");
    } else {
      setMessage("Invalid email or password!");
    }
  }

  return (
    <div>
      <header>
        <h2>My React Application</h2>
      </header>

      <div className="container">
        {page === "home" && (
          <div className="card">
            <h1>Welcome</h1>
            <p>Please Register or Login</p>
            <button onClick={() => { setMessage(""); setPage("register"); }}>
              Register
            </button>
            <button onClick={() => { setMessage(""); setPage("login"); }}>
              Login
            </button>
          </div>
        )}

        {page === "register" && (
          <div className="card">
            <h1>Register Form</h1>
            <form onSubmit={register}>
              <input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
              <button type="submit">Register</button>
            </form>
            <p>
              Already registered?{" "}
              <span onClick={() => { setMessage(""); setPage("login"); }}>
                Login
              </span>
            </p>
          </div>
        )}

        {page === "login" && (
          <div className="card">
            <h1>Login Form</h1>
            <form onSubmit={login}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
            </form>
            <p>
              New user?{" "}
              <span onClick={() => { setMessage(""); setPage("register"); }}>
                Register
              </span>
            </p>
          </div>
        )}

        {page === "dashboard" && (
          <div className="card">
            <h1>Dashboard</h1>
            <p>Welcome, {name}!</p>
            <button onClick={() => { setMessage(""); setPage("register"); }}>
              Register
            </button>
            <button onClick={() => { setMessage(""); setPage("login"); }}>
              Login
            </button>
          </div>
        )}

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default App;
