




# Alter Ego - Full-Stack E-Commerce Platform

_A professional, full-stack e-commerce application tailored for the Alter Ego clothing brand. This project features a robust, scalable NestJS backend and a highly responsive Next.js frontend, engineered for seamless shopping, secure payments, and a premium user experience._

## Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 15px;">
  
  <img src="/public/screenshots/home.jpg" width="30%" height="150px" alt="Home Page"/>
  <img src="/public/screenshots/product.jpg" width="30%" height="150px" alt="Product Details"/>
  <img src="/public/screenshots/checkout.jpg" width="30%" height="150px" alt="Checkout Flow"/>
  <img src="/public/screenshots/dark-mode.jpg" width="30%" height="150px" alt="Dark Mode UI"/>
  <img src="/public/screenshots/mobile.jpg" width="30%" height="150px" alt="Mobile Menu"/>
  <img src="/public/screenshots/history.jpg" width="30%" height="150px" alt="Order History"/>
</div>

---

## Target Audience
This application is designed for fashion enthusiasts and customers of the **Alter Ego** brand looking for a fast, intuitive, and secure online shopping experience across both desktop and mobile devices.

## Key Features

* **Comprehensive Shopping Flow:** Browse products on the main catalog, view specific item details on the **Product Page (by ID)**, and manage intended purchases.
* **User Authentication:** Secure **Login and Registration** pages utilizing JWT and Passport for safe user sessions.
* **Favorites (Wishlist):** A dedicated **Favorites page** allowing users to save and track their preferred clothing items for future purchases.
* **Advanced Checkout & Payments:** A streamlined **Checkout page** integrated with the **Stripe API** for secure, real-time credit card processing and transaction handling.
* **Nova Poshta Integration:** Seamless connection with the **Nova Poshta API** to fetch up-to-date cities and branch locations, ensuring accurate shipping details during checkout.
* **Order History:** A dedicated page where authenticated users can view their past purchases and order statuses.
* **Responsive & Accessible UI:** Fully responsive design featuring a dedicated **Mobile Menu** for smooth navigation on smaller screens.
* **Theming:** Integrated **Light and Dark mode** capabilities, allowing users to customize their visual experience.
* **Interactive API Documentation (Swagger):** Fully documented RESTful API with an interactive UI available via Swagger.

---

## Tech Stack & Architecture

This project is separated into a high-performance backend and a modern frontend, ensuring scalability and maintainability.

### Frontend (Client)
* **Framework:** Next.js (v16) & React (v19)
* **UI Components & Styling:** Material-UI (MUI v9) & Emotion
* **State Management:** Zustand
* **Form Handling & Validation:** React Hook Form & Yup
* **Icons & Notifications:** Lucide React, React Toastify

### Backend (Server)
* **Framework:** NestJS (v11)
* **Database & ORM:** PostgreSQL with Prisma (v7)
* **Authentication:** Passport.js, JWT, Bcrypt
* **Payment Processing:** Stripe SDK
* **API Documentation:** Swagger UI

---

## Getting Started

Follow these instructions to set up the project locally. 

### 1. Clone the Repository

```bash
git clone https://github.com/USERNAME/REPOSITORY_NAME.git
cd REPOSITORY_NAME
```

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd apps/backend

# Install dependencies
npm install

# Set up environment variables
# Create a .env file and add your PostgreSQL URI, Stripe Secret Key, and JWT Secrets

# Seed the database with initial products/data
npm run seed

# Run the development server
npm run start:dev
```

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to the frontend directory
cd apps/frontend

# Install dependencies
npm install

# Set up environment variables
# Create a .env.local file and add your backend API URL, Stripe Public Key, and Nova Poshta API Key

# Start the development server
npm run dev
```

```