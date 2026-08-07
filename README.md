# 📚 Library Book Lending System

A full-stack MERN application for managing a library. It allows librarians to manage books, members, issue books, return books, and track lending records through a secure authentication system.

## 🚀 Features

### Authentication
- Admin Login
- JWT Authentication
- Protected Routes

### Book Management
- Add New Book
- View All Books
- Edit Book Details
- Delete Book
- Search Books

### Member Management
- Add Members
- View Members
- Edit Member Information
- Delete Members

### Book Lending
- Issue Books to Members
- Return Issued Books
- Automatically Update Book Availability

### Dashboard
- Total Books
- Total Members
- Issued Books
- Returned Books

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router
- Axios
- Bootstrap

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

---

## 📁 Project Structure

Library-Book-Lending-System
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── src/
│   ├── .env.example
│   └── package.json
│
└── README.md
---

## ⚙️ Installation

### Clone Repository

git clone https://github.com/yourusername/Library-Book-Lending-System.git
### Backend

cd server
npm install
Create a .env file:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Run backend:

npm run dev
### Frontend

cd client
npm install
npm run dev
Frontend runs on:

http://localhost:5173
Backend runs on:

http://localhost:5000
---

## 🔐 Environment Variables

PORT
MONGODB_URI
JWT_SECRET
---

## 📌 Future Improvements

- Fine Calculation
- Email Notifications
- Book Reservation
- User Roles
- Reports & Analytics
- Barcode Scanner
- Responsive Dashboard

---

## 👨‍💻 Author

M. Mohamed Mufassal

GitHub:
https://github.com/Mohamedmufassal

---

## 📄 License

This project is developed for learning and portfolio purposes.