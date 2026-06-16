import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./Users.css";

function Users() {

  const [users, setUsers] =
    useState([]);

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8000/allusers"
      );

      const filteredUsers =
        res.data.filter(
          (user) =>
            user._id !== currentUser._id
        );

      setUsers(filteredUsers);

    } catch (err) {

      console.log(err);

    }
  };

  const followUser = async (
    targetUserId
  ) => {

    try {

      await axios.put(
        "http://localhost:8000/api/auth/follow",
        {
          currentUserId:
            currentUser._id,
          targetUserId,
        }
      );

      const updatedUser =
        await axios.get(
          `http://localhost:8000/api/auth/user/${currentUser._id}`
        );

      localStorage.setItem(
        "user",
        JSON.stringify(
          updatedUser.data.user
        )
      );

      alert("User Followed");

      fetchUsers();

    } catch (err) {

      console.log(err);

    }
  };

  const unfollowUser = async (
    targetUserId
  ) => {

    try {

      await axios.put(
        "http://localhost:8000/api/auth/unfollow",
        {
          currentUserId:
            currentUser._id,
          targetUserId,
        }
      );

      const updatedUser =
        await axios.get(
          `http://localhost:8000/api/auth/user/${currentUser._id}`
        );

      localStorage.setItem(
        "user",
        JSON.stringify(
          updatedUser.data.user
        )
      );

      alert("User Unfollowed");

      fetchUsers();

    } catch (err) {

      console.log(err);

    }
  };

  return (
    <>
      <Navbar />

      <div className="users-container">

        <h1 className="users-title">
          Users 👥
        </h1>

        <div className="users-grid">

          {users.map((user) => {

            const isFollowing =
              user.followers?.includes(
                currentUser._id
              );

            return (

              <div
                key={user._id}
                className="user-card"
              >

                {user.profilePic ? (

                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="user-image"
                  />

                ) : (

                  <div className="user-avatar">
                    {user.username
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                )}

                <h2 className="user-name">
                  {user.username}
                </h2>

                <p className="user-email">
                  {user.email}
                </p>

                <p className="followers-count">
                  Followers:{" "}
                  {user.followers?.length || 0}
                </p>

                {isFollowing ? (

                  <button
                    className="unfollow-btn"
                    onClick={() =>
                      unfollowUser(
                        user._id
                      )
                    }
                  >
                    Unfollow
                  </button>

                ) : (

                  <button
                    className="follow-btn"
                    onClick={() =>
                      followUser(
                        user._id
                      )
                    }
                  >
                    Follow
                  </button>

                )}

                <br />

                <button
                  className="view-btn"
                  onClick={() =>
                    navigate(
                      `/user/${user._id}`
                    )
                  }
                >
                  View Profile
                </button>

              </div>

            );
          })}

        </div>

      </div>
    </>
  );
}

export default Users;