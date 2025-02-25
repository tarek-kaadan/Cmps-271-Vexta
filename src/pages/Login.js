import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <h2>Login to Vexta</h2>
      <form action="dashboard.html" method="POST">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" placeholder="Enter your username" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" required />

        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
