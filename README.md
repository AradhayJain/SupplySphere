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

.env Content

PORT = 3000
RAPID_KEY = 44a467a97bmshac69335af424410p1089bajsn5df057aa9768
RAPID_HOST = jsearch.p.rapidapi.com
MONGO_PASSWORD=Y3LsG4NUmu9xUl7W
MONGO_URI=mongodb+srv://aradhayjain2006:qgh7A6ycsMAUzPwn@cluster0.jadrgk9.mongodb.net/
CLOUDINARY_CLOUD_NAME=de7clghmd
CLOUDINARY_API_KEY=667719216635687
CLOUDINARY_API_SECRET=yQLc95EXktLHCz1ucP7Jtdb9FuA
GEMINI_API_KEY=AIzaSyA2omopZelLCT_1O-vnJKLxvaWKxoGOI4w
SUPPORT_EMAIL=aradhayjain2006@gmail.com
SUPPORT_EMAIL_PASSWORD=ozwi fovl erzd fffx
SECRET_KEY=aradhay2006
SMTP_HOST = sandbox.smtp.mailtrap.io
SMTP_PORT = 2525
SMTP_USER = 89085c310df90f
SMTP_PASS = 660f9f1a1eeabf
FROM_EMAIL=noreply@shillhire.com
FROM_NAME=NoReply ShillHire
SENDGRID_API_KEY=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
SENDGRID_FROM_EMAIL=aradhayjain2006@gmail.com
GOOGLE_CLIENT_ID = 218370217453-ogrkkq14glkqus2q0d69p60bbh59hu53.apps.googleusercontent.com


