# Task Management App

## Introduction

This repository contains a Task Management App built with Node.js, Next.js, and MongoDB. The application uses **npm workspaces** for monorepo management and is also Dockerized for easy deployment.

## Features

### Backend

1.  Secure Authentication APIs:

    - Register users

    - Login users

2.  Task Management System:

    - Create, edit, and delete tasks (CRUD)
    - Each task includes (id, title, status, time spent on the task, and the user who created the task)
    - Users can perform CRUD operations on their tasks only

3.  Task Search:

    - Users can search for their tasks by title

4.  Time Tracking System:

    - Time tracking integration with the frontend
    - Return time spent on development for each task

## Frontend

1. Login and Registration Pages:

   - Users can log in and register for an account

2. Homepage:

   - Protected for logged-in users only
   - Users can view their tasks on the homepage
   - Task CRUD operations are performed from the homepage
   - Search input allows users to search for tasks

3. Time Tracking:

   - Users can track only one task at a time
   - Time counter updates in the format of (HH:MM:SS) while tracking a task
   - Integration with the backend time tracking system

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (version 10 or higher)

## Getting Started

### Development (npm workspaces)

1. Clone the repository:

   ```bash
   git clone https://github.com/EzzElddin-AbdAllah/task-management-app-with-timer.git
   cd task-management-app-with-timer
   ```

2. Install all dependencies:

   ```bash
   npm install
   ```

   This will install dependencies for both the client and server workspaces.

3. Set up environment variables:

   Create a `.env` file in the `task-management-app-server` directory with the following content:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start development servers for both client and server:

   ```bash
   npm run dev
   ```

   This command will start both applications in parallel:

   - Client (Next.js): [http://localhost:3000](http://localhost:3000)
   - Server (Express): [http://localhost:8000](http://localhost:8000)

### Available Commands

Run these commands from the **root directory**:

- `npm run dev` - Start development servers for all workspaces
- `npm run build` - Build all workspaces for production
- `npm run lint` - Run linting across all workspaces
- `npm run start` - Start production servers

### Docker Deployment (Alternative)

If you prefer using Docker:

1. Ensure a `.env` file exists in the `task-management-app-server` directory

2. Build and start the Docker containers:

   ```bash
   docker-compose up --build
   ```

3. Access the application:

   - Client (Next.js): [http://localhost:3000](http://localhost:3000)
   - Server (Express): [http://localhost:8000](http://localhost:8000)

4. To stop the application:

   ```bash
   docker-compose down
   ```

## Project Structure

```
task-management-app/
├── task-management-app-client/  # Next.js frontend workspace
├── task-management-app-server/  # Express.js backend workspace
├── package.json                 # Root package with workspace config
├── turbo.json                  # Turborepo pipeline configuration
└── docker-compose.yml          # Docker
```
