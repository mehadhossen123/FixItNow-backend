# FixItNow 🛠️ | On-Demand Technician Booking System

FixItNow is a robust, asynchronous backend REST API engine engineered for managing on-demand home maintenance and technician servicing workflows. It features a complete transactional state machine tracking bookings from requests to execution, backed by strict referential database architecture, RBAC secure guardrails, and automated payment gateway tracking infrastructure.

---

## 🚀 Architectural Core Features

- **Centralized State Machine:** Bulletproof lifecycle validation logic capturing step-by-step order mutations (`PENDING` ➔ `ACCEPT` / `DECLINE` ➔ `PAID` ➔ `IN_PROGRESS` ➔ `COMPLETED`).
- **Relational Integrity Setup:** Strongly typed 1:1 and 1:N relations using Prisma ORM managing Users, Customers, Technicians, Bookings, Payments, and Indempotent Review models.
- **Role-Based Access Control (RBAC):** Token authentication context pipelines isolating Admin, Customer, and Technician administrative actions dynamically.
- **Relational Ledger Garbage Collection:** Bulletproof data synchronization using strategic cascade engines (`onDelete: Cascade`) to mitigate orphan structural leaks.

---

## 🛠️ Technology Stack Matrix

- **Runtime:** Node.js, Express.js
- **Language Compiler:** TypeScript
- **Database Engine:** PostgreSQL / MongoDB (Managed via Prisma Client)
- **Validation Engine:** Zod Data Schema Validation
- **Cryptographic Security:** JSON Web Tokens (JWT), Bcrypt hashing

---

## 📊 Database Entity Model (ERD Visual Representation)

    ┌──────────────┐                  ┌─────────────────┐
    │   Customer   │                  │   Technician    │
    └──────┬───────┘                  └────────┬────────┘
           │ (1)                               │ (1)
           │                                   │
           │ (N)                               │ (N)
    ┌──────▼───────┐                  ┌────────▼────────┐
    │   Booking    ◄──────────────────┤     Review      │
    └──────┬───────┘ (1:1 Relation)   └────────▲────────┘
           │ (1)                               │
           │                                   │ (1)
           │ (1)                               │
    ┌──────▼───────┐                           │
    │   Payment    ├───────────────────────────┘
    └──────────────┘ (Billing Context Relation)

 ## 🔄 Booking Operations Finite State Lifecycle

 ┌──────────────┐
    │  REQUESTED   │
    └──────┬───────┘
           │
   (Technician Action)
   Accepts / Declines
    ┌──────┴───────┐
┌──────▼───────┐┌─────▼────────┐
│   ACCEPTED   ││   DECLINED   │
└──────┬───────┘└──────────────┘
│
(Stripe Webhook Clearances)
│
┌──────▼───────┐
│     PAID     │
└──────┬───────┘
│
(Technician Trigger: Start Job)
│
┌──────▼───────┐
│ IN_PROGRESS  │
└──────┬───────┘
│
(Technician Trigger: Finish Job)
│
┌──────▼───────┐
│  COMPLETED   │
└──────────────┘


## 🛠️ Installation & Local Setup Instructions

### Prerequisites
Ensure you have **Node.js (v18+)** and your destination SQL/NoSQL database connection strings ready.

### 1. Clone & Core Dependencies Ingestion
```bash
git clone https://github.com/mehadhossen123/FixItNow-backend.git
cd FixItNow
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




---


### 3 Initialize Prisma Client Lifecycle & Database Sync
Run the database hydration and schema synchronization compilation sequences:
```bash
npx prisma generate
npx prisma db push




---
### 🚀 Postman Collection Links and api end points

| Module | Link |
| :--- | :--- |
| **🔐 Authentication Engine** | [Click to Import Auth API](https://mehad004938-2199931.postman.co/workspace/Default-workspace~58309ccd-9576-4368-9aa9-23034f07d39e/collection/56565654-13a1dcd3-c11a-40e0-8648-89389d5567e3?action=share&source=copy-link&creator=56565654) |



| **👤 Customer Panel** | [Click to Import Customer API](https://mehad004938-2199931.postman.co/workspace/Default-workspace~58309ccd-9576-4368-9aa9-23034f07d39e/collection/56565654-6299fb13-9c9f-4966-ae8d-8f9c1d624a5f?action=share&source=copy-link&creator=56565654) |



| **🛠️ Technician Panel** | [Click to Import Technician API](https://mehad004938-2199931.postman.co/workspace/Default-workspace~58309ccd-9576-4368-9aa9-23034f07d39e/collection/56565654-405959c5-b44a-4907-8664-1d538b30adaa?action=share&source=copy-link&creator=56565654) |




| **👑 Admin Dashboard** | [Click to Import Admin API](https://mehad004938-2199931.postman.co/workspace/Default-workspace~58309ccd-9576-4368-9aa9-23034f07d39e/collection/56565654-dab11313-cddf-42b1-8be9-d5d12fd7cdd8?action=share&source=copy-link&creator=56565654) |

> 💡 **How to Use:** Click on any of the links or badges above. It will open Postman in your browser where you can directly fork or import the collection into your personal workspace!

---


Author: [Md Mehad Hossen]