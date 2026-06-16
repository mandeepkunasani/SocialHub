import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./../Auth.css";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        user
      );
      console.log(res.data);
      console.log("TOKEN =", res.data.token);

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/home");

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>SocialHub 🚀</h1>
        <h2>Welcome Back</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">
            Login
          </button>
        </form>

        <p>
          Don't have an account?
          <span onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;