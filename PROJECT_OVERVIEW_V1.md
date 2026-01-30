# Elite Motors - Project Overview v1.0

> **Last Updated**: January 30, 2026  
> **Project Type**: Premium Car Dealership Web Application  
> **Status**: Production-Ready

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Key Features](#key-features)
4. [Architecture & Structure](#architecture--structure)
5. [Data Models](#data-models)
6. [Pages & Routes](#pages--routes)
7. [Components](#components)
8. [Services & Firebase Integration](#services--firebase-integration)
9. [Styling & UI](#styling--ui)
10. [Development Setup](#development-setup)
11. [Deployment](#deployment)

---

## 🎯 Project Overview

**Elite Motors** is a modern, full-featured luxury car dealership web application built with React and TypeScript. The platform allows customers to browse premium electric vehicles, schedule test drives with package options, and complete the entire booking journey online. The application includes a complete admin dashboard for managing inventory, bookings, and dealership settings.

### Primary Goals
- **Customer Experience**: Provide a premium, intuitive browsing and booking experience
- **Admin Management**: Enable dealership staff to manage vehicles, bookings, and settings
- **Responsive Design**: Ensure excellent UX across all devices (desktop, tablet, mobile)
- **Modern UI**: Showcase vehicles with stunning visuals and smooth animations
- **Guided Tours**: Help users navigate the platform with interactive walkthroughs

---

## 🛠️ Tech Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI library for building component-based interfaces |
| **TypeScript** | 5.8.3 | Type-safe JavaScript with enhanced developer experience |
| **Vite** | 5.4.19 | Fast build tool and development server |

### Styling & UI Components
| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | 3.4.17 | Utility-first CSS framework |
| **shadcn/ui** | Latest | High-quality, accessible React components |
| **Radix UI** | Various | Unstyled, accessible component primitives |
| **Framer Motion** | 12.23.24 | Advanced animations and transitions |
| **Lucide React** | 0.462.0 | Beautiful, consistent icon library |

### Routing & State Management
| Technology | Version | Purpose |
|------------|---------|---------|
| **React Router DOM** | 6.30.1 | Client-side routing |
| **TanStack Query** | 5.83.0 | Server state management and data fetching |
| **React Hook Form** | 7.61.1 | Performant form management |
| **Zod** | 3.25.76 | Schema validation |

### Backend & Database
| Technology | Version | Purpose |
|------------|---------|---------|
| **Firebase** | 12.7.0 | Backend-as-a-Service platform |
| **Firebase Auth** | 12.7.0 | User authentication (admin login) |
| **Firestore** | 12.7.0 | NoSQL cloud database |
| **Firebase Storage** | 12.7.0 | File storage for car images |
| **Firebase Analytics** | 12.7.0 | Usage analytics |

### Additional Libraries
| Technology | Purpose |
|------------|---------|
| **React Joyride** | Interactive product tours and onboarding |
| **date-fns** | Date manipulation and formatting |
| **Recharts** | Charting library for analytics |
| **Embla Carousel** | Touch-friendly carousel component |
| **next-themes** | Dark/light theme management |
| **Sonner** | Elegant toast notifications |

---

## ✨ Key Features

### Customer-Facing Features

#### 🏠 Landing Page
- Hero section with animated elements and call-to-action
- Featured vehicles carousel
- Customer testimonials
- Brand showcase (Tesla, Porsche, Mercedes, BMW, Audi, Lucid)
- Interactive tour launch button

#### 🚙 Vehicle Catalog
- Browse 6 luxury electric vehicles:
  - Tesla Model S Plaid ($129,990)
  - Porsche Taycan Turbo S ($185,000)
  - Mercedes-Benz EQS ($102,310)
  - BMW iX M60 ($111,500)
  - Audi e-tron GT ($104,900)
  - Lucid Air Dream ($169,000)
- Filter by type (Electric, Electric Luxury, Electric SUV, Electric Sports)
- View detailed specifications (power, speed, acceleration, range)
- High-quality vehicle images from Unsplash

#### 🔍 Car Details Page
- Comprehensive vehicle information
- Image gallery
- Technical specifications
- Features list
- Pricing details
- "Schedule Test Drive" CTA

#### 📦 Package Selection
Three service tiers for test drives:
- **Basic** ($100): Standard test drive + vehicle overview
- **Premium** ($250): Extended test drive + detailed consultation + refreshments
- **Ultimate** ($500): VIP experience + professional photos + priority scheduling

#### 📅 Booking System
Multi-step booking flow:
1. Package selection
2. Personal information (name, email, phone)
3. Date and time selection
4. Additional message/requirements
5. Review and confirmation

#### ✅ Confirmation Page
- Booking summary with all details
- Booking reference number
- Next steps and what to expect
- Contact information

#### 🏆 Recently Sold
- Showcase of recently sold vehicles
- Builds credibility and trust
- Displays sale date and price

#### ℹ️ About & Contact Pages
- Company mission and values
- Dealership location and contact information
- Contact form for inquiries

#### 🎯 Interactive Tour
- Guided walkthrough using React Joyride
- Step-by-step feature introduction
- Skip or complete at any time
- Helps new users navigate the platform

### Admin Features

#### 🔐 Admin Authentication
- Secure login with Firebase Authentication
- Email/password authentication
- Session persistence
- Protected routes with authentication guards

#### 👤 Admin Registration
- Two-step registration process
- OTP verification via email
- Role-based access (admin, super_admin)

#### 📊 Admin Dashboard
- **Overview Tab**: Key metrics and statistics
- **Cars Management**: 
  - View all vehicles in inventory
  - Add new vehicles
  - Edit existing vehicles (specs, pricing, features, images)
  - Delete vehicles
  - Mark vehicles as featured
- **Bookings Management**:
  - View all customer bookings
  - Filter by status (pending, confirmed, completed, cancelled)
  - Update booking status
  - View customer details and preferences
- **Settings**:
  - Update dealership contact information
  - Modify business hours
  - Configure email and phone

### UI/UX Features

#### 🎨 Modern Design
- Professional color scheme:
  - Primary: Sky blue (#0EA5E9)
  - Accent: Teal
  - Background: Clean whites and grays
- Typography: Modern, readable fonts
- Consistent spacing and layout
- Premium, luxury aesthetic

#### 📱 Fully Responsive
- Mobile-first approach
- Optimized for all screen sizes (320px - 4K)
- Touch-friendly interactions
- Adaptive layouts

#### 🌙 Theme Support
- Built-in dark/light mode toggle
- Theme persistence
- Smooth theme transitions

#### ✨ Animations
- Smooth page transitions
- Micro-interactions on buttons and cards
- Hover effects
- Loading states
- Framer Motion animations

#### 🔔 User Feedback
- Toast notifications for actions
- Form validation messages
- Loading indicators
- Error handling

---

## 📁 Architecture & Structure

### Project Structure
```
car-journey-coach-main/
├── public/                      # Static assets
│   ├── favicon.ico
│   └── assets/
├── src/
│   ├── assets/                  # Images, logos, media files
│   ├── components/              # React components
│   │   ├── ui/                 # shadcn/ui components (49 components)
│   │   ├── admin/              # Admin-specific components
│   │   │   └── CarFormDialog.tsx
│   │   ├── layouts/            # Layout components
│   │   │   └── MainLayout.tsx
│   │   ├── CarCard.tsx         # Vehicle card display
│   │   ├── Footer.tsx          # Site footer
│   │   ├── Navbar.tsx          # Main navigation
│   │   ├── NavLink.tsx         # Navigation link component
│   │   ├── PackageCard.tsx     # Service package cards
│   │   └── ProtectedRoute.tsx  # Auth route guard
│   ├── config/                  # Configuration files
│   │   └── firebase.config.ts  # Firebase initialization
│   ├── context/                 # React Context providers
│   │   ├── AuthContext.tsx     # Authentication state
│   │   └── TourContext.tsx     # Tour state management
│   ├── data/                    # Static data
│   │   └── carsData.ts         # Vehicle data and types
│   ├── guides/                  # Tour guides
│   │   └── tourSteps.ts        # Interactive tour steps
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-toast.ts        # Toast notifications hook
│   │   ├── useBookings.ts      # Bookings data hook
│   │   └── useCars.ts          # Cars data hook
│   ├── lib/                     # Utility functions
│   │   └── utils.ts            # Helper utilities
│   ├── pages/                   # Page components
│   │   ├── Landing.tsx         # Home page
│   │   ├── CarsList.tsx        # Vehicle catalog
│   │   ├── CarDetails.tsx      # Individual vehicle details
│   │   ├── PackageSelection.tsx
│   │   ├── Booking.tsx         # Booking form
│   │   ├── Confirmation.tsx    # Booking confirmation
│   │   ├── RecentlySold.tsx    # Recently sold vehicles
│   │   ├── About.tsx           # About page
│   │   ├── Contact.tsx         # Contact page
│   │   ├── AdminLogin.tsx      # Admin login
│   │   ├── AdminCreate.tsx     # Admin registration
│   │   ├── AdminDashboard.tsx  # Admin panel
│   │   └── NotFound.tsx        # 404 page
│   ├── scripts/                 # Utility scripts
│   ├── services/                # Service layer
│   │   ├── auth.service.ts     # Authentication services
│   │   ├── firestore.service.ts # Database operations
│   │   └── storage.service.ts  # File storage
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── .env.example                 # Environment variables template
├── .gitignore
├── components.json              # shadcn/ui config
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript config
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts               # Vite configuration
```

---

## 📊 Data Models

### Car Interface
```typescript
interface Car {
  id: number;
  name: string;
  price: string;
  images: string[];
  type: string; // "Electric", "Electric Luxury", "Electric SUV", "Electric Sports"
  specs: {
    power: string;
    speed: string;
    acceleration: string;
    range: string;
  };
  description: string;
  features: string[];
  featured?: boolean;
}
```

### Booking Interface
```typescript
interface Booking {
  id?: string;
  carId: string;
  carName: string;
  packageType: 'basic' | 'premium' | 'ultimate';
  customerName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Timestamp;
}
```

### AdminProfile Interface
```typescript
interface AdminProfile {
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'super_admin';
  createdAt: Timestamp;
}
```

### RecentlySold Interface
```typescript
interface RecentlySold {
  id?: string;
  carName: string;
  price: string;
  soldDate: Timestamp;
  image: string;
}
```

### DealershipSettings Interface
```typescript
interface DealershipSettings {
  id: string;
  address: string;
  phone: string;
  email: string;
  businessHours: {
    mon_sat: string;
    sunday: string;
  };
}
```

---

## 🗺️ Pages & Routes

### Public Routes (with Navbar & Footer)
| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Landing | Homepage with hero, featured cars, testimonials |
| `/cars` | CarsList | Full vehicle catalog |
| `/car/:id` | CarDetails | Individual vehicle details |
| `/package/:id` | PackageSelection | Service package selection |
| `/booking/:id` | Booking | Booking form with personal info & scheduling |
| `/confirmation` | Confirmation | Booking confirmation page |
| `/recently-sold` | RecentlySold | Recently sold vehicles showcase |
| `/about` | About | Company information |
| `/contact` | Contact | Contact form and info |
| `/*` | NotFound | 404 error page |

### Admin Routes (Clean Layout, No Navbar/Footer)
| Route | Component | Protected | Description |
|-------|-----------|-----------|-------------|
| `/admin/login` | AdminLogin | No | Admin login page |
| `/admin/create` | AdminCreate | No | Admin registration with OTP |
| `/admin/dashboard` | AdminDashboard | Yes | Admin panel (cars, bookings, settings) |

---

## 🧩 Components

### Core Components
- **Navbar**: Main navigation with responsive mobile menu
- **Footer**: Site footer with links and contact info
- **MainLayout**: Layout wrapper with Navbar and Footer
- **ProtectedRoute**: Authentication guard for admin routes

### Feature Components
- **CarCard**: Vehicle display card with image, specs, and CTA
- **PackageCard**: Service package pricing card
- **CarFormDialog**: Admin dialog for adding/editing vehicles

### shadcn/ui Components (49 total)
Includes: Accordion, Alert Dialog, Avatar, Badge, Button, Card, Carousel, Checkbox, Collapsible, Command, Context Menu, Dialog, Dropdown Menu, Form, Hover Card, Input, Label, Menubar, Navigation Menu, Popover, Progress, Radio Group, Scroll Area, Select, Separator, Sheet, Skeleton, Slider, Switch, Table, Tabs, Textarea, Toast, Toggle, Tooltip, and more.

---

## 🔧 Services & Firebase Integration

### Firebase Configuration
- **Project ID**: `elite-motors-c3a08`
- **Auth Domain**: `elite-motors-c3a08.firebaseapp.com`
- **Enabled Services**:
  - Authentication (Email/Password)
  - Firestore Database
  - Storage
  - Analytics

### Firestore Collections

#### 1. `cars`
- Stores vehicle inventory
- Fields: name, price, images, type, specs, description, features, featured
- **Permissions**: 
  - Read: Public
  - Write: Authenticated admins only

#### 2. `bookings`
- Stores customer bookings
- Fields: carId, carName, packageType, customerName, email, phone, date, time, message, status, createdAt
- **Permissions**:
  - Create: Public
  - Read/Update/Delete: Authenticated admins only

#### 3. `admins`
- Stores admin user profiles
- Fields: uid, email, displayName, role, createdAt
- **Permissions**:
  - Read/Write: Authenticated user (own profile only)

#### 4. `recently_sold`
- Stores recently sold vehicles
- Fields: carName, price, soldDate, image
- **Permissions**:
  - Read: Public
  - Write: Authenticated admins only

#### 5. `settings`
- Stores dealership configuration
- Document ID: `contact`
- Fields: address, phone, email, businessHours
- **Permissions**:
  - Read: Public
  - Write: Authenticated admins only

### Service Layer Functions

#### auth.service.ts
- User authentication
- Admin registration
- Login/logout
- Session management

#### firestore.service.ts
**Cars:**
- `getCars()`: Fetch all vehicles
- `getCarById(id)`: Fetch single vehicle
- `getFeaturedCars()`: Fetch featured vehicles
- `addCar(carData)`: Add new vehicle (admin)
- `updateCar(id, carData)`: Update vehicle (admin)
- `deleteCar(id)`: Delete vehicle (admin)

**Bookings:**
- `createBooking(bookingData)`: Create new booking
- `getBookings()`: Fetch all bookings (admin)
- `getBookingById(id)`: Fetch single booking
- `updateBookingStatus(id, status)`: Update booking status (admin)

**Admin:**
- `createAdminProfile(uid, data)`: Create admin profile
- `getAdminProfile(uid)`: Get admin profile

**Recently Sold:**
- `getRecentlySold(limit)`: Fetch recently sold vehicles

**Settings:**
- `getDealershipSettings()`: Get dealership settings
- `updateDealershipSettings(data)`: Update settings (admin)

#### storage.service.ts
- Image upload and management
- File storage for vehicle images

### Custom Hooks

#### useCars
- Fetches and manages vehicle data
- Uses TanStack Query for caching
- Provides loading and error states

#### useBookings
- Fetches and manages booking data
- Admin-only hook
- Real-time updates with TanStack Query

---

## 🎨 Styling & UI

### Tailwind Configuration
- **Primary Color**: Sky blue (`bg-sky-500`, `text-sky-600`)
- **Accent Color**: Teal
- **Font**: System fonts with fallbacks
- **Animations**: Custom keyframes for fade-in, slide-up, etc.
- **Responsive Breakpoints**: sm, md, lg, xl, 2xl

### Global Styles (index.css)
- CSS variables for theming
- Dark mode support
- Custom scrollbar styling
- Base component styles

### Design System
- Consistent spacing (Tailwind spacing scale)
- Typography hierarchy (text-sm to text-4xl)
- Color palette with semantic naming
- Interactive states (hover, focus, active, disabled)

---

## 💻 Development Setup

### Prerequisites
- **Node.js**: v16 or higher
- **npm** or **yarn**
- **Firebase Account**: For backend services

### Installation Steps

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd car-journey-coach-main
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Firebase Setup**
   - Create Firebase project at https://console.firebase.google.com/
   - Enable Authentication (Email/Password)
   - Create Firestore Database
   - Enable Storage
   - Configure security rules

4. **Environment Variables** (Optional)
   - Copy `.env.example` to `.env`
   - Add Firebase credentials
   - Update `firebase.config.ts` if needed

5. **Start Development Server**
   ```bash
   npm run dev
   # Runs on http://localhost:5173
   ```

### Available Scripts
| Script | Command | Description |
|--------|---------|-------------|
| **dev** | `npm run dev` | Start dev server with hot reload |
| **build** | `npm run build` | Build for production |
| **build:dev** | `npm run build:dev` | Build in development mode |
| **preview** | `npm run preview` | Preview production build |
| **lint** | `npm run lint` | Run ESLint |

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```
Output: `dist/` directory

### Deployment Options
- ✅ **Vercel**: Recommended for React apps (auto-deploy from Git)
- ✅ **Netlify**: Easy deployment with continuous integration
- ✅ **GitHub Pages**: Free static site hosting
- ✅ **AWS S3 + CloudFront**: Scalable cloud hosting
- ✅ **Firebase Hosting**: Integrated with Firebase backend

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 📝 Summary

Elite Motors is a **production-ready**, fully-featured luxury car dealership application with:

✅ **6 Premium Electric Vehicles** in catalog  
✅ **Complete Booking Flow** with 3 service package tiers  
✅ **Admin Dashboard** for inventory and booking management  
✅ **Firebase Integration** with Auth, Firestore, Storage, Analytics  
✅ **Modern UI** with Tailwind CSS, shadcn/ui, and Framer Motion  
✅ **Responsive Design** optimized for all devices  
✅ **Interactive Tours** powered by React Joyride  
✅ **Type-Safe** with TypeScript  
✅ **Fast Development** with Vite and hot module replacement  
✅ **Form Validation** with React Hook Form and Zod  
✅ **State Management** with TanStack Query  
✅ **Theme Support** for dark/light modes  

The application is well-architected with a clear separation of concerns, reusable components, a robust service layer, and comprehensive Firebase integration for backend functionality.

---

**Project Repository**: [GitHub](https://github.com/Vinaypenke01/Page-Spark_ui.git) *(Frontend only)*  
**Built with ❤️**: React, TypeScript, Tailwind CSS, Firebase
