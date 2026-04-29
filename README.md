# 🚀 ForgeTrack – Microservices AI Fitness Platform

A full-stack AI-powered fitness tracking platform built using microservices architecture.

This system provides user authentication, activity tracking, AI recommendations, and analytics — all routed through a centralized API Gateway.

---

## 🧠 Architecture Overview

![Architecture](./assets/architecture.png)

---

## ⚙️ System Flow

![System Flow](./assets/System-flow%20Diagram.png)

---

## 🔄 API Flow

![API Flow](./assets/API-Flow%20Diagram.png)

---

## 🗄️ Database Design

![Database](./assets/Database%20design.png)

---

## 🧩 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Redux Toolkit

### Backend (Microservices)
- Spring Boot
- Spring Cloud Gateway
- Eureka (Service Discovery)
- Config Server

### Databases
- PostgreSQL (User/Auth Data)
- MongoDB (Activities & AI Data)
- Redis (Cache & Sessions)

### Messaging
- Kafka (Event Streaming)

### DevOps
- Docker
- Docker Compose

---

## 📁 Project Structure
```
MicroServices-AI-FitnessApp/
│
├── fitness-frontend/
├── fitness-backend/
│   ├── gateway/
│   ├── userservice/
│   ├── activityservice/
│   ├── aiservice/
│   ├── authservice/
│   ├── eureka/
│   ├── configserver/
│
├── assets/
└── README.md
```
---

## 🔐 Features

- JWT Authentication  
- API Gateway Routing  
- Microservices Communication  
- Activity Tracking System  
- AI Chat & Recommendations  
- Role-Based Access (Admin/User)  
- Redis Caching  
- Kafka Event Streaming  

---

## 📸 Frontend Screenshots

### Dashboard
![Dashboard](./assets/Dashboard.png)

### Activities
![Activities](./assets/Activities.png)

### AI Chat
![AI Chat](./assets/AI-Chat.png)

### AI Recommendations
![AI Recommendations](./assets/AI-Recommendations.png)

### Login
![Login](./assets/Login.png)

### Register
![Register](./assets/Register.png)

---

## 📡 API Testing (Postman)

### Login API
![Postman Login](./assets/postman-login.png)

### Get Users
![Postman Users](./assets/postman-getAllUsers.png)

### AI Chat
![Postman AI](./assets/postman-AI-chatbot.png)

---

## 🐳 Running with Docker

### ⚠️ Service Startup Order (IMPORTANT)

1. Config Server  
2. Eureka Server  
3. Gateway  
4. User Service  
5. Other Services (Activity, AI, Auth)

---

### 🚀 Start

docker-compose up --build

---

### 🛑 Stop

docker-compose down

---

## 🌐 Access Points

| Service | URL |
|--------|------|
| Frontend | http://localhost:5173 |
| Gateway | http://localhost:8084 |
| Eureka | http://localhost:8761 |
| Config Server | http://localhost:8888 |

---

## ⚠️ Notes

- All backend services are accessible only via Gateway  
- Do not call services directly  
- Environment variables must be configured  

---

## 👨‍💻 Author

Hardik Gupta
