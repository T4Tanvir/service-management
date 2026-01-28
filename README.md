# 🛠️ Service Management System

A comprehensive service booking and management system built with modern web technologies. This platform enables customers to browse services, place orders, and get quotes, while administrators can manage all aspects of the business through an intuitive dashboard.

![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748?style=flat-square&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.11-336791?style=flat-square&logo=postgresql)

## ✨ Features

### For Customers
- 🔍 **Service Browsing**: Explore services through hierarchical categories
- 🛒 **Shopping Cart**: Add multiple services with quantity management
- 📝 **Order Placement**: Multi-step booking flow with user information collection
- ⭐ **Reviews**: Submit ratings and reviews for services
- 💬 **Free Quotes**: Request quotes for custom service requirements
- 📱 **Responsive Design**: Seamless experience across all devices

### For Administrators
- 📊 **Dashboard**: Comprehensive overview of all business operations
- 👥 **User Management**: Manage customers and staff with role-based access
- 🎯 **Order Management**: Track, update, and manage service orders
- 🔧 **Service Management**: Create and manage hierarchical service catalog
- 🖼️ **Gallery Management**: Upload and manage service images via AWS S3
- ⭐ **Review Management**: Moderate and manage customer reviews
- 💬 **Quote Management**: Handle free quote requests
- ❓ **FAQ Management**: Manage frequently asked questions
- 📢 **Feature Management**: Highlight key service features

## 🚀 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | [Next.js 15.3](https://nextjs.org) with App Router & Turbopack |
| **Language** | TypeScript |
| **Database** | PostgreSQL 16.11 |
| **ORM** | [Prisma 6.19](https://www.prisma.io) |
| **Authentication** | [NextAuth.js](https://next-auth.js.org) (Phone + Password) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs) |
| **File Storage** | AWS S3 |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | Radix UI |
| **HTTP Client** | Axios |
| **Notifications** | React Toastify |
| **Password Hashing** | bcrypt |

## 📁 Project Structure

```
service-management/
├── app/                          # Next.js App Router
│   ├── (dashboard)/              # Protected dashboard routes
│   │   └── dashboard/
│   │       ├── order-management/ # Order management interface
│   │       ├── free-quote/       # Quote request management
│   │       ├── service-management/ # Service CRUD operations
│   │       ├── users/            # User management
│   │       ├── gallery/          # Image gallery management
│   │       ├── report/           # Reports and analytics
│   │       └── layout.tsx        # Dashboard layout wrapper
│   ├── (public)/                 # Public-facing pages
│   │   ├── services/             # Service catalog
│   │   └── review/[uuid]/        # Review submission page
│   ├── api/                      # API routes
│   │   ├── auth/                 # NextAuth endpoints
│   │   ├── services/             # Service CRUD API
│   │   ├── order/                # Order management API
│   │   ├── users/                # User management API
│   │   ├── gallery/              # Gallery API
│   │   ├── review/               # Review API
│   │   ├── free-quote/           # Quote API
│   │   ├── faq/                  # FAQ API
│   │   ├── feature/              # Feature API
│   │   └── s3/                   # S3 upload endpoint
│   ├── auth/                     # Authentication pages
│   └── layout.tsx                # Root layout
│
├── components/                   # React components
│   ├── service-booking/          # Service booking flow
│   │   ├── ServicingBook.tsx     # Main booking modal
│   │   ├── ServiceSelection.tsx  # Service catalog with navigation
│   │   ├── CartSelection.tsx     # Cart management
│   │   ├── UserInfoForm.tsx      # User information form
│   │   └── OrderConfirmation.tsx # Order confirmation
│   └── ui/                       # Reusable UI components (Radix UI)
│
├── lib/                          # Utility functions
│   ├── api-client/              # API client wrappers
│   │   ├── order.ts
│   │   ├── service.ts
│   │   ├── user.ts
│   │   └── ...
│   └── services/                # Business logic services
│       ├── user_crud_service.ts
│       ├── order_crud_service.ts
│       ├── service_crud_service.ts
│       └── ...
│
├── prisma/                      # Database configuration
│   ├── schema.prisma            # Database schema
│   ├── migrations/              # Migration history
│   └── seed.ts                 # Database seeding script
│
├── store/                       # Zustand state management
│   └── serviceBookingStore.ts   # Service booking state
│
├── dtos/                        # Data Transfer Objects
│   ├── order.dto.ts
│   ├── order_item.dto.ts
│   ├── user.dto.ts
│   └── ...
│
├── type/                        # TypeScript type definitions
│   └── service.type.ts
│
├── consttant/                   # Application constants
│   └── selangorCities.ts        # City list for forms
│
├── hooks/                       # Custom React hooks (if any)
├── uitls/                       # Utility functions
│   └── db.ts                    # Prisma client singleton
│
└── public/                      # Static assets
```

## 🗄️ Database Schema

### Core Models

#### **User**
- Role-based access (CLIENT, EMPLOYEE, ADMIN)
- Phone number as unique identifier
- Profile information (name, email, address, city)
- Password hashing with bcrypt

#### **Service**
- Hierarchical structure (parent-child relationships)
- Service details with description and pricing
- Associated FAQs and Features
- Image URL support

#### **Order**
- UUID-based for public tracking
- Multiple items per order (OrderItem)
- Status tracking: REQUESTED → ACCEPTED → IN_PROGRESS → COMPLETED
- Automatic user creation/update on order placement

#### **OrderItem**
- Links orders to services
- Quantity and unit price
- Service reference

#### **Review**
- Customer ratings (1-5 stars)
- Review text
- Associated with user and service

#### **FreeQuote**
- Quote request system
- Status tracking: REQUESTED, ACCEPTED, CANCELLED
- User and message details

#### **Gallery**
- Service images stored in AWS S3
- Associated with services

#### **FAQ & Feature**
- Frequently asked questions per service
- Key features for service highlights

## 📡 API Endpoints

### Authentication
- `POST /api/auth/[...nextauth]` - NextAuth authentication

### Services
- `GET /api/services` - List all services (basic, nested, or all)
- `POST /api/services` - Create new service
- `GET /api/services/[id]` - Get specific service
- `PUT /api/services/[id]` - Update service
- `DELETE /api/services/[id]` - Delete service

### Orders
- `GET /api/order` - List all orders
- `POST /api/order` - Create new order
- `GET /api/order/[uuid]` - Get order by UUID
- `PUT /api/order/[uuid]` - Update order status

### Users
- `GET /api/users` - List all users
- `POST /api/users` - Create new user
- `GET /api/users/[id]` - Get specific user
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user
- `POST /api/users/[id]/password` - Change password

### Gallery
- `GET /api/gallery` - List all images
- `POST /api/gallery` - Upload image
- `GET /api/gallery/[id]` - Get specific image
- `PUT /api/gallery/[id]` - Update image
- `DELETE /api/gallery/[id]` - Delete image

### Reviews
- `GET /api/review` - List all reviews
- `POST /api/review` - Submit review
- `GET /api/review/[id]` - Get specific review
- `PUT /api/review/[id]` - Update review
- `DELETE /api/review/[id]` - Delete review

### Free Quotes
- `GET /api/free-quote` - List all quotes
- `POST /api/free-quote` - Create quote request
- `GET /api/free-quote/[id]` - Get specific quote
- `PUT /api/free-quote/[id]` - Update quote status
- `DELETE /api/free-quote/[id]` - Delete quote

### FAQs & Features
- `GET /api/faq` - List all FAQs
- `POST /api/faq` - Create FAQ
- `GET /api/feature` - List all features
- `POST /api/feature` - Create feature

### File Upload
- `POST /api/s3` - Upload file to AWS S3

## 🛠️ Installation & Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org)
- **pnpm** package manager - `npm install -g pnpm`
- **PostgreSQL** 16.11 - [Download](https://www.postgresql.org/download/)
- **AWS Account** (for S3) - [Create Account](https://aws.amazon.com)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd service-management
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Database Setup

#### Install PostgreSQL (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

#### Verify Installation

```bash
psql --version
# Expected: psql (PostgreSQL) 16.11
```

#### Create Database

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database
CREATE DATABASE service_management;

# Create user (optional but recommended)
CREATE USER pguser WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE service_management TO pguser;

# Exit
\q
```

### 4. Environment Configuration

Create a `.env` file in the project root:

```bash
touch .env
```

Add the following environment variables:

```env
# Database Connection
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
DATABASE_URL="postgresql://pguser:password@localhost:5432/service_management?schema=public"

# NextAuth Configuration
# Generate secret: openssl rand -base64 32
NEXTAUTH_SECRET="your-nextauth-secret-here-generate-with-openssl"

# Review Link Configuration
# Base URL for review links (http://localhost:3000/ for development)
REVIEW_LINK_BASE_URL="http://localhost:3000/"

# AWS S3 Configuration (Required for image uploads)
S3_BUCKET_NAME="your-s3-bucket-name"
S3_REGION="us-east-1"  # or your preferred region
S3_ACCESS_KEY_ID="your-aws-access-key-id"
S3_SECRET_ACCESS_KEY="your-aws-secret-access-key"

# Environment
NODE_ENV="development"
```

### 5. Database Setup

#### Generate Prisma Client

```bash
pnpm prisma generate
```

#### Run Migrations

```bash
pnpm prisma migrate dev --name init
```

This will create all database tables.

#### Seed Database (Optional)

```bash
pnpm tsx prisma/seed.ts
```

This will populate the database with sample data for testing.

### 6. Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Build production bundle |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm prisma generate` | Generate Prisma Client |
| `pnpm prisma migrate dev` | Create and run migrations |
| `pnpm prisma migrate reset` | Reset database and rerun migrations |
| `pnpm prisma studio` | Open Prisma Studio (GUI for database) |
| `pnpm tsx prisma/seed.ts` | Seed database with sample data |
| `pnpm prisma db push` | Push schema changes to database without migration |

## 🔐 Default Credentials

After running the seed script, you can use these credentials:

### Admin User
- **Phone**: +8801712345680
- **Password**: password123

### Staff User
- **Phone**: +8801712345679
- **Password**: password123

### Test Client
- **Phone**: +8801712345678
- **Password**: password123

## 🌐 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Add environment variables in Vercel dashboard
4. Deploy

**Note**: Make sure your PostgreSQL database is accessible from Vercel (use a cloud database like Supabase, Neon, or AWS RDS).

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_SECRET="your-production-secret"
REVIEW_LINK_BASE_URL="https://yourdomain.com/"
S3_BUCKET_NAME="your-production-bucket"
S3_REGION="your-region"
S3_ACCESS_KEY_ID="your-production-key"
S3_SECRET_ACCESS_KEY="your-production-secret"
NODE_ENV="production"
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Database Connection Error

**Error**: `Can't reach database server`

**Solution**:
- Ensure PostgreSQL is running: `sudo service postgresql start`
- Verify DATABASE_URL in `.env` is correct
- Check database exists: `sudo -u postgres psql -l`

#### 2. Prisma Client Not Found

**Error**: `Error: @prisma/client did not initialize yet`

**Solution**:
```bash
pnpm prisma generate
```

#### 3. Migration Conflicts

**Error**: `Migration failed`

**Solution**:
```bash
pnpm prisma migrate reset --force
pnpm prisma migrate dev --name init
```

#### 4. S3 Upload Errors

**Error**: `Access Denied` or `Credentials error`

**Solution**:
- Verify AWS credentials are correct
- Check IAM user has S3 permissions
- Ensure bucket name is correct
- Check bucket region matches configuration

#### 5. NextAuth Session Issues

**Error**: Session not persisting

**Solution**:
- Clear browser cookies
- Verify NEXTAUTH_SECRET is set
- Check database connection for session storage

## 📝 Development Workflow

### 1. Creating New Features

1. Create a new branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test thoroughly
4. Commit changes: `git commit -m "Add feature"`
5. Push and create pull request

### 2. Database Schema Changes

1. Modify `prisma/schema.prisma`
2. Create migration: `pnpm prisma migrate dev --name your-change`
3. Update TypeScript types if needed
4. Test with `pnpm prisma studio`

### 3. Adding New API Routes

1. Create route file in `app/api/`
2. Implement CRUD logic
3. Add error handling
4. Test with Postman or Thunder Client

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - The React framework
- [Prisma](https://www.prisma.io) - Database ORM
- [Radix UI](https://www.radix-ui.com) - UI components
- [Tailwind CSS](https://tailwindcss.com) - Styling framework

## 📞 Support

For support, email support@yourdomain.com or open an issue in the repository.

---

**Built with ❤️ using Next.js and TypeScript**
