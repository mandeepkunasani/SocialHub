import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./../Auth.css";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
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
        "http://localhost:8000/api/auth/register",
        user
      );

      console.log(res.data);

      alert("User Registered Successfully");

      navigate("/login");

    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

 return (
  <div className="auth-container">
    <div className="auth-card">
      <h1>SocialHub</h1>
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button type="submit">
          Register
        </button>
      </form>

      <p>
        Already have an account?
        <span onClick={() => navigate("/login")}>
          Login
        </span>
      </p>
    </div>
  </div>
);
}

export default Register;