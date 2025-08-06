# 🎓 Online Course App (MERN + TypeScript)

A full-stack online course platform built with **MERN Stack (MongoDB, Express, React, Node.js)**. The app provides two main modules: **Admin** and **User**.

## 🔗 Live Demo
[https://online-courseapp.vercel.app/](#) 

---

## 📁 Modules

### 👤 User Module
- User Registration & Login
- Browse & Enroll in Courses
- Watch Course Videos
- Save to Watch Later

  ---
### 🛠️ Admin Module
- Admin Authentication
- Add/Edit/Delete Courses
- Upload Course Videos
- Manage Registered Users
- Dashboard with analytics

---


### ⚙️ Tech Stack

### Frontend:
- React.js
- Redux Toolkit (if used)
- TypeScript
- Axios
- React Router
- Bootstrap / CSS

### Backend:
- Node.js
- Express.js
- MongoDB with Monogdb(driver)

---

## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- MongoDB installed locally or MongoDB Atlas
- Git

### 📦 Installation

1. **Clone the repo**
   ```bash
      https://github.com/babloo-tech/online-courseapp.git
      cd online-courseapp
   
2. **Install backend dependencies**
    - cd server
    - npm install

 
3. **Install backend dependencies**
    - cd ../client
    - npm install

4. **Set up environment variables**
    - **Create .env files in both server/ and client/ folders:**
      **Server .env**
     - PORT=5000
     - MONGODB_URL=your_mongodb_connection

      **Client .env**
     - BACKEND_URL=http://localhost:5050
5. **Run the app**
 - **Backend**
      - cd server
      - npm run server
 - **Frontend**
      - cd client
      - npm run dev

### 🧪 Future Improvements
      - Payment Integration (Razorpay/Stripe)
      - Course Review & Rating System
      - Admin Role Management
      - Notification System


   



