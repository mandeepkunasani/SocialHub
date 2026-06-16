# 🚀 SocialHub

A full-stack social media web application built using the MERN Stack.

Users can create posts, upload images, like posts, comment on posts, follow/unfollow users, manage profiles, and interact with other users in a modern social networking environment.

---

## 📌 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Secure Password Hashing using bcrypt

### 📝 Posts
- Create Posts
- Upload Images
- Edit Posts
- Delete Posts
- View Social Feed

### ❤️ Engagement
- Like Posts
- Comment on Posts
- Real-time Feed Updates

### 👥 User System
- View All Users
- Follow Users
- Unfollow Users
- View User Profiles

### 👤 Profile
- Upload Profile Picture
- View Followers Count
- View Following Count
- View Total Posts

### 🎨 UI
- Modern Responsive Design
- Clean Navigation Bar
- Beautiful Profile Dashboard
- Interactive Feed Cards

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS3

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- JWT
- bcryptjs

### File Uploads
- Multer

---

## 📂 Project Structure

SocialHub/
│
├── frontend/
│ ├── src/
│ ├── pages/
│ ├── components/
│ └── App.jsx
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── uploads/
│ └── server.js
│
└── README.md

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/SocialHub.git
```

### Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
```

Run Backend

```bash
npm start
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 🌐 API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Posts

```http
GET    /api/posts
POST   /api/posts/create
PUT    /api/posts/edit/:id
DELETE /api/posts/:id
PUT    /api/posts/like/:id
PUT    /api/posts/comment/:id
```

### Users

```http
PUT /api/auth/follow
PUT /api/auth/unfollow
GET /api/auth/user/:id
```

### Uploads

```http
POST /api/upload
```

---

## 🚀 Future Improvements

- Direct Messaging
- Stories Feature
- Notifications
- Dark Mode
- Reels / Short Videos
- Search Users
- Saved Posts
- Admin Dashboard

---

## 👨‍💻 Author

Mandeep Kunasani

Built with ❤️ using the MERN Stack.