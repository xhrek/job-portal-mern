# 🚀 HireHub - MERN Job Portal

A full-stack Job Portal built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. The platform enables candidates to search and apply for jobs, recruiters to manage companies and job postings, and administrators to monitor platform activities.

---

## 📌 Project Overview

HireHub is a modern recruitment platform that connects job seekers with recruiters. It provides secure authentication, role-based access control, company management, job posting, application tracking, and personalized dashboards.

---

## ✨ Features

### 👨‍💼 Candidate
- User Registration & Login
- JWT Authentication
- Browse Available Jobs
- Search Jobs
- View Job Details
- Apply for Jobs
- Save Jobs
- View Applied Jobs
- Edit Profile
- Candidate Dashboard

### 🏢 Recruiter
- Secure Login
- Recruiter Dashboard
- Create Companies
- Manage Companies
- Post New Jobs
- Edit/Delete Jobs
- View Applicants
- Manage Applications

### 👨‍💻 Admin
- Admin Dashboard
- User Management
- Platform Monitoring

---

# 🛠 Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Vite

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt.js
- Multer
- CORS

---

# 📂 Folder Structure

```
Job Portal
│
├── Backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── server.js
│   └── package.json
│
├── Frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   └── api
│   └── package.json
│
└── README.md
```

---

# 🔐 Authentication

- JWT Authentication
- Protected Routes
- Role-Based Access Control
- Password Encryption using bcrypt

---

# 🗄 Database

MongoDB Atlas

Collections:

- Users
- Companies
- Jobs
- Applications
- Saved Jobs

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/xhrek/job-portal-mern.git
```

---

## Backend

```bash
cd Backend/backend
npm install
npm run dev
```

---

## Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

# 🌐 Environment Variables

Create a `.env` file inside the backend folder.

```
MONGO_URL=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
PORT=5000
```

⚠️ Never upload your `.env` file to GitHub.

---

# 📸 Screenshots

> Add screenshots of:

- Home Page
- Login
- Register
- Candidate Dashboard
- Recruiter Dashboard
- Job Details
- Create Job
- My Applications

---

# 📈 Future Improvements

- Email Notifications
- Resume Upload
- Interview Scheduling
- Chat System
- AI Resume Matching
- Payment Integration
- Google Authentication
- Company Verification

---

# 🎯 Learning Outcomes

This project helped me understand:

- Full Stack MERN Development
- REST API Development
- MongoDB Database Design
- JWT Authentication
- React Context API
- CRUD Operations
- Role-Based Authorization
- File Uploads
- API Integration
- Git & GitHub Workflow

---

# 👨‍💻 Author

**Shreekumar**

GitHub:
https://github.com/xhrek

---

# ⭐ If you like this project

Give this repository a ⭐ on GitHub.