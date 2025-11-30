# 🌸 Scentlab - Premium Perfume Catalog & Comparison Platform

A sophisticated web application for browsing, comparing, and managing premium perfumes. Built with Laravel + Inertia.js + React, featuring a beautiful burgundy and beige color scheme inspired by luxury fragrance boutiques.

![Scentlab Banner](https://images.unsplash.com/photo-1719175936556-dbd05e415913?w=1200&h=400&fit=crop)

## ✨ Features

### 🛍️ **Public Features**
- **Browse Catalog** - Explore our curated collection of premium perfumes
- **Advanced Filtering** - Filter by brand, gender, category, price range, and fragrance notes
- **Product Comparison** - Compare up to 2 fragrances side-by-side
- **Detailed Product Pages** - View comprehensive fragrance information including:
  - Fragrance notes breakdown
  - Sillage, projection, and longevity ratings
  - User reviews and ratings
  - Purchase links
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### 👤 **User Features**
- **User Authentication** - Register and login system
- **Profile Management** - Manage your personal information
- **Product Reviews** - Write and manage reviews for fragrances
- **Bookmarks** - Save favorite fragrances (UI ready)

### 👨‍💼 **Admin Features**
- **Admin Dashboard** - Overview statistics and analytics
- **Product Management** - Full CRUD operations for products
- **Product Form** - Add/Edit fragrances with detailed information
- **Review Management** - Monitor and manage user reviews

---

## 🛠️ Tech Stack

### Backend
- **Laravel 11.x** - PHP Framework
- **MySQL** - Database
- **Inertia.js** - Modern monolith architecture
- **Laravel Sanctum** - API authentication

### Frontend
- **React 18.x** - JavaScript library
- **Tailwind CSS 3.x** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library
- **Ziggy** - Laravel route helper for JavaScript

### Additional Libraries
- **Radix UI** - Accessible component primitives
- **Headless UI** - Unstyled, accessible UI components

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **PHP >= 8.2**
- **Composer**
- **Node.js >= 18.x**
- **npm or yarn**
- **MySQL >= 8.0**
- **XAMPP/LAMP/MAMP** (optional, for local development)

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/scentlab.git
cd scentlab
```

### 2. Install PHP Dependencies
```bash
composer install
```

### 3. Install Node Dependencies
```bash
npm install --legacy-peer-deps
```

### 4. Environment Configuration
```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 5. Configure Database

Edit `.env` file:
```env
APP_NAME=Scentlab
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=scentlab_database
DB_USERNAME=root
DB_PASSWORD=
```

### 6. Create Database

**Option A: Via phpMyAdmin**
1. Open `http://localhost/phpmyadmin`
2. Create new database: `scentlab_database`
3. Collation: `utf8mb4_unicode_ci`

**Option B: Via MySQL CLI**
```bash
mysql -u root -p
CREATE DATABASE scentlab_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### 7. Run Migrations & Seeders
```bash
php artisan migrate --seed
```

This will create all tables and populate with sample data including:
- 10 sample products (perfumes)
- 6 brands
- 2 users (admin & regular user)
- Sample reviews

---

## 🎮 Running the Application

### Development Mode

**Terminal 1 - Laravel Server:**
```bash
php artisan serve
```

**Terminal 2 - Vite Dev Server:**
```bash
npm run dev
```

Access the application at: **http://127.0.0.1:8000**

### Production Build
```bash
npm run build
php artisan serve
```

---

## 👥 Default User Accounts

### Admin Account
- **Email:** `admin@scentlab.com`
- **Password:** `password`
- **Access:** Full admin dashboard and product management

### Regular User Account
- **Email:** `user@example.com`
- **Password:** `password`
- **Access:** User profile, reviews, bookmarks

---

## 📁 Project Structure
```
scentlab/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── HomeController.php
│   │   │   ├── ProductController.php
│   │   │   ├── AuthController.php
│   │   │   ├── CompareController.php
│   │   │   └── Admin/
│   │   │       ├── AdminDashboardController.php
│   │   │       └── AdminProductController.php
│   │   └── Middleware/
│   │       ├── AdminMiddleware.php
│   │       └── HandleInertiaRequests.php
│   └── Models/
│       ├── User.php
│       ├── Product.php
│       ├── Brand.php
│       └── Review.php
├── database/
│   ├── migrations/
│   └── seeders/
│       ├── UserSeeder.php
│       ├── BrandSeeder.php
│       ├── ProductSeeder.php
│       └── ReviewSeeder.php
├── resources/
│   ├── css/
│   │   └── app.css
│   ├── js/
│   │   ├── Components/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── GenderBadge.jsx
│   │   │   ├── FragranceNote.jsx
│   │   │   └── ui/
│   │   ├── Layouts/
│   │   │   └── MainLayout.jsx
│   │   ├── Pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Catalog.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Compare.jsx
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Profile/
│   │   │   │   └── UserProfile.jsx
│   │   │   └── Admin/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── Products.jsx
│   │   │       └── ProductForm.jsx
│   │   └── app.jsx
│   └── views/
│       └── app.blade.php
└── routes/
    └── web.php
```

---

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--burgundy: #65000B
--burgundy-dark: #4a0008
--burgundy-light: #8b0010

/* Accent Colors */
--light-beige: #F8F6F5
--soft-gold: #D4B892
--mid-gray: #6E6E6E
```

### Typography

- **Headings:** Playfair Display (Serif)
- **Body:** Inter (Sans-serif)

---

## 🔧 Key Features Implementation

### 1. Product Filtering
```jsx
// Filter products by multiple criteria
- Brand
- Gender (Male, Female, Unisex)
- Category (Eau de Parfum, Eau de Toilette, etc.)
- Price Range (Slider)
- Fragrance Notes (Multiple selection)
- Sorting (Name, Price, Rating)
```

### 2. Product Comparison
```jsx
// Compare up to 2 products side-by-side
- Select products from catalog
- View detailed comparison
- Visual side-by-side layout
```

### 3. Review System
```jsx
// User reviews with ratings
- 5-star rating system
- Text reviews
- User attribution
- Automatic rating calculation
```

### 4. Admin Dashboard
```jsx
// Comprehensive admin panel
- Total products count
- Total reviews count
- Average rating
- Total catalog value
- Recent products table
```

---

## 🐛 Troubleshooting

### Issue: `npm run dev` errors

**Solution:**
```bash
rm -rf node_modules
npm cache clean --force
npm install --legacy-peer-deps
npm run dev
```

### Issue: Route not defined in React

**Solution:**
```bash
composer require tightenco/ziggy
php artisan route:clear
```

Ensure `@routes` is in `app.blade.php` before `@vite`.

### Issue: Database connection error

**Solution:**
- Check XAMPP MySQL is running
- Verify `.env` database credentials
- Ensure database `scentlab_database` exists

### Issue: Vite not hot reloading

**Solution:**
```bash
rm -rf node_modules/.vite
npm run dev
```

### Issue: Permission denied on storage

**Solution:**
```bash
chmod -R 775 storage bootstrap/cache
```

---

## 📱 API Endpoints

### Public Routes
```
GET  /                     - Home page
GET  /catalog              - Product catalog with filters
GET  /products/{id}        - Product detail page
GET  /compare              - Product comparison page
```

### Auth Routes
```
GET  /login                - Login page
POST /login                - Login submit
GET  /register             - Registration page
POST /register             - Registration submit
POST /logout               - Logout
```

### User Routes (Auth Required)
```
GET  /profile              - User profile
POST /products/{id}/reviews - Submit review
```

### Admin Routes (Admin Only)
```
GET  /admin/dashboard      - Admin dashboard
GET  /admin/products       - Product list
GET  /admin/products/create - Create product form
POST /admin/products       - Store product
GET  /admin/products/{id}/edit - Edit product form
PUT  /admin/products/{id}  - Update product
DELETE /admin/products/{id} - Delete product
```

---

## 🗄️ Database Schema

### Users Table
```sql
id, name, email, password, role (user|admin), timestamps
```

### Products Table
```sql
id, name, brand, price, image_url, gender, category, 
fragrance_notes (JSON), sillage, projection, longevity, 
description, purchase_link, rating, review_count, 
is_active, timestamps
```

### Reviews Table
```sql
id, product_id, user_id, rating, comment, timestamps
```

### Brands Table
```sql
id, name, logo, timestamps
```

---

## 🚢 Deployment

### Production Checklist

1. **Environment Setup**
```bash
cp .env.example .env
# Configure production values
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com
```

2. **Optimize**
```bash
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
npm run build
```

3. **Set Permissions**
```bash
chmod -R 755 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

4. **Configure Web Server**
- Point document root to `/public`
- Enable mod_rewrite (Apache) or configure Nginx

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🙏 Acknowledgments

- Laravel Framework Team
- Inertia.js Team
- React Team
- Tailwind CSS Team
- All open-source contributors

---

## 🔄 Changelog

### Version 1.0.0 (2025-01-XX)
- Initial release
- Product catalog with advanced filtering
- Product comparison feature
- User authentication and reviews
- Admin dashboard and product management
- Responsive design

---

## 🎯 Roadmap

- [ ] Advanced search with AI recommendations
- [ ] Wishlist feature
- [ ] User-to-user messaging
- [ ] Social sharing integration
- [ ] Multi-language support
- [ ] Payment gateway integration
- [ ] Mobile app (React Native)
- [ ] API for third-party integrations

---

## 📸 Screenshots

### Home Page
![Home Page](docs/screenshots/home.png)

### Product Catalog
![Catalog](docs/screenshots/catalog.png)

### Product Detail
![Product Detail](docs/screenshots/product-detail.png)

### Product Comparison
![Compare](docs/screenshots/compare.png)

### Admin Dashboard
![Admin Dashboard](docs/screenshots/admin-dashboard.png)

---

**Made by Kelompok 4 - PemWeb TI-C
