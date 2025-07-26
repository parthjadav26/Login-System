
# 🔐 Node.js Authentication API (PostgreSQL)

A complete backend authentication system using **Express.js**, **JWT**, **Passport.js** for Google OAuth, and **PostgreSQL** as the database.

---

## 📁 Folder Structure

```
├── controllers/
│   └── AuthController.js           # Handles register, login, password reset
├── middlewares/
│   └── verifyToken.js              # Middleware to verify JWT tokens
├── routes/
│   ├── AuthRoute.js                # /signup, /login, /reset-password
│   ├── googleAuth.js               # Google OAuth2 routes
│   ├── protected.js                # JWT-protected dashboard route
│   └── verifyEmail.js              # Email verification logic (GET /verify-email)
├── services/
│   └── AuthService.js              # Business logic for authentication
├── utils/
│   ├── sendEmail.js                # General email utility using Nodemailer
│   └── sendResetEmail.js          # Handles sending reset password emails
├── db.js                           # PostgreSQL DB connection (e.g. using `pg` or `sequelize`)
├── index.js                        # Entry point of the application
├── passport.js                     # Google OAuth config (Passport.js)
├── .env                            # Environment variables
├── package.json                    # Project metadata
└── package-lock.json               # Dependency lock file
```

---

## ⚙️ Technologies Used

- **Node.js + Express.js**
- **PostgreSQL** (via `pg`)
- **JWT** for authentication
- **Passport.js** for Google OAuth
- **Nodemailer** for sending emails
- **dotenv** for environment configuration

---

## 📦 Install & Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/your-auth-backend.git
cd your-auth-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file with the following:

```env
PORT=5000
DATABASE_URL=postgres://user:password@host:port/dbname
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4. Start Server

```bash
npm start
```

---

## 🚀 API Endpoints

### 🔐 Auth (`routes/AuthRoute.js`)

| Method | Endpoint              | Description               |
|--------|-----------------------|---------------------------|
| POST   | `/signup`             | Register new user         |
| POST   | `/login`              | User login                |
| POST   | `/reset-password`     | Handle forgot password    |

---

### 🌐 Google OAuth (`routes/googleAuth.js`)

| Method | Endpoint                 | Description                  |
|--------|--------------------------|------------------------------|
| GET    | `/google`                | Initiate Google OAuth login  |
| GET    | `/google/callback`       | Google OAuth callback        |

---

### 🔒 Protected Route (`routes/protected.js`)

| Method | Endpoint         | Description                    |
|--------|------------------|--------------------------------|
| GET    | `/dashboard`     | Access dashboard (JWT needed)  |

---

### ✅ Email Verification (`routes/verifyEmail.js`)

| Method | Endpoint             | Description                |
|--------|----------------------|----------------------------|
| GET    | `/verify-email`      | Email verification handler |

---

## 🛠 How to Test

- Use **Postman** or **Thunder Client** to test API routes.
- Make sure PostgreSQL is running and `.env` is properly configured.

---

## 📫 Email Setup

Email features (verification and password reset) use **Nodemailer**. You may use Gmail (with app password), Outlook, or any SMTP provider.

---

## 📌 Notes

- All protected routes require `Authorization: Bearer <token>` header.
- Google OAuth uses Passport.js and returns a simple success message (can be extended to JWT handling).

---

## 📜 License

MIT License © 2025 Parth Jadav
