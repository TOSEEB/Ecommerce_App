# Keep Backend Always Awake - UptimeRobot Setup

## Why This is Needed
Render's free tier spins down after 15 minutes of inactivity. This means if no one visits your site for 15+ minutes, the backend goes to sleep and takes 30-60 seconds to wake up when someone visits.

**This is BAD for recruiters** - they might see errors or slow loading!

## Solution: UptimeRobot (100% FREE)

UptimeRobot will ping your backend every 5 minutes to keep it awake 24/7.

## Setup Steps (Takes 2 minutes)

### Step 1: Create Free Account
1. Go to: https://uptimerobot.com/
2. Click "Sign Up" (top right)
3. Sign up with your email (free forever)

### Step 2: Add Monitor
1. After login, click "Add New Monitor"
2. Fill in:
   - **Monitor Type**: HTTP(s)
   - **Friendly Name**: E-commerce Backend Keep-Alive
   - **URL**: `https://ecommerce-app-3b6r.onrender.com/api/wake-up`
   - **Monitoring Interval**: 5 minutes (select from dropdown)
3. Click "Create Monitor"

### Step 3: Verify It's Working
1. Wait 1-2 minutes
2. Check your monitor - it should show "UP" status
3. Visit your backend URL directly: `https://ecommerce-app-3b6r.onrender.com/api/wake-up`
   - Should return: `{"status":"OK","message":"Backend is awake","productsCount":X}`

## That's It!

Now your backend will:
- ✅ Stay awake 24/7
- ✅ Load products instantly for recruiters
- ✅ Work perfectly even after 10 days of no visits
- ✅ Cost $0 (completely free)

## Important Notes

- **Free tier**: 50 monitors, checks every 5 minutes (perfect for this!)
- **No credit card needed**
- **Works forever** - no expiration
- **Your backend URL**: `https://ecommerce-app-3b6r.onrender.com/api/wake-up`

## Alternative: If UptimeRobot Doesn't Work

You can also use:
- **Cron-job.org** (free): https://cron-job.org/
- **EasyCron** (free tier): https://www.easycron.com/

Just set them to ping: `https://ecommerce-app-3b6r.onrender.com/api/wake-up` every 5-10 minutes.

