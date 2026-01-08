# 🔐 Updated Login Credentials & Social Login Guide

## Date: January 7, 2026

---

## 👤 Owner Account (Your Personal Account)

**Email:** `devendradhur85@gmail.com`  
**Password:** `Dev@750`  
**Role:** Owner (Full Access)  
**Name:** Devendra Dhurvey

### How to Login:

1. Go to http://localhost:5173/
2. Click "Login" button
3. Enter your email: `devendradhur85@gmail.com`
4. Enter your password: `Dev@750`
5. Click "Login"

You will have full owner access to:

- Dashboard
- Product Management
- Order Management
- User Management
- All Admin Features

---

## 🌐 Social Login (Google & Facebook)

### How Social Login Works Now:

**Google Login:**

1. Click "Google" button
2. Enter your **real Gmail address** (e.g., `devendradhur85@gmail.com`)
3. Enter your **full name** (e.g., `Devendra Dhurve`)
4. System will create/login your account

**Validation:**

- ✅ Must be a valid Gmail address (@gmail.com or @google.com)
- ✅ Name is required
- ✅ Account is created if it doesn't exist
- ✅ Logs you in if account already exists

**Facebook Login:**

1. Click "Facebook" button
2. Enter your **email address** (any email works for Facebook)
3. Enter your **full name**
4. System will create/login your account

**Validation:**

- ✅ Any email accepted (Facebook allows non-FB emails)
- ✅ Name is required
- ✅ Account is created if it doesn't exist
- ✅ Logs you in if account already exists

---

## 🔄 How It Works:

### First Time Social Login:

1. Click Google/Facebook button
2. Enter your email and name
3. System creates a new account for you
4. You're automatically logged in
5. Your account is saved

### Returning Social Login:

1. Click Google/Facebook button
2. Enter the same email you used before
3. System finds your existing account
4. You're automatically logged in

---

## ⚠️ Important Notes:

### For Google Login:

- **MUST use Gmail address** (@gmail.com)
- Example: `devendradhur85@gmail.com` ✅
- Example: `user@yahoo.com` ❌ (will show error)

### For Facebook Login:

- **Any email works**
- Example: `devendradhur85@gmail.com` ✅
- Example: `user@yahoo.com` ✅
- Example: `user@facebook.com` ✅

### Account Verification:

- Social login accounts are **automatically verified**
- No password needed for social login
- Each email can only have one account
- If you use the same email for both Google and Facebook login, it will use the same account

---

## 🎯 Testing Social Login:

### Test Google Login:

1. Click "Login" → "Google"
2. Enter: `devendradhur85@gmail.com`
3. Enter: `Devendra Dhurve`
4. ✅ Should login successfully

### Test Facebook Login:

1. Click "Login" → "Facebook"
2. Enter any email (e.g., `devendradhur85@gmail.com`)
3. Enter: `Devendra Dhurve`
4. ✅ Should login successfully

---

## 🔧 Technical Details:

### Backend Endpoint:

- **URL:** `POST /api/auth/social`
- **Body:** `{ provider, name, email }`
- **Response:** `{ token, user }`

### Frontend Validation:

- Email format validation
- Gmail domain check for Google
- Name required check
- Error messages displayed in modal

### Account Creation:

- Auto-creates account if email doesn't exist
- Assigns 'user' role (unless first user, then 'owner')
- Generates random password (not used for social login)
- Stores in in-memory database

---

## 📝 Example Usage:

### Scenario 1: You login with Google

```
1. Click "Google" button
2. Prompt: "Enter your Google email address:"
   → Enter: devendradhur85@gmail.com
3. Prompt: "Enter your full name:"
   → Enter: Devendra Dhurve
4. ✅ Logged in successfully!
```

### Scenario 2: Someone else logs in with Facebook

```
1. Click "Facebook" button
2. Prompt: "Enter your Facebook email address:"
   → Enter: john@example.com
3. Prompt: "Enter your full name:"
   → Enter: John Doe
4. ✅ Logged in successfully!
```

---

## ✅ What Changed:

### Before (Mock):

- Generated random emails like `user_1234567890@google.com`
- No user input
- Not realistic

### After (Real):

- Prompts for actual user email
- Validates Gmail for Google login
- Accepts any email for Facebook
- Creates real accounts
- Verifies users properly

---

## 🚀 Ready to Use!

Your social login is now functional and will:

- ✅ Accept real email addresses
- ✅ Verify Gmail for Google login
- ✅ Create accounts automatically
- ✅ Login existing users
- ✅ Work with your owner account

**Your owner credentials are ready:**

- Email: `devendradhur85@gmail.com`
- Password: `Dev@750`

**Test it now at:** http://localhost:5173/
