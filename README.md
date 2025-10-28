# 🚀 MERN Stack CRUD App with JWT Authentication

A full-stack application built using **MongoDB**, **Express.js**, **React.js**, and **Node.js**, featuring **JWT-based authentication**, **CRUD operations**, and **secure user management**.

---

## ⚙️ Tech Stack

### 🖥 Frontend
- React.js (Vite)
- Axios for API requests  
- React Router DOM for navigation  
- React Toastify for notifications  
- Tailwind CSS for styling  

### 🧠 Backend
- Node.js + Express.js  
- MongoDB with Mongoose  
- JWT Authentication  
- bcrypt.js for password hashing  
- dotenv for environment variables  
- cookie-parser for token management  
- CORS for cross-origin requests  

---

## 🔐 Authentication Features
- Secure user signup and login  
- Passwords are hashed before saving  
- JWT tokens stored in cookies  
- Protected backend routes  
- Auto redirect after login/logout  

---

## 🧾 API Endpoints

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| POST   | `/signup`          | Register new user        |
| POST   | `/login`           | Login user and get token |
| GET    | `/currentuser`     | Get logged-in user data  |
| GET    | `/logout`          | Logout user              |
| POST   | `/createtodo`      | Create new Todo          |
| GET    | `/gettodo`         | Fetch all Todos          |
| POST   | `/update/:id`      | Update a Todo            |
| DELETE | `/deletetodo/:id`  | Delete a Todo            |

---

## 🛠️ Installation Guide

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/mern-crud-app.git
cd mern-crud-app
