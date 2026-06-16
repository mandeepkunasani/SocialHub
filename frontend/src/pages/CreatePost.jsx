import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./CreatePost.css";

function CreatePost() {

  const [content, setContent] =
    useState("");

  const [image, setImage] =
    useState(null);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      let imageUrl = "";

      if (image) {

        const formData =
          new FormData();

        formData.append(
          "image",
          image
        );

        const uploadRes =
          await axios.post(
            "http://localhost:8000/api/upload",
            formData
          );

        imageUrl =
          uploadRes.data.imageUrl;
      }

      const res =
        await axios.post(
          "http://localhost:8000/api/posts/create",
          {
            userId: user._id,
            username: user.username,
            content,
            image: imageUrl,
          }
        );

      alert(res.data.message);

      setContent("");
      setImage(null);

    } catch (err) {

      console.log(err);

      alert(
        "Post Creation Failed"
      );

    }
  };

  return (
    <>
      <Navbar />

      <div className="feed-container create-page">

        <div className="create-post-card">

          <h2>
            Create New Post 🚀
          </h2>

          <form
            onSubmit={
              handleSubmit
            }
          >

            <textarea
              placeholder="What's on your mind today?"
              value={content}
              onChange={(e) =>
                setContent(
                  e.target.value
                )
              }
            />

            <br />
            <br />

            <label className="image-upload-box">

  <input
    type="file"
    accept="image/*"
    hidden
    onChange={(e) =>
      setImage(e.target.files[0])
    }
  />

  {image ? (
    <img
      src={URL.createObjectURL(image)}
      alt="Preview"
      className="preview-image"
    />
  ) : (
    <div className="upload-placeholder">
      📷
      <p>Click to upload an image</p>
    </div>
  )}

</label>





            <br />

            <button
              className="publish-btn"
              type="submit"
            >
              🚀 Publish Post
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default CreatePost;