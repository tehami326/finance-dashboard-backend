# Finance Dashboard Backend

A backend REST API for a finance dashboard system built with Node.js, Express, and MongoDB.

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Features

- User authentication (register & login)
- Role based access control (admin, analyst, viewer)
- Financial transaction management (CRUD)
- Dashboard summary APIs (income, expense, balance)
- Category wise totals
- Monthly trends
- Transaction filtering by type, category, and date range
- User management (admin only)

## Setup Instructions

1. Clone the repository
   git clone https://github.com/tehami326/finance-dashboard-backend.git

2. Install dependencies
   npm install

3. Create a .env file in the root with these values
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key

4. Run the server
   npm run dev

## Roles

| Role | Permissions |
|------|------------|
| Admin | Full access - manage users, transactions, view dashboard |
| Analyst | View transactions and dashboard |
| Viewer | View dashboard only |

## API Endpoints

### Auth
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login and get token

### Transactions
- POST /api/transactions - Create transaction (admin)
- GET /api/transactions - Get all transactions with optional filters (all roles)
- PUT /api/transactions/:id - Update transaction (admin)
- DELETE /api/transactions/:id - Delete transaction (admin)

### Dashboard
- GET /api/dashboard/summary - Get total income, expense, balance (all roles)
- GET /api/dashboard/category-totals - Get category wise totals (all roles)
- GET /api/dashboard/monthly-trends - Get monthly trends (all roles)

### Users
- GET /api/user - Get all users (admin)
- PUT /api/user/:id/role - Change user role (admin)
- PUT /api/user/:id/deactivate - Deactivate user (admin)

## Filtering Transactions

GET /api/transactions?type=income
GET /api/transactions?category=salary
GET /api/transactions?from=2026-04-01&to=2026-04-30

## Assumptions and Tradeoffs

- To test the system as admin, register with role: admin. In a production system, role assignment would be restricted to admins only.
- Notes field in transactions is optional, all other fields are required.
- Soft delete is not implemented - deleting a transaction permanently removes it.
- Balance is not stored in the database - it is calculated from income and expense totals.