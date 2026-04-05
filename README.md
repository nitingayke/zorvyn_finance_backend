# 💰 Finance Data Processing & Access Control Backend

## Overview

This project is a backend system for a **finance dashboard application** that manages financial records and provides analytics based on user roles.

It demonstrates:

* Clean backend architecture
* Role-based access control
* Data validation and error handling
* Aggregation-based analytics APIs

---

## Workflow & First-Time Setup

This backend system is designed to manage users, roles, and financial records. Here is how it works:

1. **First User Signup**
   - If the database is empty, the first user who signs up will automatically become **ADMIN**.
   - This ADMIN user has full access to create financial records, view analytics, and manage other users.

2. **Creating Other Users**
   - After the first ADMIN is created, new users must be created by an ADMIN.
   - ADMIN can assign roles:
     - **ANALYST** → Can view records and analytics
     - **VIEWER** → Can only view their own records

3. **Authentication**
   - Users login via `POST /api/v1/auth/login` to receive a **JWT token**.
   - Include this token in the `Authorization` header (`Bearer <token>`) for protected API requests.

4. **Access Control**
   - Role-based access is enforced for all endpoints.
   - VIEWER → Only own data
   - ANALYST → Read-only + analytics
   - ADMIN → Full access (CRUD + analytics)

5. **Database**
   - The backend uses MongoDB for persistence.
   - Initially, all collections are empty. The first signup triggers the creation of the ADMIN user automatically.
  
   ---

### First Admin Credentials (for Assignment Evaluation)

To explore the backend, use the first admin credentials:

- Email: `admin@zorvyn.com`
- Password: `Admin@1234`

This user has full access (ADMIN) and can create other users, manage financial records, and view analytics.

---

## Features

### 1. User & Role Management

* Create users with roles:

  * **ADMIN** → Full access
  * **ANALYST** → View + analyze data
  * **VIEWER** → View only (own data)
* User status handling (ACTIVE / INACTIVE)
* JWT-based authentication

---

### 2. Financial Records Management

Each record contains:

* `amount`
* `type` → INCOME / EXPENSE
* `category`
* `date` (YYYY-MM-DD)
* `notes`

#### APIs:

* Create record (ADMIN)
* Get all records (ADMIN, ANALYST)
* Get single record
* Update record (ADMIN)
* Delete record (ADMIN)
* Filter by:

  * type
  * category
  * date range

---

### 3. Dashboard APIs

#### Summary

* Total Income
* Total Expense
* Net Balance

#### Category-wise totals

* Aggregation based on categories

#### Recent Activity

* Latest records (limit supported)

#### Trends

* Monthly aggregation (income vs expense)

---

### 4. Access Control Logic

| Role    | Permissions                    |
| ------- | ------------------------------ |
| ADMIN   | Full access (CRUD + analytics) |
| ANALYST | View records + analytics       |
| VIEWER  | Only view own data             |

✔ Implemented using middleware:

* `authMiddleware`
* `allowRoles`

---

### 5. Validation & Error Handling

* Custom `ApiError` for structured errors
* Input validation:

  * Amount must be positive
  * Type must be INCOME/EXPENSE
  * Date must be `YYYY-MM-DD`
  * No future dates allowed
* Proper HTTP status codes

---

##  Project Structure

```
src/
│
├── controllers/
├── services/
├── models/
├── routes/
├── middlewares/
├── validators/
├── utils/
│
└── server.js
```

---

## Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

---

## Environment Variables

Create a `.env` file:

```
PORT=2004

DB_URL=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## Getting Started

### 1. Clone the repository

```
git clone https://github.com/nitingayke/zorvyn_finance_backend.git
cd project-folder
```

### 2. Install dependencies

```
npm install
```

### 3. Run the server

```
npm run start
```

Server will run on:

```
http://localhost:2004
```

---

## API Endpoints

### Auth

* `POST /api/v1/auth/signup`
* `POST /api/v1/auth/login`

### Records

* `POST /api/v1/records`
* `GET /api/v1/records?type=INCOME&category=food&startDate=2026-01-01&endDate=2026-01-31`
* `GET /api/v1/records/:id`
* `PATCH /api/v1/records/:id`
* `DELETE /api/v1/records/:id`

### Dashboard

* `GET /api/v1/dashboard/summary`
* `GET /api/v1/dashboard/category`
* `GET /api/v1/dashboard/recent?limit=7`
* `GET /api/v1/dashboard/trends`

---

## Key Design Decisions

* **Service Layer Separation** → Keeps controllers clean
* **Aggregation Pipelines** → Used for analytics (summary, trends)
* **Role-based Filtering**

  * VIEWER → only own data
  * ANALYST → can analyze data
* **Date Handling**

  * Standardized to avoid timezone issues

---

## Live Demo
The backend is deployed and accessible at: https://zorvyn-finance-backend-7jo8.onrender.com

--- 

### Sample: Create Record
```sample
POST: http://localhost:2004/api/v1/records
{
  "amount": 70000,
  "type": "INCOME",
  "category": "Salary",
  "date": "2026-04-01",
  "notes": "Monthly salary"
}

Response:
{
  "success": true,
  "message": "Record created successfully",
  "data": {
    "amount": 70000,
    "type": "INCOME",
    "category": "salary",
    "date": "2026-04-01T00:00:00.000Z",
    "notes": "Monthly salary",
    "createdBy": "69ceb991058e4f104e1a7a00",
    "_id": "69d1e622df9bba329452c4b7",
    "createdAt": "2026-04-05T04:33:38.516Z",
    "updatedAt": "2026-04-05T04:33:38.516Z",
    "__v": 0
  }
}
```

---

##  Connect With Me
If you're working on something similar, have questions, or want to collaborate, feel free to connect! I’d love to hear from you. 🚀

-  [LinkedIn](https://www.linkedin.com/in/nitin-gayke92/)
-  [Portfolio](https://nitin-portfolio-gilt.vercel.app/)
-  gaykenitin975@gmail.com
-  [Leetcode](https://leetcode.com/u/Nitin_Gayke)
