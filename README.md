# 🚀 Event Management System (Microservices)

A full-stack Event Management application built using a microservices architecture.  
Users can view events (public), register, and authenticate using JWT.



## 🌐 Live Demo

 Live Demo: event-management-cloud.vercel.app



## 🧱 Architecture

- **API Gateway** → routes all requests  
- **Auth Service** → authentication (JWT)  
- **Event Service** → events & registrations  
- **PostgreSQL** → persistent storage  
- **Frontend (React + Vite)** → UI  

**Flow:**  
Frontend → API Gateway → (Auth / Event Services) → PostgreSQL



## ⚙️ Tech Stack

**Backend**
- Java (Spring Boot)
- Spring Cloud Gateway
- JWT
- PostgreSQL

**Frontend**
- React + Vite

**Deployment**
- Frontend: Vercel  
- Backend + DB: Render



## ✨ Features

- View events (public)
- Create events (protected)
- Register for events
- Prevent duplicate registrations
- Login (JWT-based)
- Input validation & error handling



## 🔐 Auth & Authorization

- Auth Service issues JWT tokens (with role)
- Services validate JWT using a filter
- Public APIs:
  - GET /events
  - /auth/*
- Other APIs require a valid JWT



## 🔌 API Endpoints

**Auth**
- POST /auth/login

**Events**
- GET /events → Public
- POST /events → Protected

**Registration**
- POST /events/{id}/register



**Complete Run Setup** :

Terminal 1 - Event service :

cd backend/event-service

mvn spring-boot:run

Runs On : http://localhost:8081

Terminal 2 - Auth Service :

cd backend/auth-service

mvn spring-boot:run

Runs On : http://localhost:8082

Terminal 3 - API Gateway :

cd backend/api-gateway

mvn spring-boot:run

Runs On : http://localhost:8080

Terminal 4 - Frontend :

cd frontend

npm install

npm run dev

###  Get the Code :
```bash
git clone https://github.com/<your-username>/event_management.git
cd event_management
