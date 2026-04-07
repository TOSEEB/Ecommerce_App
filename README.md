# 🛍️ ShopHub - Full Stack E-Commerce Platform

A modern full-stack e-commerce application built with **React.js** and **Node.js/Express**, featuring authentication, shopping cart, payment integration, and admin dashboard.

---

## 🚀 Live Demo

🔗 Frontend: https://ecommerce-app-five-lyart.vercel.app
🔗 Backend API: https://ecommerce-app-3b6r.onrender.com

---

## 📸 Screenshots

> Add screenshots in a `/screenshots` folder and link them here

* Home Page
* Products Page
* Product Details
* Cart & Checkout
* Admin Dashboard

Example:

```
screenshots/
├── home.png
├── products.png
├── cart.png
├── admin.png
```

---

## ⚡ Features

* 🔐 JWT Authentication (Login/Register)
* 🛒 Shopping Cart (Add/Remove/Update items)
* 💳 Razorpay Payment Integration (Test Mode)
* 📦 Order Management System
* 👨‍💼 Admin Panel (CRUD Products)
* 🔎 Search & Filter Products
* 📱 Fully Responsive Design

---

## 🛠️ Tech Stack

**Frontend**

* React.js (Vite)
* Tailwind CSS
* React Router
* Axios

**Backend**

* Node.js
* Express.js
* JWT Authentication
* Razorpay Integration

**Tools**

* Git & GitHub
* Postman
* Vercel (Frontend)
* Render (Backend)

---

## 📦 Run Locally (Step-by-Step)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### 2️⃣ Install dependencies

#### Frontend

```bash
npm install
```

#### Backend

```bash
cd server
npm install
cd ..
```

---

### 3️⃣ Setup Environment Variables

#### Backend (`server/.env`)

```env
PORT=5000
JWT_SECRET=your_secret_key

RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
```

#### Frontend (`.env`)

```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_key
```

---

### 4️⃣ Run the application

#### Start backend

```bash
cd server
npm run dev
```

#### Start frontend (new terminal)

```bash
npm run dev
```

---

### 5️⃣ Open in browser

👉 http://localhost:5173

---

## 🔑 Demo Credentials

**Admin Login**

* Email: [admin@example.com](mailto:admin@example.com)
* Password: admin123

---

## 📡 API Endpoints (Sample)

* `GET /api/products` → Get all products
* `POST /api/auth/login` → Login user
* `POST /api/orders` → Create order

---

## 🎯 Key Highlights

* Built complete full-stack system (Frontend + Backend)
* Implemented secure authentication & authorization (JWT + RBAC)
* Integrated Razorpay payment gateway
* Designed scalable REST APIs
* Created responsive UI with modern UX practices

---

## 🔮 Future Improvements

* Add MongoDB/PostgreSQL database
* Product reviews & ratings
* Wishlist feature
* Dark mode

---

## 👤 Author

**Toseeb Beg**
Full Stack Developer

---

⭐ If you like this project, feel free to star the repo!
