# BuildTrack

BuildTrack is a full-stack Construction Project Management System (CPMS) designed to help construction firms manage projects, sites, workers, and tasks from a single, centralized platform.

## Overview

BuildTrack streamlines the coordination of construction projects by providing role-based dashboards for Administrators and Registered Users. It brings together project tracking, site management, worker assignment, task handling, and reporting into one responsive web application.

## Features

- **Project Management** — Create, update, and monitor construction projects with real-time status tracking.
- **Site Management** — Manage multiple construction sites linked to their respective projects.
- **Worker Management** — Assign workers to projects and sites, and track worker analytics.
- **Task Manager** — Full CRUD task handling with a dedicated dashboard widget.
- **Reports & Analytics** — Visual reports using custom SVG-based charts (donut, horizontal bar, vertical bar).
- **Role-Based Access Control** — Separate permissions and views for Administrators and Registered Users.
- **Weather Integration** — Live weather data via the Open-Meteo API for site planning.
- **PDF/CSV Export** — Export reports directly from the browser.
- **Authentication** — Secure JWT-based login with bcrypt password hashing.

## Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- Recharts / Custom SVG components

**Backend**
- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication

## Project Structure

```text
├── backend/            # Express server, models, routes
├── client/             # React frontend
├── config/             # Configuration files
├── public/             # Static assets
└── src/                # Application source code
```

## Getting Started

```bash
# Clone the repository
git clone https://github.com/mksabc01-oss/upload.git

# Install dependencies (backend)
cd backend
npm install --legacy-peer-deps

# Install dependencies (frontend)
cd client
npm install --legacy-peer-deps

# Run the development servers
npm run dev
```
<img width="1350" height="639" alt="Screenshot 2026-07-08 221132" src="https://github.com/user-attachments/assets/4d419b21-be4e-4eb7-9d41-121eb2aff9f3" />
<img width="1024" height="490" alt="192befe1-c2e7-4c00-850c-8b6e81057500" src="https://github.com/user-attachments/assets/215ecaa9-97f1-4fb7-9f4e-7612beba0fc3" />
<img width="1345" height="652" alt="Screenshot 2026-07-08 221323" src="https://github.com/user-attachments/assets/73690e65-7bdf-454e-975d-a62f7ed31f92" />
<img width="1348" height="652" alt="Screenshot 2026-07-08 221055" src="https://github.com/user-attachments/assets/04333973-88b4-4c31-a6ac-5f37f5f45257" />
