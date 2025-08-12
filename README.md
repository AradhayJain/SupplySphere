# 🛒 Retail Service System (RSS)

A full-stack MERN application designed to streamline the interaction between **Sellers**, **Retailers**, and **Customers** with advanced inventory, ordering, and payment capabilities.  
Built for efficiency, scalability, and a smooth user experience.

---

## 🚀 Features

### **Seller**
- **Inventory Management**  
  - Upload CSV → store data in MongoDB.  
  - Add / Delete / Update products.  
  - Minimum order quantity for each product.
- **Pricing Management**  
  - Tiered pricing for bulk orders.  
  - Special pricing for preferred retailers (credit system, discounts, exclusive products).  
  - Dynamic pricing.
- **Dashboarding** – real-time sales & stock metrics.
- **V2 Roadmap**: Suggested reorder list based on sales trends.

---

### **Retailer**
- Place bulk orders directly from marketplace.
- Access a personalized **Marketplace** view.
- Dashboard for purchase insights.
- Customer rating system for service quality.

---

### **Customer**
- View purchase history.
- Browse marketplace products.
- Add / remove items from cart.
- Single product quick-buy option.
- Razorpay checkout integration.
- Cancel orders or request replacements.
- Apply discount coupons.
- Choose delivery method.

---

### **Admin**
- Service quality tracking (“Bad” rating flagging).
- Seller/Retailer account verification via **GST No.** & **PAN Card**.
- Platform monitoring & role management.

---

## 🔐 Authentication & User Roles
- **Register / Login** using:
  - Google Login
  - Email
  - Phone Number
  - Username
  - Role (Seller / Retailer / Customer / Admin)
  - Password
- Role-based dashboard & access control.

---

## 🛠 Tech Stack

**Frontend:** React.js, TailwindCSS, JavaScript  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Authentication:** JWT, Google OAuth  
**Payments:** Razorpay API  
**File Handling:** CSV upload for bulk product imports

---

## 👨‍💻 Team
- **Frontend:** Anirudhha  
- **Backend:** Aradhay  

---

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/retail-service-system.git
   cd retail-service-system
