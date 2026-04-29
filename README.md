# 🚀 ForgeTrack – Microservices AI Fitness Platform

A scalable AI-powered fitness tracking system built using microservices architecture, designed to simulate real-world distributed systems with API Gateway routing, service discovery, caching, and event-driven communication.

This system provides user authentication, activity tracking, AI recommendations, and analytics — all routed through a centralized API Gateway.

---

## 🧠 Architecture Overview

![Architecture](./assets/architecture.png)

This system is built on core distributed architecture principles:

Centralized API Gateway
Service discovery using Eureka Server
Externalized configuration via Spring Cloud Config
Event-driven communication using Apache Kafka
Caching layer using Redis

---

## ⚙️ System Flow

![System Flow](./assets/System-flow%20Diagram.png)

Request lifecycle:

Frontend sends request to Gateway
Gateway validates JWT token
Request routed to target microservice
Service processes data (DB / Kafka / Redis)
Response returned via Gateway

---

## 🔄 API Flow

![API Flow](./assets/API-Flow%20Diagram.png)

All requests go through Gateway
No direct service exposure
Clean routing and security handling

---

## 🗄️ Database Design

![Database](./assets/Database%20design.png)

Polyglot persistence:

PostgreSQL → user & auth data
MongoDB → activity & AI data
Redis → caching & sessions

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

## 🚀 Project Initialization (Step-by-Step Setup)

This is a distributed system, so startup order and configuration matter.

---

### 1️⃣ Clone Repository

```bash
git clone https://github.com/hardikgupta1910/ForgeTrack-Microservices-Fitness-Platform
cd MicroServices-AI-FitnessApp
```

---

### 2️⃣ Backend Setup (Correct Order)

#### Start Config Server

```bash
cd fitness-backend/configserver
mvn spring-boot:run
```

#### Start Eureka Server

```bash
cd ../eureka
mvn spring-boot:run
```

#### Start API Gateway

```bash
cd ../gateway
mvn spring-boot:run
```

#### Start Microservices

```bash
cd ../userservice
mvn spring-boot:run

cd ../authservice
mvn spring-boot:run

cd ../activityservice
mvn spring-boot:run

cd ../aiservice
mvn spring-boot:run
```

---

### 3️⃣ Database Setup

- PostgreSQL → user/auth  
- MongoDB → activity/AI  
- Redis → caching  

#### Using Docker

```bash
docker-compose up -d postgres mongo redis kafka
```

---

### 4️⃣ Environment Configuration

Example:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/fitness
spring.data.mongodb.uri=mongodb://localhost:27017/fitness
spring.redis.host=localhost
jwt.secret=your-secret-key
```

---

### 5️⃣ Frontend Setup

```bash
cd fitness-frontend
npm install
npm run dev
```

Frontend runs on:
http://localhost:5173

---

### 6️⃣ Verification

- Eureka → http://localhost:8761  
- Gateway → http://localhost:8084  

All services must be registered in Eureka.

---

### 7️⃣ Full Docker Run (Optional)

```bash
docker-compose up --build
```

---

## 📁 Project Structure
```
MicroServices-AI-FitnessApp/
│
├── fitness-frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── vite.config.js
│
├── fitness-backend/
│ ├── gateway/
│ ├── userservice/
│ ├── activityservice/
│ ├── aiservice/
│ ├── authservice/
│ ├── eureka/
│ ├── configserver/
│ └── docker-compose.yml
│
├── assets/
│ ├── architecture.png
│ ├── System-flow Diagram.png
│ ├── API-Flow Diagram.png
│ ├── Database design.png
│ ├── Dashboard.png
│ ├── Activities.png
│ ├── AI-Chat.png
│ ├── AI-Recommendations.png
│ ├── Login.png
│ ├── Register.png
│ ├── postman-AI-chatbot.png
│ ├── postman-getAllUsers.png
│ └── postman-login.png
│
├── .gitignore
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

## ⚡ Event-Driven Architecture (Kafka Integration)

This system uses Apache Kafka for asynchronous communication between services to avoid tight coupling and improve scalability.

---

### 🔁 Event Flow

1. User performs an action (e.g., create activity)  
2. Activity Service publishes an event to Kafka  
3. Other services consume the event asynchronously  
4. System reacts without direct service-to-service calls  

---

### 🧩 Kafka Components Used

- Producer → Activity Service  
- Consumer → AI Service / Other services  
- Broker → Kafka  
- Coordinator → Zookeeper  

---

### 📌 Example Use Case

When a user logs a new activity:

- Activity Service → publishes `activity.created` event  
- AI Service → consumes event  
- AI Service → generates recommendation asynchronously  

---

### 🧠 Why Kafka is Used

- Removes tight coupling between services  
- Enables async processing  
- Improves scalability under load  
- Prevents blocking API calls  

---

### ⚠️ Important

Kafka is not used for basic CRUD.

It is only used for:
- Event-driven workflows  
- Background processing  
- Cross-service communication  

If Kafka is removed:
- Core APIs will still work  
- But async features (AI recommendations, event processing) will break  

---

### 🔍 Topics (Example)

- activity.created  
- user.registered  
- ai.requested  

---

### 🧪 What This Proves

This project is not just REST-based microservices.

It demonstrates:
- Event-driven architecture  
- Decoupled service communication  
- Real-world scalable backend design

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
