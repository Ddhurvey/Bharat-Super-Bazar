# 🗄️ MongoDB Installation Guide

## How to Install MongoDB for Permanent Data Storage

---

## ⚠️ Current Status

Your application is currently running in **IN-MEMORY MODE** which means:

- ✅ Authentication works
- ✅ You can register and login
- ✅ Admin panel works
- ❌ **Data is lost when server restarts**

To save data permanently, you need to install MongoDB.

---

## 🚀 Quick Fix (Already Done!)

I've updated your application to work **WITHOUT MongoDB** for now:

- ✅ Users are stored in server memory
- ✅ You can register, login, and use admin panel
- ✅ Everything works for testing

**But remember:** When you restart the server, all users will be deleted!

---

## 📥 How to Install MongoDB (Windows)

### Step 1: Download MongoDB

1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - **Version:** Latest (7.0 or higher)
   - **Platform:** Windows
   - **Package:** MSI
3. Click **Download**

### Step 2: Install MongoDB

1. **Run the installer** (mongodb-windows-x86_64-xxx.msi)
2. Click **Next** → **Accept** license
3. Choose **Complete** installation
4. **Important:** Check "Install MongoDB as a Service"
5. **Important:** Check "Install MongoDB Compass" (GUI tool)
6. Click **Next** → **Install**
7. Wait for installation to complete
8. Click **Finish**

### Step 3: Verify Installation

1. Open **Command Prompt** (cmd)
2. Type: `mongod --version`
3. You should see MongoDB version info

### Step 4: Start MongoDB Service

**Option A: Automatic (Recommended)**

- MongoDB should start automatically as a Windows service
- Check by opening **Services** (Win + R → type `services.msc`)
- Look for "MongoDB" service - it should be "Running"

**Option B: Manual Start**

```bash
net start MongoDB
```

### Step 5: Test Connection

1. Open **MongoDB Compass** (installed with MongoDB)
2. Click **Connect** (default connection string)
3. You should see "Connected" status

---

## 🔄 After Installing MongoDB

### Your Server Will Automatically:

1. Detect MongoDB is running
2. Switch from in-memory to database storage
3. Save all data permanently

### You'll See This in Server Logs:

```
✅ MongoDB Connected Successfully
Server running on port 5001
```

Instead of:

```
❌ MongoDB Connection Error
⚠️  Running without database - using in-memory storage
```

---

## 🎯 Alternative: MongoDB Atlas (Cloud - Free)

If you don't want to install MongoDB locally, use MongoDB Atlas (cloud):

### Step 1: Create Account

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for free
3. Create a **Free Cluster** (M0)

### Step 2: Get Connection String

1. Click **Connect** on your cluster
2. Choose **Connect your application**
3. Copy the connection string (looks like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/bharat-bazar
   ```

### Step 3: Update Your .env File

1. Open `server/.env`
2. Replace `MONGODB_URI` with your connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bharat-bazar
   ```
3. Replace `username` and `password` with your actual credentials

### Step 4: Restart Server

```bash
# Stop server (Ctrl + C)
# Start again
npm run dev
```

---

## ✅ How to Know It's Working

### Check Server Logs:

```
✅ MongoDB Connected Successfully  ← This means it's working!
Server running on port 5001
```

### Test It:

1. Register a new user
2. **Restart the server** (Ctrl + C, then `npm run dev`)
3. Try to login with same credentials
4. **If login works** → MongoDB is saving data! ✅
5. **If login fails** → Still in memory mode ❌

---

## 🔧 Troubleshooting

### Problem: "MongoDB Connection Error"

**Solution 1:** Check if MongoDB service is running

```bash
# Windows
net start MongoDB

# Check status
sc query MongoDB
```

**Solution 2:** Check connection string in `.env`

```
MONGODB_URI=mongodb://localhost:27017/bharat-bazar
```

**Solution 3:** Check firewall

- Allow MongoDB (port 27017) in Windows Firewall

### Problem: "Authentication failed"

**Solution:** Update connection string with credentials

```
mongodb://username:password@localhost:27017/bharat-bazar
```

---

## 📊 What Gets Saved in MongoDB

Once MongoDB is connected, these will be saved permanently:

✅ **Users** → `users` collection

- Name, email, password (encrypted)
- Role (owner/admin/user)

✅ **Products** → `products` collection

- Name, price, images, descriptions
- Categories, ratings

✅ **Orders** → `orders` collection

- Customer info, items, totals
- Order numbers, status

---

## 🎯 Summary

### **For Testing (Current Setup):**

- ✅ Works without MongoDB
- ✅ Can register, login, use admin panel
- ❌ Data lost on server restart

### **For Production (Install MongoDB):**

- ✅ Data saved permanently
- ✅ Survives server restarts
- ✅ Professional setup

---

## 💡 Recommendation

**For Development/Testing:**

- Current setup is fine
- No need to install MongoDB immediately

**For Production/Real Use:**

- Install MongoDB (local or Atlas)
- Get permanent data storage
- More reliable and professional

---

## 🆘 Need Help?

If you have issues installing MongoDB:

1. Check MongoDB documentation: https://docs.mongodb.com/manual/installation/
2. Use MongoDB Atlas (cloud) instead
3. Continue with in-memory mode for now

---

**Your app works fine without MongoDB for testing!**  
**Install it when you're ready for production.** ✅

---

**Last Updated:** January 6, 2026
