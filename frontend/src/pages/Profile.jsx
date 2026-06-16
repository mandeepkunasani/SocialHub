import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./Profile.css";

function Profile() {

  const [loading, setLoading] =
    useState(false);

  const user = JSON.parse(
  localStorage.getItem("user")
);

const [postCount, setPostCount] =
  useState(0);

useEffect(() => {

  fetchPostCount();

}, []);

const fetchPostCount = async () => {

  try {

    const res = await axios.get(
      `http://localhost:8000/api/posts/count/${user._id}`
    );

    setPostCount(res.data.count);

  } catch (err) {

    console.log(err);

  }
};

  const uploadImage = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    try {

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "image",
        file
      );

      // Upload Image

      const uploadRes =
        await axios.post(
          "http://localhost:8000/api/upload",
          formData
        );

      const imageUrl =
        uploadRes.data.imageUrl;

      // Save Image URL

      const updateRes =
        await axios.put(
          "http://localhost:8000/api/auth/update-profile-pic",
          {
            userId: user._id,
            profilePic: imageUrl,
          }
        );

      localStorage.setItem(
        "user",
        JSON.stringify(
          updateRes.data.user
        )
      );

      alert(
        "Profile Picture Updated"
      );

      window.location.reload();

    } catch (err) {

      console.log(err);

      alert(
        "Upload Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
      <Navbar />

      <div className="profile-container">

        <div className="profile-card">

          {user?.profilePic ? (

            <img
              src={user.profilePic}
              alt="Profile"
              className="profile-image"
            />

          ) : (

            <div className="profile-avatar">
              {user?.username
                ?.charAt(0)
                .toUpperCase()}
            </div>

          )}

          <h1>
            {user?.username}
          </h1>

          <p>
            {user?.email}
          </p>

          <div className="profile-stats">

            <div>
              <h2>{postCount}</h2>
              <span>Posts</span>
            </div>

            <div>
  <h2>
    {user?.followers?.length || 0}
  </h2>
  <span>Followers</span>
</div>

<div>
  <h2>
    {user?.following?.length || 0}
  </h2>
  <span>Following</span>
</div>

          </div>

          <label
            className="edit-btn"
          >
            {
              loading
                ? "Uploading..."
                : "Upload Photo"
            }

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={
                uploadImage
              }
            />
          </label>

        </div>

      </div>
    </>
  );
}

export default Profile;