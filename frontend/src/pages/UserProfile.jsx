import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./Profile.css";

function UserProfile() {

  const { id } = useParams();

  const [user, setUser] =
    useState(null);

  const [posts, setPosts] =
    useState([]);

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, []);

  const fetchUser = async () => {

    const res =
      await axios.get(
        `http://localhost:8000/api/auth/user/${id}`
      );

    setUser(res.data.user);
  };

  const fetchPosts = async () => {

    const res =
      await axios.get(
        "http://localhost:8000/api/posts"
      );

    const userPosts =
      res.data.posts.filter(
        (post) =>
          post.userId === id
      );

    setPosts(userPosts);
  };

  if (!user) return <h1>Loading...</h1>;

  return (
    <>
      <Navbar />

      <div className="profile-container">

        <div className="profile-card">

          {user.profilePic ? (
            <img
              src={user.profilePic}
              alt=""
              className="profile-image"
            />
          ) : (
            <div className="profile-avatar">
              {user.username
                .charAt(0)
                .toUpperCase()}
            </div>
          )}

          <h1>
            {user.username}
          </h1>

          <p>
            {user.email}
          </p>

          <div className="profile-stats">

            <div>
              <h2>
                {posts.length}
              </h2>
              <span>Posts</span>
            </div>

            <div>
              <h2>
                {
                  user.followers
                    ?.length || 0
                }
              </h2>
              <span>
                Followers
              </span>
            </div>

            <div>
              <h2>
                {
                  user.following
                    ?.length || 0
                }
              </h2>
              <span>
                Following
              </span>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default UserProfile;