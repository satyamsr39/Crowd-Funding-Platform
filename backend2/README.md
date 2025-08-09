Charity Backend (Light theme)
=============================

Steps:
1. Copy .env.example -> .env and set values (MONGODB_URI, ADMIN_USERNAME, ADMIN_PASSWORD, SESSION_SECRET, RAZORPAY keys)
2. npm install
3. npm run dev (requires nodemon) or npm start
4. Call GET /api/seed to seed sample NGOs (for dev)

Notes:
- Image uploads are saved to /uploads and served statically.
- Admin login sets an HTTP-only session cookie; use the frontend admin login to authenticate.