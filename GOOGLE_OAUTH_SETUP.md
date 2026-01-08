# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for your Bharat Super Bazar application.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "NEW PROJECT"
4. Enter project name: "Bharat Super Bazar"
5. Click "CREATE"

## Step 2: Enable Google+ API

1. In your project, go to "APIs & Services" > "Library"
2. Search for "Google+ API"
3. Click on it and click "ENABLE"

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "CREATE CREDENTIALS" > "OAuth client ID"
3. If prompted, configure the OAuth consent screen first:

   - User Type: External
   - App name: Bharat Super Bazar
   - User support email: your email
   - Developer contact: your email
   - Click "SAVE AND CONTINUE"
   - Scopes: Click "SAVE AND CONTINUE" (use defaults)
   - Test users: Add your email for testing
   - Click "SAVE AND CONTINUE"

4. Create OAuth Client ID:

   - Application type: **Web application**
   - Name: "Bharat Super Bazar Web Client"

   **Authorized JavaScript origins:**

   - `http://localhost:5173` (for local development)
   - `https://your-vercel-app.vercel.app` (for production - add after deploying)

   **Authorized redirect URIs:**

   - `http://localhost:5173` (for local development)
   - `https://your-vercel-app.vercel.app` (for production - add after deploying)

5. Click "CREATE"
6. **IMPORTANT**: Copy your Client ID - you'll need this!

## Step 4: Configure Environment Variables

### Frontend (.env in root directory)

Create or update `.env` file:

```env
VITE_API_URL=http://localhost:5001
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com
```

Replace `YOUR_GOOGLE_CLIENT_ID_HERE` with the Client ID you copied.

### Backend (server/.env)

Create or update `server/.env` file:

```env
PORT=5001
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com
```

Use the **same** Client ID for both frontend and backend.

## Step 5: Test Locally

1. Restart your development servers:

   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev

   # Terminal 2 - Frontend
   npm run dev
   ```

2. Open `http://localhost:5173`
3. Click "Login" and try signing in with Google
4. You should see the Google sign-in popup

## Step 6: Deploy to Production

### Vercel (Frontend)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel project settings:
   - `VITE_API_URL`: Your backend URL (e.g., `https://your-backend.onrender.com`)
   - `VITE_GOOGLE_CLIENT_ID`: Your Google Client ID
5. Deploy

### Backend (Render/Railway/Heroku)

1. Deploy your backend to your preferred platform
2. Add environment variables:
   - `PORT`: 5001 (or as required by platform)
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string
   - `GOOGLE_CLIENT_ID`: Your Google Client ID

### Update Google OAuth Settings

After deploying, go back to Google Cloud Console:

1. Go to "APIs & Services" > "Credentials"
2. Click on your OAuth 2.0 Client ID
3. Add your production URLs:

   **Authorized JavaScript origins:**

   - Add: `https://your-vercel-app.vercel.app`

   **Authorized redirect URIs:**

   - Add: `https://your-vercel-app.vercel.app`

4. Click "SAVE"

## Troubleshooting

### "Error 400: redirect_uri_mismatch"

- Make sure your domain is added to "Authorized JavaScript origins" in Google Cloud Console
- The URL must match exactly (including http/https and port)

### "Google sign-in failed"

- Check that GOOGLE_CLIENT_ID is set correctly in both frontend and backend
- Verify the Client ID matches in Google Cloud Console
- Check browser console for detailed error messages

### "The page can't be found" or 404 errors in production

- Make sure VITE_API_URL is set correctly in Vercel
- Verify your backend is running and accessible
- Check that CORS is configured on your backend

### Token verification fails

- Ensure the backend has the same GOOGLE_CLIENT_ID as the frontend
- Check that google-auth-library is installed: `npm install google-auth-library`

## Security Notes

1. **Never commit `.env` files** - they're in `.gitignore`
2. **Use strong JWT_SECRET** in production (generate with: `openssl rand -base64 32`)
3. **Keep your Google Client Secret safe** (we only use Client ID, but keep Secret secure)
4. **Use HTTPS in production** - required for OAuth
5. **Regularly rotate secrets** in production environments

## Testing Checklist

- [ ] Google Sign-In works locally
- [ ] Email/Password login works locally
- [ ] User registration works
- [ ] Environment variables are set
- [ ] Backend verifies Google tokens correctly
- [ ] Production URLs added to Google Console
- [ ] HTTPS enabled in production
- [ ] CORS configured correctly
- [ ] Error messages display properly

## Support

If you encounter issues:

1. Check browser console for errors
2. Check backend logs for authentication errors
3. Verify all environment variables are set
4. Ensure Google OAuth consent screen is published (for production)

---

**Last Updated**: January 2026
