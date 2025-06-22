# 💸 Payz – A Modern Digital Wallet App

**Payz** is a full-stack MERN-based wallet and payment application that allows users to securely send and receive money, manage balances, and view detailed transaction histories. Inspired by real-world UPI systems like Paytm, the app provides fast and secure money transfers between users in a sleek, user-friendly interface.

---

## 🚀 Features

- 🔐 Secure User Authentication (JWT + Refresh Tokens)
- 💼 Personal Wallet System (Auto-created on Signup)
- 💸 Send Money Between Users in Real-Time
- ➕ Add Money to Wallet
- 🔻 Withdraw Money to Linked Accounts
- 📜 Complete Transaction History
- 🔁 Unique Reference ID per Transaction
- 📊 Wallet Balance Updates on Every Transaction
- ✅ RESTful API architecture
- 🧪 Zod validation for input safety (where implemented)

---

## 🧱 Tech Stack

| Layer         | Tech                              |
|---------------|-----------------------------------|
| Frontend      | React.js *(Optional UI)*          |
| Backend       | Node.js, Express.js               |
| Database      | MongoDB with Mongoose             |
| Auth & Hashing| JWT, Bcrypt                       |
| Validation    | Zod *(ongoing implementation)*    |
| Dev Tools     | Nodemon, Dotenv, Git              |

---

## 🗂️ Folder Structure
its under build
```bash
/payz
├── controllers/          # Business logic
├── models/               # Mongoose schemas
├── routes/               # All API endpoints
├── middlewares/          # Auth and error handlers
├── config/               # DB connection, env setup
├── utils/                # Helper functions
├── .env
├── .gitignore
├── package.json
└── server.js
