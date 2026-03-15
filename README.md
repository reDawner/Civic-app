# 🏙️ Civic Issue Reporting System

A web application that allows **citizens** to report civic issues, **authorities** to monitor them, and **administrators** to manage the system. The project consists of a React frontend, Node/Express backend, and an AI service for image analysis.

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

---

### 2. Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install required packages:

```bash
npm install express mongoose cors dotenv multer axios
npm install nodemon --save-dev
```

Run the backend server:

```bash
npm run dev
```

---

### 3. Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
npm install axios
```

Run the frontend server:

```bash
npm run dev
```

---

### 4. AI Service Setup

Navigate to the AI service folder:

```bash
cd ai-service
```

Install Python dependencies:

```bash
pip install fastapi uvicorn opencv-python numpy
```

Start the AI service:

```bash
uvicorn main:app --reload --port 8000
```

---

## 🚀 Running the Project

Run all three services **simultaneously** in separate terminals:

| Service    | Directory     | Command                                  |
|------------|---------------|------------------------------------------|
| Backend    | `cd backend`  | `npm run dev`                            |
| Frontend   | `cd frontend` | `npm run dev`                            |
| AI Service | `cd ai-service` | `uvicorn main:app --reload --port 8000` |

---

## ✨ Features

- 🧑‍💼 **Citizens** can report civic issues with images
- 🏛️ **Authorities** can view and manage reported issues
- 🛠️ **Admin dashboard** to monitor and delete issues
- 🤖 **AI-based image analysis** for issue severity detection

---

## 📝 Notes

> ⚠️ Ensure **all three services** are running before using the application.

- The **AI service** must be running for image analysis features to work.
- Both the **backend** and **frontend** use `npm run dev` to start.
