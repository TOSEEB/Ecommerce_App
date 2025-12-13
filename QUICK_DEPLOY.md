# ⚡ Quick Deployment Checklist

## 🎯 3-Step Deployment (All Free!)

### Step 1: MongoDB Atlas (5 minutes)
1. Sign up: https://www.mongodb.com/cloud/atlas/register
2. Create FREE cluster
3. Create database user → Copy password
4. Whitelist IP: `0.0.0.0/0` (Allow from anywhere)
5. Get connection string → Replace `<password>`

**Connection String Format:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
```

---

### Step 2: Deploy Backend (10 minutes)

#### Railway (Easiest):
1. Go to: https://railway.app/
2. Sign up with GitHub
3. New Project → Deploy from GitHub
4. Select your repo
5. Settings → Root Directory: `server`
6. Settings → Variables → Add:
   ```
   MONGODB_URI=your-connection-string-here
   RAZORPAY_KEY_ID=rzp_test_Rr2TjXaoF8ABPB
   RAZORPAY_KEY_SECRET=PM8GGgftlDWIhdFTppdSO5be
   JWT_SECRET=any-random-string-here
   PORT=5000
   ```
7. Get your backend URL: `https://your-app.railway.app`

#### Render (Alternative):
1. Go to: https://render.com/
2. New Web Service → Connect GitHub
3. Root Directory: `server`
4. Build: `npm install`
5. Start: `npm start`
6. Add same environment variables
7. Get URL: `https://your-app.onrender.com`

---

### Step 3: Deploy Frontend (5 minutes)

1. Go to: https://vercel.com/
2. Sign up with GitHub
3. New Project → Import your repo
4. Settings → Environment Variables → Add:
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```
5. Deploy → Get URL: `https://your-app.vercel.app`

**Done!** 🎉

---

## 🔑 Environment Variables Summary

### Backend (Railway/Render):
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
RAZORPAY_KEY_ID=rzp_test_Rr2TjXaoF8ABPB
RAZORPAY_KEY_SECRET=PM8GGgftlDWIhdFTppdSO5be
JWT_SECRET=your-random-secret
PORT=5000
```

### Frontend (Vercel):
```env
VITE_API_URL=https://your-backend.railway.app/api
```

---

## ✅ Test Checklist

- [ ] Backend health check: `https://your-backend.railway.app/api/health`
- [ ] Frontend loads: `https://your-app.vercel.app`
- [ ] Products display
- [ ] Can register/login
- [ ] Can checkout
- [ ] Payment works

---

## 🆘 Common Issues

**Backend not working?**
- Check MongoDB connection string
- Verify environment variables are set
- Check Railway/Render logs

**Frontend can't connect?**
- Verify `VITE_API_URL` is correct
- Make sure backend URL ends with `/api`
- Redeploy frontend after changing env vars

**Payment not working?**
- Check Razorpay keys in backend env vars
- Verify backend logs show "Razorpay initialized"

---

**Total Time: ~20 minutes | Total Cost: $0** ✅

