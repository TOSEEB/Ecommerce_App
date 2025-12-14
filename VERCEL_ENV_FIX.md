# 🔧 Fix Vercel 404 Error - Environment Variable Setup

## Problem
Your deployed Vercel site is getting 404 errors when trying to fetch products. This is because the `VITE_API_URL` environment variable is not set correctly.

## Solution: Set Environment Variable in Vercel

### Step 1: Go to Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Login to your account
3. Click on your project: **ecommerce-app** (or whatever you named it)

### Step 2: Add Environment Variable
1. Click on **Settings** tab (top navigation)
2. Click on **Environment Variables** in the left sidebar
3. Click **Add New** button

### Step 3: Add These Variables

**Variable 1: API URL (REQUIRED)**
- **Key:** `VITE_API_URL`
- **Value:** `https://ecommerce-app-3b6r.onrender.com/api`
- **Environment:** Select all three:
  - ✅ Production
  - ✅ Preview  
  - ✅ Development
- Click **Save**

**Variable 2: Razorpay Key (if you have it)**
- **Key:** `VITE_RAZORPAY_KEY_ID`
- **Value:** `rzp_test_Rr2TjXaoF8ABPB` (your test key)
- **Environment:** Select all three (Production, Preview, Development)
- Click **Save**

### Step 4: Redeploy (IMPORTANT!)
1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **3 dots (⋯)** menu on the right
4. Click **Redeploy**
5. Select **Use existing Build Cache** (optional, but faster)
6. Click **Redeploy**
7. Wait 2-3 minutes for deployment to complete

### Step 5: Verify It's Working
1. Open your site: https://ecommerce-app-five-lyart.vercel.app
2. Open browser Developer Tools (Press F12)
3. Go to **Console** tab - should NOT see 404 errors
4. Go to **Network** tab - refresh page
5. Look for requests to `ecommerce-app-3b6r.onrender.com/api/products`
6. Should see status **200 OK** (not 404)

---

## ✅ Quick Checklist
- [ ] Added `VITE_API_URL` = `https://ecommerce-app-3b6r.onrender.com/api` (with `/api` at the end!)
- [ ] Added `VITE_RAZORPAY_KEY_ID` (if needed)
- [ ] Selected all environments (Production, Preview, Development)
- [ ] **Redeployed the site** (this is critical!)
- [ ] Verified it's working (no 404 errors)

---

## 🔍 How to Verify Environment Variable is Set

After redeploying, you can check if the variable is set correctly:

1. Open your deployed site
2. Press F12 to open Developer Tools
3. Go to **Console** tab
4. Type: `console.log(import.meta.env.VITE_API_URL)`
5. Press Enter
6. Should show: `https://ecommerce-app-3b6r.onrender.com/api`

---

## ⚠️ Common Mistakes

1. **Forgetting to redeploy** - Environment variables only take effect after redeploy!
2. **Missing `/api` at the end** - Must be `https://ecommerce-app-3b6r.onrender.com/api` (not just `https://ecommerce-app-3b6r.onrender.com`)
3. **Not selecting all environments** - Make sure to select Production, Preview, AND Development
4. **Typo in the URL** - Double-check the Render backend URL is correct

---

## 🚀 Alternative: Update via Vercel CLI

If you prefer command line:

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login
vercel login

# Add environment variable for production
vercel env add VITE_API_URL production
# When prompted, enter: https://ecommerce-app-3b6r.onrender.com/api

# Add for preview
vercel env add VITE_API_URL preview
# Enter: https://ecommerce-app-3b6r.onrender.com/api

# Add for development
vercel env add VITE_API_URL development
# Enter: https://ecommerce-app-3b6r.onrender.com/api

# Redeploy
vercel --prod
```

---

## 📝 What I Fixed in the Code

I've updated the code to automatically handle the `/api` suffix, so even if you set `VITE_API_URL` to `https://ecommerce-app-3b6r.onrender.com` (without `/api`), it will automatically add `/api` at the end.

**But it's still best to set it correctly:** `https://ecommerce-app-3b6r.onrender.com/api`

---

**After setting the environment variable and redeploying, your site should work perfectly! 🎉**
