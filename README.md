# 🚀 Node.js Express MySQL API

A **RESTful API** for **User Management** and **User-Based Contacts**, built using **Node.js, Express, Sequelize, MySQL**, and **JWT Authentication**.

---

## 🌟 Features
- ✅ **User Management** (Register, Login, Profile)
- ✅ **JWT Authentication** (Login and Secure Endpoints)
- ✅ **Authorization** (Users can only manage their own contacts)
- ✅ **User-Based Contacts API** (Users can create, update, delete, and view only their contacts)
- ✅ **Sequelize ORM** (For MySQL database interaction)
- ✅ **bcrypt Password Hashing** (For secure authentication)
- ✅ **Environment Variables Support** using `.env`

---

## 📦 Installation

1️⃣ **Clone the repository**
```sh
git clone https://github.com/manikandan-1704/Nodejs-express-user-management-api.git
```
2️⃣ Install dependencies
```sh
npm install
```
3️⃣ Set up environment variables
```sh
# Server Configuration
PORT=5001
# JWT Secret Key
JWT_SECRET=your_jwt_secret
```
4️⃣ Start the Server
```sh
npm start
```
## 🔒 Authentication & Authorization
- JWT (JSON Web Token) is used for authentication.
- Users must be logged in to access protected routes.
- Each user can only manage their own contacts.

## 🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📜 License
MIT License © 2025 Manikandan
