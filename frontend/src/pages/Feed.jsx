import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./Home.css";

function Feed() {

  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] =
    useState({});

  const [editingPostId, setEditingPostId] =
    useState(null);

  const [editContent, setEditContent] =
    useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {

      const res = await axios.get(
        "http://localhost:8000/api/posts"
      );

      console.log(res.data.posts);

      setPosts(res.data.posts);

    } catch (err) {

      console.log(err);

    }
  };

  const likePost = async (id) => {
    try {

      await axios.put(
        `http://localhost:8000/api/posts/like/${id}`
      );

      fetchPosts();

    } catch (err) {

      console.log(err);

    }
  };

  const addComment = async (postId) => {

    try {

      if (!commentText[postId]) return;

      await axios.put(
        `http://localhost:8000/api/posts/comment/${postId}`,
        {
          username: user.username,
          text: commentText[postId],
        }
      );

      setCommentText({
        ...commentText,
        [postId]: "",
      });

      fetchPosts();

    } catch (err) {

      console.log(err);

    }
  };

  const deletePost = async (postId) => {

    try {

      await axios.delete(
        `http://localhost:8000/api/posts/${postId}`
      );

      alert("Post Deleted");

      fetchPosts();

    } catch (err) {

      console.log(err);

      alert("Delete Failed");

    }
  };

  const editPost = async (postId) => {

    try {

      await axios.put(
        `http://localhost:8000/api/posts/edit/${postId}`,
        {
          content: editContent,
        }
      );

      setEditingPostId(null);
      setEditContent("");

      fetchPosts();

    } catch (err) {

      console.log(err);

    }
  };

  return (
    <>
      <Navbar />

      <div className="feed-container">

        <h1 className="feed-title">
          Social Feed 🚀
        </h1>

        {posts.map((post) => (

          <div
            key={post._id}
            className="post-card"
          >

            <div className="post-user">
              @{post.username}
            </div>

            {editingPostId === post._id ? (

              <>
                <input
                  className="comment-box"
                  type="text"
                  value={editContent}
                  onChange={(e) =>
                    setEditContent(
                      e.target.value
                    )
                  }
                />

                <button
                  onClick={() =>
                    editPost(post._id)
                  }
                >
                  Save
                </button>
              </>

            ) : (

              <>
                <div className="post-content">
                  {post.content}
                </div>

                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="post-image"
                  />
                )}
              </>

            )}

            <small>
              {new Date(
                post.createdAt
              ).toLocaleString()}
            </small>

            <div className="post-actions">

              <button
                className="like-btn"
                onClick={() =>
                  likePost(post._id)
                }
              >
                ❤️ Like ({post.likes || 0})
              </button>

              {user._id === post.userId && (
                <>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingPostId(
                        post._id
                      );
                      setEditContent(
                        post.content
                      );
                    }}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deletePost(post._id)
                    }
                  >
                    🗑 Delete
                  </button>
                </>
              )}

            </div>

            <br />

            <input
              className="comment-box"
              type="text"
              placeholder="Write a comment..."
              value={
                commentText[post._id] || ""
              }
              onChange={(e) =>
                setCommentText({
                  ...commentText,
                  [post._id]:
                    e.target.value,
                })
              }
            />

            <button
              className="comment-btn"
              onClick={() =>
                addComment(post._id)
              }
            >
              💬 Comment
            </button>

            <br />
            <br />

            {post.comments?.map(
              (comment, index) => (

                <div
                  key={index}
                  className="comment-card"
                >
                  <b>
                    @{comment.username}
                  </b>

                  : {comment.text}
                </div>

              )
            )}

          </div>

        ))}
      </div>
    </>
  );
}

export default Feed;