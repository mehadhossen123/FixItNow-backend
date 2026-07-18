
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


### Credentials : 
# Admin : 
"email": "arif2.tech@gmail.com",
"password": "securepassword123"

# Customer : 

 "email": "arif5.tech@gmail.com",
 "password": "securepassword123"

 # Technician : 
  
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




---
### 🚀 Postman Collection Links and api end points
# API Documentation

This document provides a comprehensive list of all available API endpoints, grouped by their modules, along with their HTTP methods, required roles, and descriptions.

## Authentication Routes (`/api/auth`)
These endpoints handle user registration, authentication, and session management.

| Endpoint | Method | Allowed Roles | Description |
| :--- | :--- | :--- | :--- |
| `/register` | `POST` | Public | Register a new user into the system |
| `/login` | `POST` | Public | Log in an existing user and return tokens |
| `/access-token` | `POST` | Public | Generate a new access token using a refresh token |
| `/me` | `GET` | Admin, Customer, Technician | Get the profile details of the logged-in user |

## Admin Routes (`/api/admin`)
Endpoints dedicated to administrative management. Restricted strictly to Admin users.

| Endpoint | Method | Allowed Roles | Description |
| :--- | :--- | :--- | :--- |
| `/categories` | `POST` | Admin | Create a new service category |
| `/categories` | `GET` | Admin | Fetch all available service categories |
| `/users` | `GET` | Admin | Retrieve a list of all registered users |
| `/user/:id` | `PATCH` | Admin | Update a specific user's status (e.g., active/banned) |
| `/bookings` | `GET` | Admin | Retrieve all booking histories in the system |

## Customer Routes (`/api/customer`)
Endpoints accessible by customers for browsing and managing their bookings.

| Endpoint | Method | Allowed Roles | Description |
| :--- | :--- | :--- | :--- |
| `/` | `GET` | Public | Get all available services |
| `/technician` | `GET` | Public | Fetch a list of all technicians |
| `/technicians/:id` | `GET` | Public | Get detailed information about a single technician |
| `/categories` | `GET` | Public | Get all categories available for services |
| `/bookings` | `POST` | Customer | Create a new service booking |
| `/bookings` | `GET` | Customer | Get all bookings related to the logged-in customer |
| `/bookings/:id` | `GET` | Customer | Fetch details of a specific booking belonging to the customer |

## Payment Routes (`/api/payment`)
Handles checkout sessions, payment histories, and automated payment webhooks.

| Endpoint | Method | Allowed Roles | Description |
| :--- | :--- | :--- | :--- |
| `/create` | `POST` | Customer | Create a secure payment/checkout session |
| `/webhook` | `POST` | Public (Stripe/Provider) | Process asynchronous payment events securely |
| `/payments` | `GET` | Customer | Get payment history for the logged-in customer |
| `/payments/:id` | `GET` | Customer | Get details of a single transaction |

## Technician Routes (`/api/technician`)
Endpoints for technicians to manage their profiles, schedules, and assigned jobs.

| Endpoint | Method | Allowed Roles | Description |
| :--- | :--- | :--- | :--- |
| `/service` | `POST` | Technician | Post or offer a new specific service skill |
| `/profile` | `PATCH` | Technician | Update technician profile details |
| `/availability` | `PATCH` | Technician | Toggle or update working availability status |
| `/bookings` | `GET` | Technician | View all service bookings assigned to this technician |
| `/bookings/:id` | `PATCH` | Technician | Update the general status of an assigned booking |
| `/bookings/in-process/:id` | `PATCH` | Technician | Update booking status explicitly to 'In-Process' |
| `/bookings/complete/:id` | `PATCH` | Technician | Mark an assigned booking as 'Completed' |

## Review Routes (`/api/review`)
Endpoints handling user feedback and reviews for services provided.

| Endpoint | Method | Allowed Roles | Description |
| :--- | :--- | :--- | :--- |
| `/` | `POST` | Customer | Submit a review and rating for a technician's service |


Author: [Md Mehad Hossen]