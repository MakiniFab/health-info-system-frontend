# Health Information System Frontend
This is the frontend interface for the Health Information System project, designed to allow doctors (system users) to manage clients, enroll them in health programs, and track outcomes easily.
Built with a strong focus on user experience, simplicity, and efficiency, while showcasing modern frontend engineering skills.

# Features
User Authentication
Login page to access the system securely (using JWT tokens)
Client Management
Create and view registered clients
Search clients by first name, last name, or huduma number
Program Management
Create health programs (TB, HIV, Malaria, etc.)
List all available programs
Enrollment Management
Enroll clients into one or more health programs
Outcome Tracking
Add program-specific outcomes for each client
Activity Log
View a full history of all doctor actions (client registration, enrollment, outcomes)
Modern UI/UX
Responsive design
Simple, clean, and intuitive user interactions
Real-time feedback (success and error notifications)

# Live Backend API
This frontend communicates with the deployed backend:
🔗 Live Backend API - Render
All API routes are secured with JWT and follow RESTful principles.

Backend live API URL: https://health-info-system-backend.onrender.com

Link to backend git repository: https://github.com/MakiniFab/health-info-system-backend.git

Demo video: src/assets/presentation video

🛠 Technologies Used

Technology	Purpose
React	Building the frontend user interface
Vite	Fast build tool and dev server
Axios	Handling API requests to the backend
React Router	Managing navigation across pages

🚀 How to Run Locally
Clone the repository:
git clone https://MakiniFab/health-information-system-frontend.git
cd health-information-system-frontend
Install dependencies:

npm install
Start the development server:


npm run dev
Visit:
http://localhost:5173
🌍 Deployment
To deploy on Render or any other platform:

Build the optimized production files:

npm run build
Serve the dist/ folder using a static hosting service (like Render, Netlify, Vercel).
On Render, set the build command as npm run build and start command as npm run preview or serve the dist/ folder using a static site server.

Link to my website "https://health-info-system-frontend.onrender.com"

🔐 Security Considerations
JWT tokens are securely stored in memory (or local storage).
Protected routes ensure unauthorized users are redirected to login.
Minimal data exposure on the frontend.
Proper error handling for failed API calls.

📈 How I Addressed the Challenge
Clean, maintainable code following component-driven design.
Separation of Concerns: Pages, components, and services are neatly separated.
Security First: JWT tokens protect sensitive operations.
User Friendly: Simple forms and feedback systems guide the user clearly.
API-First Mindset: Frontend built around backend APIs.

🌟 What Could Be Added Next
Full error boundary handling for unexpected frontend crashes
Role-based authentication (admin vs doctor users)
Real-time updates using WebSockets
Progressive Web App (PWA) features for offline access
Unit and integration tests (React Testing Library)

👨‍💻 Author
Farbean Makini
Frontend Developer passionate about clean UI, secure systems, and building scalable frontend solutions.
