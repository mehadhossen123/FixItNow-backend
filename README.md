
# FixItNow 🛠️ | On-Demand Technician Booking System

FixItNow is a robust, asynchronous backend REST API engine engineered for managing on-demand home maintenance and technician servicing workflows. It features a complete transactional state machine tracking bookings from requests to execution, backed by strict referential database architecture, RBAC secure guardrails, and automated payment gateway tracking infrastructure.

---

## 🚀 Architectural Core Features

- **Centralized State Machine:** Bulletproof lifecycle validation logic capturing step-by-step order mutations (`PENDING` ➔ `ACCEPT` / `DECLINE` ➔ `PAID` ➔ `IN_PROGRESS` ➔ `COMPLETED`).
- **Relational Integrity Setup:** Strongly typed 1:1 and 1:N relations using Prisma ORM managing Users, Customers, Technicians, Bookings, Payments, and Indempotent Review models.
- **Role-Based Access Control (RBAC):** Token authentication context pipelines isolating Admin, Customer, and Technician administrative actions dynamically.
- **Relational Ledger Garbage Collection:** Bulletproof data synchronization using strategic cascade engines (`onDelete: Cascade`) to mitigate orphan structural leaks.

---

## Live url : https://fix-it-now-sigma-wheat.vercel.app


# Credentials : 
##  Admin : 
"email": "arif2.tech@gmail.com",
"password": "securepassword123"

## Customer : 

 "email": "arif5.tech@gmail.com",
 "password": "securepassword123"

 ##Technician : 
  
   "email": "mehad.tech@gmail.com",
  "password": "securepassword123"
  
  

## 🛠️ Technology Stack Matrix

- **Runtime:** Node.js, Express.js
- **Language Compiler:** TypeScript
- **Database Engine:** PostgreSQL / MongoDB (Managed via Prisma Client)
- **Validation Engine:** Zod Data Schema Validation
- **Cryptographic Security:** JSON Web Tokens (JWT), Bcrypt hashing

---





## 🛠️ Installation & Local Setup Instructions

### Prerequisites
Ensure you have **Node.js (v18+)** and your destination SQL/NoSQL database connection strings ready.

### 1. Clone & Core Dependencies Ingestion

git clone https://github.com/mehadhossen123/FixItNow-backend.git
cd FixItNow
## install dependency
npm install

### 2 .Create a .env file within the system root directory


JWT_REFRESH_SECRET="your-refresh-secret"
JWT_ACCESS_SECRET="your-access-secret"
JWT_REFRESH_EXPIRES_IN=7d
JWT_ACCESS_EXPIRES_IN=1d
PORT=3000
STRIPE_WEBHOOK_SECRET="stripe webhook secret"
APP_URL=http://localhost:3000
STRIPE_SECRET_KEY="stripe-secret-key"
DATABASE_URL="database-url"







### 3 Initialize Prisma Client Lifecycle & Database Sync
Run the database hydration and schema synchronization compilation sequences:
```bash
npx prisma generate
npx prisma db push




# API Endpoints Documentation

## Authentication Module (`/api/auth`)

| Method | Endpoint | Allowed Roles | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a new user into the system |
| `POST` | `/api/auth/login` | Public | Log in an existing user and return tokens |
| `POST` | `/api/auth/access-token` | Public | Generate a new access token using a refresh token |
| `GET` | `/api/auth/me` | Admin, Customer, Technician | Get the profile details of the logged-in user |

## Admin Module (`/api/admin`)

| Method | Endpoint | Allowed Roles | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/admin/categories` | Admin | Create a new service category |
| `GET` | `/api/admin/categories` | Admin | Fetch all available service categories |
| `GET` | `/api/admin/users` | Admin | Retrieve a list of all registered users |
| `PATCH` | `/api/admin/user/:id` | Admin | Update a specific user's status (e.g., active/banned) |
| `GET` | `/api/admin/bookings` | Admin | Retrieve all booking histories in the system |

## Customer Module (`/api/customer`)

| Method | Endpoint | Allowed Roles | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/customer/` | Public | Get all available services |
| `GET` | `/api/customer/technician` | Public | Fetch a list of all technicians |
| `GET` | `/api/customer/technicians/:id` | Public | Get detailed information about a single technician |
| `GET` | `/api/customer/categories` | Public | Get all categories available for services |
| `POST` | `/api/customer/bookings` | Customer | Create a new service booking |
| `GET` | `/api/customer/bookings` | Customer | Get all bookings related to the logged-in customer |
| `GET` | `/api/customer/bookings/:id` | Customer | Fetch details of a specific booking belonging to the customer |

## Payment Module (`/api/payment`)

| Method | Endpoint | Allowed Roles | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/payment/create` | Customer | Create a secure payment/checkout session |
| `POST` | `/api/payment/webhook` | Public (Stripe) | Process asynchronous payment events securely |
| `GET` | `/api/payment/payments` | Customer | Get payment history for the logged-in customer |
| `GET` | `/api/payment/payments/:id` | Customer | Get details of a single transaction |

## Technician Module (`/api/technician`)

| Method | Endpoint | Allowed Roles | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/technician/service` | Technician | Post or offer a new specific service skill |
| `PATCH` | `/api/technician/profile` | Technician | Update technician profile details |
| `PATCH` | `/api/technician/availability` | Technician | Toggle or update working availability status |
| `GET` | `/api/technician/bookings` | Technician | View all service bookings assigned to this technician |
| `PATCH` | `/api/technician/bookings/:id` | Technician | Update the general status of an assigned booking |
| `PATCH` | `/api/technician/bookings/in-process/:id` | Technician | Update booking status explicitly to 'In-Process' |
| `PATCH` | `/api/technician/bookings/complete/:id` | Technician | Mark an assigned booking as 'Completed' |

## Review Module (`/api/review`)

| Method | Endpoint | Allowed Roles | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/review/` | Customer | Submit a review and rating for a technician's service |

---
**Author:** [Md Mehad Hossen]

Author: [Md Mehad Hossen]