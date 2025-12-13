# 🚀 Free Deployment Guide - Get Your Project Live!

This guide will help you deploy your e-commerce platform **completely FREE** so you can showcase it to recruiters.

---

## 📋 What We'll Deploy

1. **Frontend** (React) → **Vercel** (Free)
2. **Backend** (Node.js) → **Railway** or **Render** (Free)
3. **Database** (MongoDB) → **MongoDB Atlas** (Free)

**Total Cost: $0** ✅

---

## 🗄️ Step 1: Setup MongoDB Atlas (Free Database)

### 1.1 Create Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with your email (Free account)
3. Choose **FREE** tier (M0 Sandbox)

### 1.2 Create Cluster
1. Click **"Build a Database"**
2. Select **FREE** (M0) tier
3. Choose cloud provider: **AWS** (or any)
4. Choose region closest to you (e.g., `Mumbai` for India)
5. Click **"Create"** (takes 1-3 minutes)

### 1.3 Create Database User
1. Go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `ecommerce_user` (or any)
5. Password: Click **"Autogenerate Secure Password"** → **Copy it!**
6. Database User Privileges: **"Atlas admin"**
7. Click **"Add User"**

### 1.4 Whitelist IP Address
1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
   - Or add `0.0.0.0/0`
4. Click **"Confirm"**

### 1.5 Get Connection String
1. Go to **"Database"** → Click **"Connect"**
2. Choose **"Connect your application"**
3. Driver: **Node.js** | Version: **5.5 or later**
4. Copy the connection string
   - Looks like: `mongodb+srv://ecommerce_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
5. Replace `<password>` with your actual password
6. Add database name: `mongodb+srv://...@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority`

**Save this connection string!** You'll need it later.

---

## 🖥️ Step 2: Deploy Backend (Railway - Free)

### Option A: Railway (Recommended - Easier)

#### 2.1 Create Railway Account
1. Go to: https://railway.app/
2. Click **"Start a New Project"**
3. Sign up with **GitHub** (easiest)

#### 2.2 Deploy Backend
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Select your repository
4. Railway will auto-detect it's a Node.js project
5. Click on the service → Go to **"Settings"**

#### 2.3 Configure Environment Variables
In Railway **Settings** → **Variables**, add:

```env
PORT=5000
MONGODB_URI=mongodb+srv://ecommerce_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
RAZORPAY_KEY_ID=rzp_test_Rr2TjXaoF8ABPB
RAZORPAY_KEY_SECRET=PM8GGgftlDWIhdFTppdSO5be
JWT_SECRET=your-random-secret-key-here
```

**Important:**
- Replace `YOUR_PASSWORD` with your MongoDB password
- Replace the MongoDB URI with your actual connection string
- Generate a random JWT_SECRET (any random string)

#### 2.4 Set Root Directory
1. In Railway settings, find **"Root Directory"**
2. Set it to: `server`
3. Save

#### 2.5 Get Backend URL
1. Go to **"Settings"** → **"Domains"**
2. Railway will give you a URL like: `https://your-app-name.up.railway.app`
3. **Copy this URL!** This is your backend API URL

#### 2.6 Seed Database
1. In Railway, go to **"Deployments"**
2. Click on the latest deployment
3. Go to **"Logs"** tab
4. You should see: `MongoDB Connected`

To seed the database:
1. Go to **"Settings"** → **"Deploy"**
2. Add a custom command: `npm run seed`
3. Or manually run: In Railway terminal, run `npm run seed`

---

### Option B: Render (Alternative Free Option)

#### 2.1 Create Render Account
1. Go to: https://render.com/
2. Sign up with **GitHub**

#### 2.2 Deploy Backend
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Settings:
   - **Name**: `ecommerce-backend` (or any)
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: **Free**

#### 2.3 Add Environment Variables
In **"Environment"** section, add:

```env
PORT=5000
MONGODB_URI=mongodb+srv://ecommerce_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
RAZORPAY_KEY_ID=rzp_test_Rr2TjXaoF8ABPB
RAZORPAY_KEY_SECRET=PM8GGgftlDWIhdFTppdSO5be
JWT_SECRET=your-random-secret-key-here
```

#### 2.4 Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Get your URL: `https://your-app-name.onrender.com`

**Note:** Render free tier spins down after 15 minutes of inactivity. First request after spin-down takes ~30 seconds.

---

## 🎨 Step 3: Deploy Frontend (Vercel - Free)

### 3.1 Create Vercel Account
1. Go to: https://vercel.com/
2. Click **"Sign Up"**
3. Sign up with **GitHub** (easiest)

### 3.2 Deploy Frontend
1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository
3. Vercel will auto-detect it's a React/Vite project
4. Click **"Deploy"**

### 3.3 Configure Environment Variables
1. Go to your project → **"Settings"** → **"Environment Variables"**
2. Add:

```env
VITE_API_URL=https://your-backend-url.railway.app/api
```

**Important:** Replace `your-backend-url.railway.app` with your actual Railway/Render backend URL!

### 3.4 Redeploy
1. After adding environment variables, go to **"Deployments"**
2. Click **"..."** on latest deployment → **"Redeploy"**
3. Wait for deployment (2-3 minutes)

### 3.5 Get Frontend URL
1. Vercel will give you a URL like: `https://your-app-name.vercel.app`
2. **This is your live website!** 🎉

---

## 🔧 Step 4: Update Frontend API URL

After deploying backend, update frontend environment variable:

1. Go to Vercel → Your Project → **Settings** → **Environment Variables**
2. Update `VITE_API_URL` to your backend URL:
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```
3. **Redeploy** the frontend

---

## ✅ Step 5: Test Your Live Site

1. Visit your Vercel URL: `https://your-app-name.vercel.app`
2. Test features:
   - ✅ Browse products
   - ✅ Add to cart
   - ✅ Register/Login
   - ✅ Checkout
   - ✅ Payment (test mode)

---

## 📝 Quick Checklist

### Backend Deployment:
- [ ] MongoDB Atlas account created
- [ ] Database cluster created
- [ ] Database user created
- [ ] IP whitelisted
- [ ] Connection string copied
- [ ] Backend deployed on Railway/Render
- [ ] Environment variables added
- [ ] Backend URL obtained
- [ ] Database seeded

### Frontend Deployment:
- [ ] Vercel account created
- [ ] Frontend deployed
- [ ] Environment variable `VITE_API_URL` added
- [ ] Frontend redeployed
- [ ] Live URL obtained

### Testing:
- [ ] Site loads correctly
- [ ] Products display
- [ ] Can register/login
- [ ] Can add to cart
- [ ] Can checkout
- [ ] Payment works (test mode)

---

## 🆘 Troubleshooting

### Backend not connecting to MongoDB
- Check MongoDB connection string is correct
- Verify password is correct (no special characters need encoding)
- Check IP is whitelisted in MongoDB Atlas
- Check environment variables in Railway/Render

### Frontend can't connect to backend
- Verify `VITE_API_URL` is correct in Vercel
- Check backend URL is accessible (visit in browser)
- Make sure backend is running (check Railway/Render logs)
- Redeploy frontend after changing environment variables

### CORS errors
- Backend should already have CORS enabled
- If errors persist, check backend logs

### Payment not working
- Verify Razorpay keys are in backend environment variables
- Check backend logs for Razorpay initialization
- Test with test card: `4111 1111 1111 1111`

---

## 🎯 Free Tier Limits

### MongoDB Atlas (Free):
- ✅ 512 MB storage
- ✅ Shared cluster
- ✅ Perfect for portfolio projects

### Railway (Free):
- ✅ $5 credit/month (enough for small projects)
- ✅ Auto-deploys from GitHub
- ✅ Custom domains

### Render (Free):
- ✅ Spins down after 15 min inactivity
- ✅ First request after spin-down is slow (~30 sec)
- ✅ Good for portfolio (not production)

### Vercel (Free):
- ✅ Unlimited deployments
- ✅ Custom domains
- ✅ Perfect for frontend

---

## 📱 Add to Your Portfolio

Once deployed, add to your:
- ✅ GitHub README (add live demo link)
- ✅ LinkedIn profile
- ✅ Resume
- ✅ Portfolio website

**Example README addition:**
```markdown
## 🌐 Live Demo

🔗 **[View Live Demo](https://your-app-name.vercel.app)**

- Frontend: Vercel
- Backend: Railway
- Database: MongoDB Atlas
```

---

## 🎉 You're Done!

Your e-commerce platform is now live and FREE! Perfect for showcasing to recruiters.

**Total Cost: $0** ✅

---

**Need help? Check the logs in Railway/Render/Vercel for error messages.**

