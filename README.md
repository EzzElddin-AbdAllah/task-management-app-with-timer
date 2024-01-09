# Task Management App

## Introduction

This repository contains a Task Management App built with Node.js, Next.js, and MongoDB. The application is Dockerized for easy deployment and development.

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

- Docker
- Docker Compose

## Getting Started

Follow the steps below to start the Task Management App using Docker.

1. Clone the repository:

   ```bash
   git clone https://github.com/EzzElddin-AbdAllah/task-management-app-with-timer.git
   cd task-management-app-with-timer
   ```

2. Ensure a `.env` file in the `server` directory with the following content:

   ```env
   MONGODB_URI
   JWT_SECRET
   ```

3. Build and start the Docker containers:

   ```bash
   docker-compose up --build
   ```

   This command will build the Docker images and start the containers for the server, and the client.

4. Once the containers are running, you can access the Task Management App in your web browser:

   - Client (Next.js): [http://localhost:3000](http://localhost:3000)
   - Server (Express): [http://localhost:8000](http://localhost:8000)

## Stopping the Application

To stop the application and remove the Docker containers, run the following command:

```bash
docker-compose down
```
