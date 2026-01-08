# Deployment Guide - Bharat Super Bazar

This guide covers deploying your full-stack application to production.

## Architecture Overview

- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Render/Railway (recommended) or Heroku
- **Database**: MongoDB Atlas (cloud)

## Prerequisites

- [ ] GitHub account
- [ ] Vercel account
- [ ] Render/Railway account (for backend)
- [ ] MongoDB Atlas account
- [ ] Google OAuth credentials configured

---

## Part 1: Database Setup (MongoDB Atlas)

### 1. Create MongoDB Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new cluster (Free tier is fine for testing)
4. Choose a cloud provider and region
5. Click "Create Cluster"

### 2. Configure Database Access

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and strong password
4. Set privileges to "Read and write to any database"
5. Click "Add User"

### 3. Configure Network Access

1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Note: In production, restrict this to your backend server's IP
4. Click "Confirm"

### 4. Get Connection String

1. Go to "Database" > "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with your database name (e.g., `bharat-super-bazar`)

Example:

```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bharat-super-bazar?retryWrites=true&w=majority
```

---

## Part 2: Backend Deployment (Render)

### 1. Prepare Backend

Make sure your `server/package.json` has a start script:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### 2. Deploy to Render

1. Go to [Render](https://render.com)
2. Sign up/log in with GitHub
3. Click "New +" > "Web Service"
4. Connect your GitHub repository
5. Configure:

   - **Name**: bharat-super-bazar-api
   - **Root Directory**: `server`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

6. Add Environment Variables:

   ```
   PORT=5001
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-super-secret-key-here
   GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   NODE_ENV=production
   ```

7. Click "Create Web Service"
8. Wait for deployment (5-10 minutes)
9. Copy your backend URL (e.g., `https://bharat-super-bazar-api.onrender.com`)

### Alternative: Railway

1. Go to [Railway](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" > "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables (same as above)
6. Deploy

---

## Part 3: Frontend Deployment (Vercel)

### 1. Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign up/log in with GitHub
3. Click "Add New" > "Project"
4. Import your GitHub repository
5. Configure:

   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. Add Environment Variables:

   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   ```

7. Click "Deploy"
8. Wait for deployment (2-5 minutes)
9. Copy your frontend URL (e.g., `https://bharat-super-bazar.vercel.app`)

---

## Part 4: Configure Google OAuth for Production

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to "APIs & Services" > "Credentials"
4. Click on your OAuth 2.0 Client ID
5. Add production URLs:

   **Authorized JavaScript origins:**

   - `https://bharat-super-bazar.vercel.app` (your Vercel URL)

   **Authorized redirect URIs:**

   - `https://bharat-super-bazar.vercel.app` (your Vercel URL)

6. Click "SAVE"

---

## Part 5: Configure CORS on Backend

Make sure your backend allows requests from your frontend domain.

In `server/server.js` or `server/index.js`:

```javascript
import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "https://bharat-super-bazar.vercel.app", // Add your Vercel URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
```

Redeploy your backend after this change.

---

## Part 6: Testing Production

### Test Checklist

1. **Frontend loads**: Visit your Vercel URL
2. **Google Sign-In works**: Click login, try Google OAuth
3. **Email/Password works**: Try registering and logging in
4. **API calls work**: Check browser Network tab for successful API calls
5. **No CORS errors**: Check browser console
6. **HTTPS enabled**: URL should start with `https://`

### Common Issues

**Issue**: "Failed to load resource: 404"

- **Solution**: Check `VITE_API_URL` in Vercel environment variables
- Make sure it points to your backend URL

**Issue**: "CORS error"

- **Solution**: Update CORS configuration on backend
- Redeploy backend after changes

**Issue**: "Google sign-in failed"

- **Solution**: Verify production URL is added to Google Console
- Check `VITE_GOOGLE_CLIENT_ID` is set correctly

**Issue**: "Database connection failed"

- **Solution**: Check `MONGODB_URI` in backend environment variables
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

---

## Part 7: Post-Deployment

### 1. Set Up Custom Domain (Optional)

**Vercel:**

1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

**Update Google OAuth:**

- Add custom domain to authorized origins

### 2. Monitor Your Application

**Vercel:**

- View deployment logs in Vercel dashboard
- Set up error tracking (Sentry, LogRocket)

**Render:**

- View logs in Render dashboard
- Set up uptime monitoring

### 3. Enable Production Features

1. **Publish OAuth Consent Screen** (Google Cloud Console)

   - Go to "OAuth consent screen"
   - Click "PUBLISH APP"
   - This removes the "unverified app" warning

2. **Set Up Email Service** (for password reset, etc.)

   - Consider SendGrid, Mailgun, or AWS SES

3. **Add Analytics**
   - Google Analytics
   - Vercel Analytics

---

## Environment Variables Summary

### Frontend (Vercel)

```env
VITE_API_URL=https://your-backend.onrender.com
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

### Backend (Render/Railway)

```env
PORT=5001
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your-super-secret-jwt-key
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
NODE_ENV=production
```

---

## Continuous Deployment

Both Vercel and Render support automatic deployments:

1. **Push to GitHub**: `git push origin main`
2. **Auto-deploy**: Vercel and Render will automatically deploy
3. **Monitor**: Check deployment status in dashboards

---

## Security Checklist

- [ ] HTTPS enabled on all domains
- [ ] Strong JWT_SECRET in production
- [ ] MongoDB network access restricted (optional)
- [ ] Environment variables never committed to Git
- [ ] CORS properly configured
- [ ] OAuth consent screen published
- [ ] Rate limiting enabled (optional)
- [ ] Input validation on all forms

---

## Support & Maintenance

### Updating Your App

1. Make changes locally
2. Test thoroughly
3. Commit and push to GitHub
4. Automatic deployment triggers
5. Verify changes in production

### Rollback

If something breaks:

1. **Vercel**: Go to Deployments > Click previous deployment > "Promote to Production"
2. **Render**: Go to Events > Click previous deployment > "Redeploy"

---

**Deployment Complete!** 🎉

Your application is now live and accessible worldwide!

**Frontend**: https://your-app.vercel.app
**Backend**: https://your-api.onrender.com

---

**Last Updated**: January 2026
