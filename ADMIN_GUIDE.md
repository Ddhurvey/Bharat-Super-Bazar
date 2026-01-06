# 🔐 Admin Panel & Authentication Guide

## Bharat Super Bazar - Complete Admin Access Guide

---

## 📋 Table of Contents

1. [How to Create Your First Admin Account](#create-first-admin)
2. [How to Login](#how-to-login)
3. [How to Give Admin Access to Others](#give-admin-access)
4. [User Roles Explained](#user-roles)
5. [What Each Role Can Do](#permissions)

---

## 🎯 Step 1: Create Your First Admin Account {#create-first-admin}

### **IMPORTANT: The First User Becomes Owner Automatically!**

1. **Open your website:** `http://localhost:5173`

2. **Click "Login" button** in the top-right corner

3. **Click "Register" tab** in the login modal

4. **Fill in your details:**

   - **Name:** Your Full Name (e.g., "Vijay Kumar")
   - **Email:** your@email.com
   - **Password:** Choose a strong password

5. **Click "Register"**

6. **🎉 Congratulations!** You are now the **OWNER** of the store!

### Why First User is Owner?

The system automatically makes the **first registered user** the **Owner** with full permissions. This is YOU!

---

## 🔑 Step 2: How to Login {#how-to-login}

### For Future Logins:

1. **Click "Login"** button in navbar
2. **Enter your email and password**
3. **Click "Login"**
4. **You're in!** You'll see:
   - Your name in the top-right
   - "Dashboard" link in navbar (admin/owner only)
   - Admin controls on Products page

### What Happens After Login?

- Your session is saved (stays logged in even after refresh)
- Token expires after **7 days** (you'll need to login again)
- You can logout anytime by clicking the logout icon

---

## 👥 Step 3: How to Give Admin Access to Others {#give-admin-access}

### Method 1: Through Admin Panel (Recommended)

1. **Login as Owner** (you)

2. **Click the Shield icon** (⚡) in the top-right navbar

   - This opens the "Admin Management" panel

3. **You'll see a list of all registered users**

4. **For each user, you can:**

   - See their name and email
   - See their current role
   - Click "Make Admin" to promote them
   - Click "Revoke Admin" to demote them

5. **Done!** The user now has admin access

### Method 2: Ask Them to Register

1. **Share the website link** with the person

2. **Ask them to:**

   - Click "Login"
   - Click "Register" tab
   - Fill in their details
   - Click "Register"

3. **They will be registered as "User" (normal user)**

4. **You (as Owner) can then promote them:**
   - Open Admin Panel (Shield icon)
   - Find their name
   - Click "Make Admin"

---

## 🎭 Step 4: User Roles Explained {#user-roles}

### There are 3 roles in the system:

| Role      | Badge Color | Who Gets It                   | Can Be Changed?   |
| --------- | ----------- | ----------------------------- | ----------------- |
| **Owner** | 🟣 Purple   | First registered user         | ❌ No (permanent) |
| **Admin** | 🔵 Blue     | Promoted by Owner             | ✅ Yes (by Owner) |
| **User**  | ⚪ White    | Default for new registrations | ✅ Yes (by Owner) |

### Role Hierarchy:

```
Owner (YOU)
  ↓
Admin (Promoted users)
  ↓
User (Regular customers)
```

---

## ⚡ Step 5: What Each Role Can Do {#permissions}

### 👑 **OWNER** (You)

✅ **Everything an Admin can do, PLUS:**

- ✅ Manage user roles (promote/demote admins)
- ✅ Access Admin Management panel
- ✅ View all users
- ✅ Cannot be demoted (permanent owner)

✅ **Full Access:**

- ✅ View Dashboard
- ✅ Add/Edit/Delete Products
- ✅ View all Orders
- ✅ Update Order Status
- ✅ View Statistics & Revenue

---

### 🔧 **ADMIN** (Promoted Users)

✅ **Can Do:**

- ✅ View Dashboard
- ✅ Add/Edit/Delete Products
- ✅ View all Orders
- ✅ Update Order Status
- ✅ View Statistics & Revenue

❌ **Cannot Do:**

- ❌ Manage other users
- ❌ Promote/demote admins
- ❌ Access Admin Management panel

---

### 👤 **USER** (Regular Customers)

✅ **Can Do:**

- ✅ Browse products
- ✅ Add items to cart
- ✅ Place orders
- ✅ View their own orders (future feature)

❌ **Cannot Do:**

- ❌ Access Dashboard
- ❌ Add/Edit/Delete Products
- ❌ View other users' orders
- ❌ Manage anything

---

## 🚀 Quick Start Guide

### **For You (Store Owner):**

1. **Register** → You become Owner automatically
2. **Login** → Access Dashboard
3. **Add Products** → Stock your store
4. **Manage Orders** → Track customer orders
5. **Promote Staff** → Give admin access to employees

### **For Your Staff (Admins):**

1. **Register** on the website
2. **Wait for Owner** to promote them
3. **Login** → Access Dashboard
4. **Manage Products** → Add/remove items
5. **Process Orders** → Update order status

### **For Customers:**

1. **Browse Products** → No login needed
2. **Add to Cart** → Select items
3. **Checkout** → Enter contact info
4. **Get Order Number** → Confirmation
5. **Visit Store** → Complete purchase

---

## 📞 Common Questions

### Q: I forgot my password, how do I reset it?

**A:** Password reset is not implemented yet. You'll need to:

- Contact the developer to reset it manually in database
- Or create a new account

### Q: Can I have multiple Owners?

**A:** No, there can only be ONE owner. But you can have multiple Admins.

### Q: How do I remove admin access from someone?

**A:**

1. Login as Owner
2. Click Shield icon (Admin Panel)
3. Find the user
4. Click "Revoke Admin"

### Q: Can admins see my password?

**A:** No! Passwords are encrypted (hashed) in the database. Nobody can see them.

### Q: What if I want to change my role?

**A:** The Owner role cannot be changed. If you want to transfer ownership, contact the developer.

---

## 🔒 Security Tips

1. **Use a strong password** (mix of letters, numbers, symbols)
2. **Don't share your login** with anyone
3. **Logout when done** on shared computers
4. **Only promote trusted people** to Admin
5. **Regularly review user list** in Admin Panel

---

## 📊 Accessing the Dashboard

### **URL:** `http://localhost:5173/dashboard`

### **Who Can Access:**

- ✅ Owner (you)
- ✅ Admins (promoted users)
- ❌ Regular users (will see "Access Denied")

### **What You'll See:**

- 📊 Total Orders
- ⏳ Pending Orders
- ✅ Completed Orders
- 💰 Total Revenue
- 📦 Recent Orders Table
- 🛍️ Products Overview

---

## 🎯 Summary

### **To Get Started:**

1. **Register** → Become Owner
2. **Login** → Access everything
3. **Add Products** → Stock your store
4. **Promote Staff** → Give admin access
5. **Manage Orders** → Track sales

### **To Give Admin Access:**

1. **Login as Owner**
2. **Click Shield Icon** (⚡)
3. **Find User**
4. **Click "Make Admin"**
5. **Done!** ✅

---

## 📝 Example Scenario

### **Scenario: You want to give admin access to your employee "Rajesh"**

1. **Rajesh registers** on the website

   - Name: Rajesh Kumar
   - Email: rajesh@example.com
   - Password: **\*\*\*\***

2. **You (Owner) login** to the website

3. **Click Shield icon** in navbar

4. **You see Rajesh** in the user list:

   ```
   Rajesh Kumar
   rajesh@example.com
   [Make Admin] button
   ```

5. **Click "Make Admin"**

6. **Rajesh is now Admin!** He can:

   - Access Dashboard
   - Manage Products
   - Process Orders

7. **If you want to remove his access later:**
   - Open Admin Panel again
   - Click "Revoke Admin" next to his name

---

## 🎉 You're All Set!

Your **Bharat Super Bazar** now has a complete authentication system with:

- ✅ User Registration & Login
- ✅ Role-Based Access Control
- ✅ Admin Panel for User Management
- ✅ Professional Dashboard
- ✅ Secure Password Storage

**Need help?** Check the code or ask the developer!

---

**Last Updated:** January 6, 2026
**Version:** 1.0
