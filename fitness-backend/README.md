# 🏋️ Fitness Microservices Platform

A full-stack microservices-based fitness application with AI-powered recommendations, Redis caching, and distributed rate limiting.

---

## 📌 Overview

This project is a **distributed microservices system** built using Spring Boot and React, designed to simulate a real-world scalable backend architecture.

It includes:

* User management
* Activity tracking
* AI-powered recommendations & chat
* API Gateway with security and rate limiting
* Redis for caching and distributed control

---

## 🧱 Architecture

```
Client (React)
      ↓
API Gateway (Spring Cloud Gateway)
      ↓
---------------------------------
|  User Service (PostgreSQL)    |
|  Activity Service (MongoDB)   |
|  AI Service (Gemini API)      |
---------------------------------
      ↓
Redis (Caching + Rate Limiting)
```

---

## ⚙️ Tech Stack

### Backend

* Java (Spring Boot)
* Spring Cloud Gateway
* Spring Security (JWT)
* Redis
* Kafka (event streaming)
* PostgreSQL (User Service)
* MongoDB (Activity Service)

### Frontend

* React
* Tailwind CSS / ShadCN UI

### AI Integration

* Gemini API (Google AI)

---

## 🔑 Key Features

---

### 🔐 Authentication & Authorization

* JWT-based authentication
* Role-based access (USER / ADMIN)
* Headers used:

  * `Authorization`
  * `X-User-Id`
  * `X-User-Role`

---

### 👤 User Service

* User registration & login
* Role management
* PostgreSQL for structured data

---

### 📊 Activity Management

* Create, update, delete fitness activities
* Tracks:

  * Duration
  * Calories burned
  * Activity type
  * Additional metrics
* MongoDB used for flexible schema

---

### 🤖 AI Integration

#### 1. AI Chat

* Endpoint: `/ai/chat`
* Uses Gemini API
* Provides conversational fitness assistance

#### 2. AI Recommendations

* Endpoint: `/api/recommendations`
* Suggests activities based on user data

---

## ⚡ Redis Integration

### 1. Caching (CacheManager)

Used in:

* User Service
* Activity Service

Features:

* TTL-based caching
* JSON serialization
* Reduced database load

---

### 2. Distributed Rate Limiting (API Gateway)

Implemented using Redis atomic operations.

#### ✔ Key Concepts

* Uses `INCR` for atomic counting
* TTL-based window reset
* Distributed-safe (works across instances)

---

### 📉 Rate Limiting Rules

| Endpoint               | Limit       | Window |
| ---------------------- | ----------- | ------ |
| `/ai/chat`             | 1 request   | 60 sec |
| `/api/recommendations` | 2 requests  | 5 min  |
| Other APIs             | 5 requests  | 60 sec |
| Admin users            | 20 requests | 60 sec |

---

### 🔄 Rate Limiting Flow

1. Request hits API Gateway
2. Extract `userId` from headers
3. Generate Redis key:

   ```
   rate_limit:<userId>:<endpoint>
   ```
4. Increment counter using Redis
5. Apply TTL on first request
6. If limit exceeded → return **429 Too Many Requests**

---

### 🧠 Concurrency Handling

* Redis `INCR` ensures **atomic operations**
* Prevents race conditions under concurrent requests
* Works across distributed instances

---

## 🚫 Error Handling

* Global exception handlers implemented
* Proper HTTP status codes returned
* Rate limiting response:

```json
{
  "error": "Rate limit exceeded",
  "status": 429
}
```

---

## 🐳 Docker Setup

Services containerized using Docker:

* Redis
* Redis Insight
* Kafka

Run:

```bash
docker-compose up -d
```

---

## 🧪 Testing

### Rate Limiting

* Tested via Postman Collection Runner
* Verified:

  * Blocking after limit
  * Redis key creation
  * TTL expiry behavior

---

## 📦 Microservices

### 1. API Gateway

* Routing
* JWT validation
* Rate limiting

### 2. User Service

* Authentication
* User CRUD
* Redis caching

### 3. Activity Service

* Activity tracking
* MongoDB storage
* Kafka integration

### 4. AI Service

* Chat + Recommendations
* External API integration

---

## 🔍 Design Decisions

* Rate limiting implemented at **API Gateway level**
* Centralized control, avoids duplication
* Redis chosen for:

  * Speed
  * Atomic operations
  * TTL support
* Microservices separation for scalability

---

## ⚠️ Trade-offs

* Fixed window rate limiting (simpler but less accurate than sliding window)
* Hardcoded limits (can be externalized)

---

## 🚀 Future Improvements

* Sliding window rate limiting
* Daily user quotas
* API usage analytics
* Circuit breaker for AI service
* Dynamic role-based throttling

---

## 💡 Interview Talking Points

* Distributed rate limiting using Redis
* Gateway-level architecture design
* Concurrency handling via atomic operations
* Trade-offs in system design
* Microservices communication

---

## 🧠 Key Learnings

* Real-world API protection strategies
* Debugging distributed systems
* Proper system design boundaries
* Balancing complexity vs simplicity

---

## 📌 Conclusion

This project demonstrates:

* Scalable microservices architecture
* Secure API design
* Efficient caching and rate limiting
* AI integration in backend systems

---
