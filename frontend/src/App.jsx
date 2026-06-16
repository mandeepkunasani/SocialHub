import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import UserProfile from "./pages/UserProfile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route
  path="/user/:id"
  element={<UserProfile />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;