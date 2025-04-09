# 📘 CodeSync - Learning Platform

CodeSync is a full-stack web application designed to help learners and educators connect, share resources, and enhance the learning experience. It is built using **Spring Boot** for the backend and **React.js** for the frontend.

---

## 🚀 Features

### 🧑‍🎓 User Side
- 🔐 User Authentication (JWT)
- 📚 View and enroll in courses
- 📝 Download PDFs and materials (Offline Mode)
- 💬 Comment on lessons or posts
- 📥 Download offline resources

### 👨‍💼 Admin Side
- ✍️ Add / Update / Delete Courses & Lessons
- 📊 View User Activity & Statistics
- 🧾 Generate Reports

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- React Router
- Material UI / TailwindCSS (customizable)

### Backend
- Spring Boot (Spring Web, Security, JPA)
- MySQL
- JWT Authentication
- Lombok

---

## 🧱 Project Structure

backend/ (Spring Boot) │ ├── src/main/java/com/codesync/... │ ├── application.properties │ └── pom.xml 
frontend/ (React) ├── public/ ├── src/ │ ├── components/ │ ├── pages/ │ └── App.js └── package.json

### Backend

cd backend
mvn spring-boot:run

### Frontend

cd frontend
npm install
npm start
