# 🛍️ E-Commerce Platform - ShopHub

A modern, full-featured e-commerce platform built with **React.js** frontend and **Node.js/Express** backend, featuring a beautiful UI, complete shopping cart functionality, user authentication, admin panel, and order management.

> **🎯 Portfolio Project** - Built to showcase full-stack development skills with modern technologies and best practices.

## 🌐 Live Demo

🔗 **[View Live Demo](https://your-demo-url.vercel.app)** 

> **Note**: Deploy your app and add the live URL here. See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for step-by-step free deployment instructions.

## 📸 Screenshots

> **📷 See [SCREENSHOTS_GUIDE.md](./SCREENSHOTS_GUIDE.md) for instructions on adding screenshots**

Add screenshots of:
- Home page with hero section
- Products page with filters
- Product detail with zoom
- Shopping cart
- Checkout process
- Admin panel
- User dashboard
- Orders page

Example structure:
```
screenshots/
├── home-page.png
├── products-page.png
├── product-detail.png
├── cart.png
├── checkout.png
├── dashboard.png
├── admin-panel.png
└── orders.png
```

## 🎯 Key Highlights

- ✅ **Full-Stack Application**: React frontend + Node.js/Express backend
- ✅ **Payment Gateway Integration**: Razorpay payment gateway (Test Mode - Perfect for Portfolio!)
- ✅ **Complete Authentication**: JWT-based auth with protected routes
- ✅ **Admin Panel**: Full CRUD operations for products
- ✅ **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- ✅ **Performance Optimized**: Code splitting, lazy loading, memoization
- ✅ **Security**: Input validation, XSS protection, secure authentication
- ✅ **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- ✅ **Error Handling**: Error boundaries, comprehensive error messages
- ✅ **Production Ready**: Deployment guides, environment configuration

## ✨ Features

### 🎯 Core Features
- **Product Catalog**: Browse products with categories and search functionality
- **Shopping Cart**: Add, remove, and update items with persistent storage
- **User Authentication**: Login and registration system with JWT tokens
- **Checkout Process**: Complete order placement with shipping information
- **Order Management**: View order history and track purchases
- **Admin Panel**: Full CRUD operations for product management
- **REST API Backend**: Complete Node.js/Express backend with authentication
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Beautiful interface built with Tailwind CSS

### 🔐 User Features
- User registration and login
- Personal dashboard with order statistics
- Order history with detailed information
- Shopping cart persistence across sessions

### 👨‍💼 Admin Features
- Add, edit, and delete products
- View total revenue and order statistics
- Manage product inventory
- Full product management interface

## 🚀 Tech Stack

### Frontend
- **Framework**: React.js 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: React Icons
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Payment Processing**: Razorpay
- **PWA**: Service Worker, Web Manifest
- **Testing**: Vitest

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Payment Gateway**: Razorpay
- **Email Service**: Nodemailer
- **Data Storage**: JSON file (easily replaceable with database)
- **API Documentation**: OpenAPI/Swagger ready

### DevOps & Tools
- **CI/CD**: GitHub Actions
- **Version Control**: Git
- **Package Manager**: npm
- **Code Quality**: ESLint ready

## 📦 Installation

### Quick Start (Both Frontend & Backend)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Ecommerce_platform
   ```

2. **Install all dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

4. **Start the frontend** (in a new terminal)
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
Ecommerce_platform/
├── src/                      # Frontend React app
│   ├── components/          # Reusable components
│   ├── context/             # React Context providers
│   ├── pages/               # Page components
│   ├── services/            # API service layer
│   └── data/                # Static data
├── server/                  # Backend Express API
│   ├── server.js            # Main server file
│   ├── package.json         # Backend dependencies
│   └── data.json            # Data storage (auto-created)
├── public/                  # Static assets
├── README.md                # This file
├── BACKEND_README.md        # Backend documentation
└── package.json             # Frontend dependencies
```

## 🎮 Usage

### For Regular Users

1. **Browse Products**: Navigate to the Products page to see all available items
2. **Search & Filter**: Use the search bar and category filters to find products
3. **View Details**: Click on any product to see detailed information
4. **Add to Cart**: Add products to your shopping cart
5. **Register/Login**: Create an account or login to place orders
6. **Checkout**: Proceed to checkout and complete your order
7. **Track Orders**: View your order history in the Orders page

### For Administrators

**Demo Admin Credentials:**
- Email: `admin@example.com`
- Password: `admin123`

1. **Login**: Use the admin credentials to log in
2. **Access Admin Panel**: Navigate to the Admin panel from the navbar
3. **Manage Products**: Add, edit, or delete products
4. **View Statistics**: Check total revenue and order statistics

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Orders
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order

### Statistics (Admin)
- `GET /api/stats` - Get platform statistics

See `BACKEND_README.md` for detailed API documentation.

## 🔧 Configuration

### Backend Configuration

Create a `.env` file in the `server` directory (or copy from `server/.env.example`):

```env
PORT=5000
JWT_SECRET=your-secret-key-change-in-production

# Razorpay Configuration (Required for payments)
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_KEY_SECRET=your_key_secret_here

# Email Configuration (Optional - for order confirmations)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Frontend Configuration

Create a `.env` file in the root directory (or copy from `.env.example`):

```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id_here
```

### Payment Setup

**See `RAZORPAY_SETUP.md` or `QUICK_START.md` for detailed payment configuration instructions.**

> **💡 Note for Portfolio Projects**: Test mode is **PERFECT** for demonstrating payment gateway integration skills! Recruiters understand that test mode shows the same technical implementation as live mode. You don't need to pay for live mode to showcase your skills.

Quick setup:
1. Sign up at [Razorpay.com](https://razorpay.com) (Free - No KYC needed for test mode!)
2. Get your test API keys from Razorpay Dashboard
3. Add keys to `.env` files
4. Use test card: `4111 1111 1111 1111` for testing (Indian cards only)

**Why Test Mode is Great for Portfolio:**
- ✅ Demonstrates payment gateway integration skills
- ✅ Shows understanding of API integration
- ✅ No cost - completely free
- ✅ No KYC required
- ✅ Same technical implementation as live mode
- ✅ Recruiters understand test vs live mode

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1280px+)

## 🚢 Deployment

### Deploy Backend

1. Deploy the `server` folder to Heroku, Railway, Render, or similar
2. Set environment variables on your hosting platform
3. Update frontend API URL

### Deploy Frontend

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Vercel, Netlify, or similar
3. Set `VITE_API_URL` environment variable

## 💳 Payment Features

- ✅ **Razorpay Integration**: Payment gateway integration (Test Mode)
- ✅ **Secure Checkout**: Razorpay payment gateway with proper security
- ✅ **Payment Confirmation**: Order success page after payment
- ✅ **Email Notifications**: Order confirmation emails (optional)
- ✅ **Payment Status Tracking**: Track payment status per order
- ✅ **Multiple Payment Methods**: Cards, UPI, Net Banking support

> **📝 Portfolio Note**: This project uses Razorpay in **Test Mode**, which is perfect for demonstrating payment gateway integration skills. The technical implementation is identical to live mode - only the API keys differ. Recruiters understand that test mode showcases the same integration capabilities.

## 🎨 Advanced Features

- ✅ **Product Sorting**: Sort by price, rating, name
- ✅ **Price Range Filter**: Filter products by price
- ✅ **Search Functionality**: Real-time product search
- ✅ **Recently Viewed**: Track and display recently viewed products
- ✅ **Image Zoom**: Zoom product images for better viewing
- ✅ **Breadcrumbs Navigation**: Easy navigation throughout the app
- ✅ **Loading States**: Skeleton loaders and loading spinners
- ✅ **Error Boundaries**: Graceful error handling
- ✅ **Toast Notifications**: User-friendly notifications
- ✅ **Responsive Design**: Works perfectly on all devices

## 🔮 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Product reviews and ratings system
- [ ] Wishlist/Favorites functionality
- [ ] Product recommendations engine
- [ ] Image upload functionality
- [ ] Multi-language support (i18n)
- [ ] Dark mode theme
- [ ] Shipping integration APIs
- [ ] Advanced analytics dashboard
- [ ] Email marketing integration

## 🔒 Security Features

- ✅ **Input Validation**: All user inputs are validated and sanitized
- ✅ **XSS Protection**: HTML escaping and input sanitization
- ✅ **JWT Authentication**: Secure token-based authentication
- ✅ **Password Hashing**: bcryptjs for secure password storage
- ✅ **Protected Routes**: Authentication required for sensitive pages
- ✅ **CORS Configuration**: Proper CORS setup for production
- ✅ **Error Handling**: Comprehensive error handling without exposing sensitive data

## 📝 Technical Notes

- Backend uses file-based storage (JSON) for demo purposes
- For production, integrate with MongoDB/PostgreSQL
- Authentication uses JWT tokens with secure storage
- CORS is configured for both development and production
- Password hashing is implemented with bcryptjs
- All API calls include proper error handling
- Environment variables are used for sensitive configuration

## 🧪 Testing

Run tests with:
```bash
npm test
```

View test coverage:
```bash
npm run test:ui
```

### Test Coverage
- ✅ Unit tests for utility functions
- ✅ Validation function tests
- ✅ Helper function tests
- ✅ API integration tests (ready)

## 🔄 CI/CD

GitHub Actions workflow included for:
- ✅ Automated testing on push/PR
- ✅ Build verification
- ✅ Security checks
- ✅ Code quality checks

See `.github/workflows/ci.yml` for details.

## 📱 PWA Support

The app includes Progressive Web App (PWA) features:
- ✅ Service Worker for offline support
- ✅ Web App Manifest
- ✅ Installable on mobile devices
- ✅ Caching for better performance

## 🔍 SEO & Performance

- ✅ SEO meta tags (Open Graph, Twitter Cards)
- ✅ Semantic HTML
- ✅ Lazy loading images
- ✅ Code splitting
- ✅ Performance optimizations

## 📚 Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines
- **[PROJECT_REVIEW.md](./PROJECT_REVIEW.md)** - Project review and feedback
- **[ANALYTICS_SETUP.md](./ANALYTICS_SETUP.md)** - Analytics setup guide
- **[SCREENSHOTS_GUIDE.md](./SCREENSHOTS_GUIDE.md)** - How to add screenshots
- **[IMPROVEMENTS_SUMMARY.md](./IMPROVEMENTS_SUMMARY.md)** - All improvements made

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Built with ❤️ for showcasing modern full-stack development skills.

## 🎯 Perfect for

- Portfolio projects
- Learning React.js and Node.js
- Job interviews
- GitHub showcase
- LinkedIn profile
- Full-stack development demonstration

---

**Made with React.js, Node.js, Express, and Tailwind CSS**

For detailed backend documentation, see `BACKEND_README.md`
