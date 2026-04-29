# ForgeTrack – Full Stack AI Fitness Microservices Platform

ForgeTrack is a full-stack fitness tracking platform built using a **Spring Boot microservices architecture** and a **modern React frontend**.

It provides secure authentication, activity tracking, AI-powered insights, caching, and rate-limited APIs through a centralized API Gateway.

---

# 🚀 Overview

ForgeTrack simulates a production-like distributed system with:

* Microservices-based backend (Spring Boot)
* API Gateway for routing and security
* JWT-based authentication
* Redis caching (user + activity data)
* Rate limiting (gateway + services)
* AI-powered fitness chatbot & recommendations
* React frontend with protected routes and RBAC

---

# 🏗️ Architecture

Frontend (React) → API Gateway → Microservices → Databases / External APIs

![Architecture]
<img width="1536" height="1024" alt="ChatGPT Image Apr 29, 2026, 09_23_57 PM" src="https://github.com/user-attachments/assets/2314dc26-ea15-4119-88b7-7a296cdbdd2d" />




---

# 📸 Screenshots

![Dashboard] <img width="1366" height="768" alt="Dashboard" src="https://github.com/user-attachments/assets/5fb0d95b-7f8f-46f8-b058-7b18302d3045" />

![AI-Recommendations]<img width="1366" height="768" alt="AI-Recommendations" src="https://github.com/user-attachments/assets/037b12a2-a8c4-4d84-9a75-2d751513ce00" />

![Activities]<img width="1366" height="768" alt="Activities" src="https://github.com/user-attachments/assets/069e7f36-e365-4c1d-abcc-ef50afbd553f" />

![AI Chat](./assets/chat.pn<img width="1366" height="768" alt="AI-Chat" src="https://github.com/user-attachments/assets/ff17e54e-59ca-4b6e-9a91-c5e5f2ab8fef" />


---

# 📦 Backend Architecture

## Core Services

### Gateway Service

* Central entry point
* JWT validation (`JwtAuthFilter`)
* CORS configuration
* Redis integration
* Custom rate limiter

### Auth Service

* Handles login
* Generates JWT tokens
* Rate limiting for login protection

### User Service

* PostgreSQL database
* Redis caching
* Role management (USER / ADMIN)

### Activity Service

* MongoDB database
* Redis caching
* Calls User Service for validation

### AI Service

* AI chatbot + recommendations
* External LLM API integration
* Rate limiting

### Config Server

* Centralized configuration

### Eureka Server

* Service discovery

---

# 🗄️ Data Layer

* PostgreSQL → User data
* MongoDB → Activity data
* Redis → Caching + rate limiting

---

# 🔐 Authentication Flow

Login → JWT → Stored in frontend → Sent in Authorization header → Gateway validates → Forwarded to services

---

# 🧠 RBAC

* ROLE_USER → Normal access
* ROLE_ADMIN → Admin features

Enforced at:

* Frontend (ProtectedRoute)
* Gateway (JWT validation)

---

# ⚡ Performance & Protection

## Redis Caching

* User Service → user caching
* Activity Service → activity caching

## Rate Limiting

* Gateway → global limiter
* Auth Service → login protection
* AI Service → chatbot throttling

---

# 🌐 Frontend

## Tech Stack

* React (Vite)
* Redux Toolkit / RTK Query
* React Router DOM
* Tailwind CSS
* shadcn UI
* Axios
* Recharts

---

## Features

* Authentication (login/register)
* Protected routes
* Role-based admin access
* Dashboard analytics
* Activity tracking (CRUD)
* AI chatbot
* Recommendations page
* Profile management
* Admin user management

---

# 🔌 API Base URL

http://localhost:8084

---

# 🧪 API Testing (Postman)

Import collection from:

```
fitness-backend/postman/collection.json
```

---

# ⚙️ Setup Instructions

## Backend

```bash
docker-compose up --build
```

---

## ⚠️ Service Startup Order (Important)

1. Config Server
2. Eureka Server
3. Gateway
4. User Service
5. Auth Service
6. Activity Service
7. AI Service

If services fail initially, restart in this order:

```bash
docker-compose restart config-server
docker-compose restart eureka
docker-compose restart gateway
docker-compose restart user-service
docker-compose restart auth-service
docker-compose restart activity-service
docker-compose restart ai-service
```

---

## Frontend

```bash
cd fitness-frontend
npm install
npm run dev
```

---

## Access App

http://localhost:5173

---

# ⚠️ Limitations

* No circuit breaker / retry mechanism
* Kafka minimally used
* No distributed tracing
* No refresh token system
* Basic rate limiting implementation

---

# 🚧 Future Improvements

* Resilience4j (retry + circuit breaker)
* Full Kafka event-driven system
* Distributed tracing (Zipkin)
* Centralized logging (ELK)
* Refresh tokens
* Better UI/UX
* Unit & integration testing

---

# 🧠 Key Learnings

* Microservices architecture
* API Gateway + JWT security
* Redis caching & rate limiting
* Inter-service communication
* Full-stack integration

---

# 👤 Author

Hardik Gupta
