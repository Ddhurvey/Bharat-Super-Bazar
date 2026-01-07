// Test script to verify order confirmation messaging
// Run this in the browser console or as a standalone test

const testOrderConfirmation = {
    _id: "test123",
    orderNumber: "BSB00001",
    customerName: "Rajesh Kumar",
    customerEmail: "rajesh.kumar@example.com",
    customerPhone: "+91-9876543210",
    items: [
        { name: "Designer Kurta Set", quantity: 1, price: 899 },
        { name: "Men's Cotton Shirt", quantity: 2, price: 599 }
    ],
    totalAmount: 2097,
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date()
};

// To test the order confirmation:
// 1. Login as admin (admin@bharatbazar.com / admin123)
// 2. Go to Dashboard
// 3. Create an order or use existing order
// 4. Change status to "completed"
// 5. Check server terminal for output like this:

/*
Expected Console Output:

📧 ===== EMAIL SENT =====
To: rajesh.kumar@example.com
Subject: Order Confirmed - #BSB00001

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    BHARAT SUPER BAZAR
    Order Confirmation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dear Rajesh Kumar,

Your order has been confirmed! ✅

Order Number: #BSB00001
Order Date: 07/01/2026

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ORDER DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Designer Kurta Set x 1 - ₹899
Men's Cotton Shirt x 2 - ₹1198

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL AMOUNT: ₹2097
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Thank you for shopping with us!

For any queries, please contact:
📧 Email: support@bharatbazar.com
📞 Phone: +91-XXXXXXXXXX

Regards,
Bharat Super Bazar Team
Family Shopping Destination
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

========================


📱 ===== SMS SENT =====
To: +91-9876543210
Dear Rajesh Kumar, Your order #BSB00001 has been confirmed! Total: ₹2097. Thank you for shopping at Bharat Super Bazar! - Team BSB
======================
*/

console.log("Order confirmation test data ready!");
console.log("Follow the steps above to test the feature.");
