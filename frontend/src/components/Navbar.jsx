import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };

  return (
    <nav className="navbar">

      <div className="logo">
        🚀 SocialHub
      </div>

      <div className="nav-links">

        <Link to="/home">
          🏠 Home
        </Link>

        <Link to="/create-post">
          ➕ Create
        </Link>

        <Link to="/feed">
          📰 Feed
        </Link>

        <Link to="/users">
          👥 Users
        </Link>

        <Link to="/profile">
          👤 Profile
        </Link>

        {user?.profilePic && (
          <img
            src={user.profilePic}
            alt=""
            className="nav-profile"
          />
        )}

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;