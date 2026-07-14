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
├── backend/       # Express server, models, routes
├── client/        # React frontend
├── config/        # Configuration files
├── public/        # Static assets
└── src/           # Application source code

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
