import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showHint, setShowHint] = useState(false);

  const roleCredentials = {
    Admin: { username: "admin", password: "admin" },
    Editor: { username: "editor", password: "editor" },
    Viewer: { username: "viewer", password: "viewer" },
  };

  const handleLogin = () => {
    const matchedRole = Object.keys(roleCredentials).find(
      (role) =>
        roleCredentials[role].username === username &&
        roleCredentials[role].password === password
    );

    if (matchedRole) {
      localStorage.setItem("userRole", matchedRole);
      window.location.href = "/dashboard";
    } else {
      alert("Invalid credentials. Please try again");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-info text-center">
      <h1 className="mb-4 display-3 text-light fw-bold">Employee Management App</h1>
      <p className="mb-4 lead text-light">
        Simplify the way you manage employees, roles, and permissions with ease.
      </p>
        
      <button
        className="btn btn-sm btn-warning position-fixed"
        style={{ top: "20px", right: "20px" }}
        onClick={() => setShowHint(!showHint)} 
      >
        {showHint ? "Hide Credentials" : "Click here for Login Credentials"}
      </button>

      {showHint && (
        <div
          className="mb-4 p-3 position-absolute"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            width: "400px",
            top: "70px",
            right: "20px",
          }}
        >
          <h5 className="mb-3 text-dark">Login Credentials:</h5>
          <ul className="text-start text-dark">
            <li>
              <strong>Admin:</strong> Username: <code>admin</code>, Password: <code>admin</code>
            </li>
            <li>
              <strong>Editor:</strong> Username: <code>editor</code>, Password: <code>editor</code>
            </li>
            <li>
              <strong>Viewer:</strong> Username: <code>viewer</code>, Password: <code>viewer</code>
            </li>
          </ul>
        </div>
      )}


        <div
          className="p-4 mb-3"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            width: "300px",
          }}
        >
          <div className="mb-2">
            <input
              type="text"
              placeholder="Username"
              className="form-control mb-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              placeholder="Password"
              className="form-control mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-lg" style={{ backgroundColor: "orange" }} onClick={handleLogin} >
            LOGIN
          </button>
    </div>
    </div>
  );
};

export default LandingPage;