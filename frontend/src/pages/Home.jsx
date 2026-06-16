import React from "react";
import Navbar from "../components/Navbar";
import "./Home2.css";
import { useNavigate } from "react-router-dom";

function Home() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="home-container">

        <div className="home-card">

          {user.profilePic ? (

            <img
              src={user.profilePic}
              alt=""
              className="home-avatar"
            />

          ) : (

            <div className="home-avatar-placeholder">
              {user.username
                .charAt(0)
                .toUpperCase()}
            </div>

          )}

          <h1>
            Welcome Back 👋
          </h1>

          <h2>
            @{user.username}
          </h2>

          <p>
            {user.email}
          </p>

          {/* Stats Section */}

          <div className="stats-container">

            <div className="stat-box">

              <h3>
                {user.posts?.length || 0}
              </h3>

              <span>
                Posts
              </span>

            </div>

            <div className="stat-box">

              <h3>
                {user.followers?.length || 0}
              </h3>

              <span>
                Followers
              </span>

            </div>

            <div className="stat-box">

              <h3>
                {user.following?.length || 0}
              </h3>

              <span>
                Following
              </span>

            </div>

          </div>

          <div className="home-buttons">

            <button
              onClick={() =>
                navigate("/create-post")
              }
            >
              ➕ Create Post
            </button>

            <button
              onClick={() =>
                navigate("/feed")
              }
            >
              📰 Feed
            </button>

            <button
              onClick={() =>
                navigate("/users")
              }
            >
              👥 Users
            </button>

            <button
              onClick={() =>
                navigate("/profile")
              }
            >
              👤 Profile
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default Home;