# Ecommerce Website

A modern, full-featured ecommerce platform built for seamless online shopping experiences.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)

## Overview

This ecommerce website provides a complete online shopping solution with user authentication, product catalog management, shopping cart functionality, secure payment processing, and order management. Built with modern web technologies to ensure scalability, security, and optimal user experience.

## Features

### Customer Features
- User registration and authentication
- Product browsing with search and filtering
- Product categories and detailed product pages
- Shopping cart management
- Secure checkout process
- Multiple payment options (Credit Card, PayPal, etc.)
- Order tracking and history
- User profile management
- Wishlist functionality
- Product reviews and ratings
- Email notifications

### Admin Features
- Admin dashboard
- Product management (CRUD operations)
- Category management
- Order management and fulfillment
- User management
- Inventory tracking
- Sales analytics and reporting
- Content management
- Coupon and discount management

### Technical Features
- Responsive design (mobile-first)
- SEO optimized
- Fast loading times
- Secure data handling
- API-first architecture
- Real-time notifications
- Image optimization
- Search functionality

## Tech Stack

### Frontend
- **Framework**: React 18 
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit 
- **UI Components**: Material-UI / Ant Design
- **Forms**: React Hook Form
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL / MongoDB
- **ORM**:  Mongoose
- **Authentication**: JWT 
- **File Storage**: Cloudinary


## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL / MongoDB
- Git

### Clone Repository
```bash
git clone https://github.com/yourusername/ecommerce-website.git
cd ecommerce-website
```

### Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Database Setup
```bash
# For PostgreSQL
createdb ecommerce_db

# Run migrations
cd backend
npm run migrate

# Seed database (optional)
npm run seed
```

## Configuration

### Environment Variables

Create `.env` files in both frontend and backend directories:

#### Backend (.env)
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce_db"

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Other
NODE_ENV=development
PORT=5000
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Usage

### Development Mode
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server (in another terminal)
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:3000/admin

### Production Build
```bash
# Build frontend
cd frontend
npm run build

# Start production server
npm start
```

## API Documentation

### Authentication Endpoints
```
POST /api/auth/register     - User registration
POST /api/auth/login        - User login
POST /api/auth/logout       - User logout
GET  /api/auth/profile      - Get user profile
PUT  /api/auth/profile      - Update user profile
```

### Product Endpoints
```
GET    /api/products        - Get all products
GET    /api/products/:id    - Get product by ID
POST   /api/products        - Create product (Admin)
PUT    /api/products/:id    - Update product (Admin)
DELETE /api/products/:id    - Delete product (Admin)
```

### Order Endpoints
```
GET  /api/orders           - Get user orders
POST /api/orders           - Create new order
GET  /api/orders/:id       - Get order details
PUT  /api/orders/:id       - Update order status (Admin)
```

### Cart Endpoints
```
GET    /api/cart           - Get user cart
POST   /api/cart/add       - Add item to cart
PUT    /api/cart/:id       - Update cart item
DELETE /api/cart/:id       - Remove item from cart
```

## Database Schema

### Key Tables
- **users**: User accounts and profiles
- **products**: Product catalog
- **categories**: Product categories
- **orders**: Order information
- **order_items**: Individual order items
- **cart_items**: Shopping cart items
- **reviews**: Product reviews
- **payments**: Payment transactions

## Deployment

### Using Docker
```bash
# Build and run with Docker Compose
docker-compose up --build

# Production deployment
docker-compose -f docker-compose.prod.yml up -d
```

## Performance Optimization

- Image optimization and lazy loading
- Code splitting and lazy imports
- CDN for static assets
- Database indexing
- Caching strategies (Redis)
- Compression middleware

## Security Features

- Input validation and sanitization
- Secure headers
- Data encryption

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write tests for new features
- Update documentation
- Follow semantic commit messages

## Troubleshooting

### Common Issues
- **Database connection errors**: Check DATABASE_URL and database status
- **Payment failures**: Verify Stripe keys and webhook configuration
- **Email not sending**: Check SMTP configuration
- **Images not loading**: Verify AWS S3 or Cloudinary setup

### Support
- Create an issue on GitHub
- Check existing documentation
- Contact: simrankaur440062gmail.com

## Acknowledgments

- Thanks to all contributors
- Built with open-source technologies
- Special thanks to the community

---

**Version**: 1.0.0  
**Last Updated**: June 2025  
**Maintainer**: Simran Kaur (simrankaur44006@gmail.com)
