Civic Issue Reporting System

A web application that allows citizens to report civic issues, authorities to monitor them, and administrators to manage the system.
The project consists of a React frontend, Node/Express backend, and an AI service for image analysis.


Installation

Clone the repository:

git clone <repository-url>
cd <project-folder>



Backend Setup

Navigate to backend folder:

cd backend

Install required packages:

npm install express mongoose cors dotenv multer axios
npm install nodemon --save-dev

Run backend server:

npm run dev



Frontend Setup

Navigate to frontend folder:

cd frontend

Install dependencies:

npm install
npm install axios

Run frontend server:

npm run dev



AI Service Setup

Navigate to AI service folder:

cd ai-service

Install Python dependencies:

pip install fastapi uvicorn opencv-python numpy

Start the AI service:

uvicorn main:app --reload --port 8000



Running the Project

Run the following services simultaneously:

Backend

cd backend
npm run dev

Frontend

cd frontend
npm run dev

AI Service

cd ai-service
uvicorn main:app --reload --port 8000



Features

- Citizens can report civic issues with images
- Authorities can view and manage issues
- Admin dashboard to monitor and delete issues
- AI-based image analysis for issue severity



Notes

- Ensure all three services are running.
- The AI service must run for image analysis features.
- Backend and frontend both run using "npm run dev".