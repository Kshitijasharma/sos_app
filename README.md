🚨 Virtual Escort Web App
A modern AI-assisted Virtual Escort Service for women’s safety.
This web application allows users to share their live location with trusted contacts and receive automated safety check-ins during their journey.


✨ Features
✅ Live Location Tracking
Continuously monitors and updates your current location every 10 seconds.

✅ Safety Prompts
Every 2 minutes, the app asks you to confirm your safety. If no confirmation is received, it triggers escalation.

✅ Escalation Workflow
Automatically updates your session status to escalated and can notify emergency contacts.

✅ Beautiful UI
Built with React, Tailwind CSS, and React Icons for a clean, responsive experience.

✅ Full-Stack Ready
Includes Express.js backend APIs to create and update sessions (see backend folder).

🛠️ Tech Stack
Frontend: React + Vite + TypeScript + Tailwind CSS

Backend: Node.js + Express + MongoDB

Geolocation API: Browser-based GPS

Icons: React Icons

🚀 Getting Started
1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/virtual-escort-app.git
cd virtual-escort-app
2️⃣ Install Frontend Dependencies
bash
Copy
Edit
cd frontend
npm install
3️⃣ Install Backend Dependencies
bash
Copy
Edit
cd ../backend
npm install
4️⃣ Configure Environment Variables
Create a .env file in the backend directory:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
PORT=5000
5️⃣ Start Backend Server
bash
Copy
Edit
npm run dev
Server will run on http://localhost:5000.

6️⃣ Start Frontend Development Server
bash
Copy
Edit
cd ../frontend
npm run dev
Frontend will run on http://localhost:5173.

🌐 Usage
Open the app in your browser.

Click "Start Escort Session".

This creates a session and starts tracking your location.

Respond to safety prompts.

Confirm you are safe or let it escalate automatically.

Watch your session status and location updates.

📂 Project Structure
css
Copy
Edit
virtual-escort-app/
├── backend/
│   ├── server.js
│   ├── routes/
│   └── models/
├── frontend/
│   ├── src/
│   │   ├── EscortSession.tsx
│   │   └── main.tsx
│   └── index.html
└── README.md
🧩 Future Enhancements
SMS/Email notifications on escalation

ETA prediction using TensorFlow.js

Trusted contacts management

Real-time dashboard for contacts
