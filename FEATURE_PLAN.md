# Implementation Plan - New Features

## 1. Forgot Password Feature

### Frontend Changes:

- Add "Forgot Password?" link in LoginModal
- Create password reset flow (email input → verification → new password)

### Backend Changes:

- Add `/api/auth/forgot-password` endpoint
- Add `/api/auth/reset-password` endpoint
- Generate reset tokens (store in memory for now)

## 2. Responsiveness Check

### Areas to Test:

- Navigation menu (mobile hamburger)
- Product cards (grid layout)
- Shopping cart (sidebar/modal)
- Forms (login, checkout)
- Dashboard (admin panel)

### Breakpoints:

- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## 3. Order Confirmation Messaging

### Requirements:

- Send confirmation when order status changes to "completed"
- Include: Order number, items, total price, customer details
- Format: "Dear [Name], Your order #[OrderNumber] has been confirmed. Total: ₹[Amount]. Thank you for shopping at Bharat Super Bazar!"

### Implementation:

- Mock email service (console.log for now)
- Mock SMS service (console.log for now)
- Add to order status update endpoint

### Message Template:

```
Dear [Customer Name],

Your order #[Order Number] has been confirmed!

Order Details:
[Item 1] - ₹[Price]
[Item 2] - ₹[Price]
---
Total: ₹[Total Amount]

Thank you for shopping with Bharat Super Bazar!

For queries, contact us at support@bharatbazar.com
```
