# 🚀 Quick Start Guide - Modern Authentication

Your Bharat Super Bazar now has **ChatGPT-style authentication** with real Google OAuth!

## ✨ What's New

- ✅ **Real Google OAuth** - One-click sign-in with Google
- ✅ **Modern UI** - Clean, professional login modal like ChatGPT
- ✅ **Email/Password** - Traditional authentication still available
- ✅ **Production Ready** - Works in both development and production
- ✅ **Secure** - Token-based authentication with JWT

## 🎯 Quick Setup (5 Minutes)

### Step 1: Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project: "Bharat Super Bazar"
3. Enable Google+ API
4. Create OAuth 2.0 Client ID:
   - Type: Web application
   - Authorized JavaScript origins: `http://localhost:5173`
   - Authorized redirect URIs: `http://localhost:5173`
5. Copy your **Client ID**

### Step 2: Configure Environment Variables

Create `.env` in the root directory:

```env
VITE_API_URL=http://localhost:5001
VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE.apps.googleusercontent.com
```

Update `server/.env`:

```env
PORT=5001
JWT_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE.apps.googleusercontent.com
```

**Important**: Use the **same** Client ID in both files!

### Step 3: Install Dependencies (if not already done)

```bash
# Frontend
npm install

# Backend
cd server
npm install
```

### Step 4: Start Development Servers

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend (in root directory)
npm run dev
```

### Step 5: Test It!

1. Open `http://localhost:5173`
2. Click the "Login" button
3. Try **"Continue with Google"** - you should see the Google sign-in popup!
4. Or use email/password to register/login

## 🎨 Features

### Google OAuth

- One-click sign-in
- Automatic account creation
- Profile picture support
- Secure token verification

### Email/Password

- User registration
- Secure password hashing
- JWT token authentication
- Form validation

### Modern UI

- Clean, minimal design
- Smooth animations
- Loading states
- Error handling
- Responsive design
- Dark mode support

## 📁 New Files Created

- `src/components/LoginModal.jsx` - Modern login component
- `src/components/LoginModal.css` - ChatGPT-style CSS
- `src/config/api.js` - API configuration utility
- `src/context/AuthContext.jsx` - Updated with Google OAuth
- `server/routes/auth.js` - Updated with Google token verification
- `.env.example` - Environment variables template
- `GOOGLE_OAUTH_SETUP.md` - Detailed setup guide
- `DEPLOYMENT_GUIDE.md` - Production deployment guide
- `vercel.json` - Vercel configuration

## 🔧 How It Works

### Development (localhost)

```
Frontend (localhost:5173)
    ↓ /api/* requests
Vite Proxy
    ↓
Backend (localhost:5001)
```

### Production (Vercel + Render)

```
Frontend (vercel.app)
    ↓ Direct API calls
Backend (render.com)
    ↓
MongoDB Atlas
```

## 🚀 Deploy to Production

See `DEPLOYMENT_GUIDE.md` for complete instructions.

**Quick version:**

1. **Database**: Create MongoDB Atlas cluster
2. **Backend**: Deploy to Render/Railway
3. **Frontend**: Deploy to Vercel
4. **Google OAuth**: Add production URLs to Google Console

## 🐛 Troubleshooting

### Google Sign-In not working?

**Check:**

1. ✅ `VITE_GOOGLE_CLIENT_ID` is set in `.env`
2. ✅ `GOOGLE_CLIENT_ID` is set in `server/.env`
3. ✅ Both use the **same** Client ID
4. ✅ `http://localhost:5173` is in Google Console authorized origins
5. ✅ Both servers are running

### API calls failing?

**Check:**

1. ✅ Backend is running on port 5001
2. ✅ Frontend is running on port 5173
3. ✅ No CORS errors in browser console
4. ✅ `VITE_API_URL` is set correctly

### "The page can't be found" in production?

**Check:**

1. ✅ `VITE_API_URL` points to your backend URL
2. ✅ Backend is deployed and running
3. ✅ CORS allows your frontend domain
4. ✅ Google Console has production URLs

## 📚 Documentation

- **Google OAuth Setup**: See `GOOGLE_OAUTH_SETUP.md`
- **Deployment**: See `DEPLOYMENT_GUIDE.md`
- **Login Guide**: See `LOGIN_GUIDE.md`

## 🎯 Next Steps

1. **Test locally** - Make sure Google OAuth works
2. **Customize UI** - Adjust colors, logo, text in `LoginModal.jsx`
3. **Add features** - Password reset, email verification, etc.
4. **Deploy** - Follow `DEPLOYMENT_GUIDE.md`

## 💡 Tips

- **Logo**: Update the "B" in `modal-logo` to your actual logo
- **Colors**: Change the green gradient in CSS to match your brand
- **Text**: Customize welcome messages in `LoginModal.jsx`
- **Security**: Use strong `JWT_SECRET` in production

## 🔒 Security Notes

- ✅ Passwords are hashed with bcrypt
- ✅ JWT tokens expire after 7 days
- ✅ Google tokens are verified server-side
- ✅ HTTPS required in production
- ✅ Environment variables never committed

## 🎉 You're All Set!

Your app now has professional, modern authentication like ChatGPT and other top websites!

**Need help?** Check the detailed guides or review the code comments.

---

**Created**: January 2026
**Version**: 1.0
