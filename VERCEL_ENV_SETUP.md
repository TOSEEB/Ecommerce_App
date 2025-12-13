# 🔧 Fix Vercel Environment Variable - URGENT!

Your frontend is trying to connect to `localhost:5000` instead of your deployed backend. Follow these steps:

## ⚡ Quick Fix (5 minutes)

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Find your project: `ecommerce-app-five-lyart` (or your project name)
3. Click on it

### Step 2: Add Environment Variable
1. Click **"Settings"** (top menu)
2. Click **"Environment Variables"** (left sidebar)
3. Click **"Add New"** button

### Step 3: Add VITE_API_URL
Fill in:
- **Key**: `VITE_API_URL`
- **Value**: `https://ecommerce-app-3b6r.onrender.com/api`
- **Environment**: Select ALL three:
  - ✅ Production
  - ✅ Preview  
  - ✅ Development

4. Click **"Save"**

### Step 4: Redeploy
1. Go to **"Deployments"** tab
2. Find the latest deployment
3. Click the **"..."** (three dots) menu
4. Click **"Redeploy"**
5. Confirm redeploy

### Step 5: Wait for Deployment
- Wait 2-3 minutes for deployment to complete
- Check the deployment status (should show "Ready")

## ✅ Verify It's Working

After redeployment, test:
1. Visit: `https://ecommerce-app-five-lyart.vercel.app`
2. Open browser console (F12)
3. Check Network tab - API calls should go to `https://ecommerce-app-3b6r.onrender.com/api`
4. Products should load correctly

## 🎯 What This Fixes

- ✅ Frontend will connect to deployed backend (not localhost)
- ✅ Products will load
- ✅ Login/Register will work
- ✅ Checkout will work
- ✅ All API calls will work

## 📝 Environment Variable Summary

**Vercel Environment Variable:**
```
VITE_API_URL=https://ecommerce-app-3b6r.onrender.com/api
```

**Important Notes:**
- The URL must end with `/api`
- No trailing slash
- Must be `https://` (not `http://`)
- Must be set for Production, Preview, AND Development environments

---

**After setting this, your site will work! 🚀**

