import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthInput from "../input";
import AuthPasswordInput from "../passinput";
import AuthHeading from "./authHeading";
import AuthWrapper from "./authwrapper";
import AuthMessage from "./message";
import AuthButton from "./submitButton";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", {
        email,
        password,
      });

      if (res.status === 200) {
        setSuccess("Login successful! Redirecting...");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user._id);
        localStorage.setItem("username", res.data.user.username);
        localStorage.setItem("profilePicture", res.data.user.profilePicture);
        setTimeout(() => (window.location.href = "/"), 1500);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <AuthWrapper>
      <AuthHeading title="Login" />
      {error && <AuthMessage message={error} type="error" />}
      {success && <AuthMessage message={success} type="success" />}

      <form onSubmit={handleSubmit}>
        <AuthInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <AuthPasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showPassword={showPassword}
          togglePassword={() => setShowPassword(!showPassword)}
        />
        <AuthButton text="Log In" />
      </form>

      <p style={{ marginTop: "1rem", fontSize: "0.95rem" }}>
        Don’t have an account?{" "}
        <Link
          to="/signup"
          style={{
            background: "linear-gradient(to right, #ff7e5f, #feb47b)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Sign up
        </Link>
      </p>
    </AuthWrapper>
  );
};

export default LoginPage;
