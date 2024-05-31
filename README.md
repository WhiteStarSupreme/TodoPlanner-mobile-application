# Todo Planner App

A Todo Planner application built with React Native for the frontend and Node.js with Express and MongoDB for the backend. This app allows users to register, login, and manage their tasks with features like adding, editing, and deleting tasks.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and authentication (login/logout)
- Task management: Add, edit, delete tasks
- Date and time picker for task scheduling
- Priority levels for tasks
- Persist tasks using MongoDB

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB
- React Native CLI
- Android Studio (for Android development but not obligatory)

### Backend Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/todo-planner-app.git
    cd todo-planner-app
    ```

2. Install backend dependencies:

    ```sh
    cd backend
    npm install
    ```

3. Start MongoDB server:

    ```sh
    mongod
    ```

4. Start the backend server:

    ```sh
    node server.js
    ```

### Frontend Setup

1. Install frontend dependencies:

    ```sh
    cd ../frontend
    npm install
    ```

2. Connect your Android device or start an emulator.

3. Start the React Native app:

    ```sh
    npx react-native run-android
    ```

## Usage

1. Register a new user or log in with existing credentials.
2. Manage tasks by adding, editing, and deleting tasks.
3. Logout when done.

## API Endpoints

### Authentication

- **Register:** `POST /api/auth/register`
    ```json
    {
        "username": "your_username",
        "password": "your_password"
    }
    ```

- **Login:** `POST /api/auth/login`
    ```json
    {
        "username": "your_username",
        "password": "your_password"
    }
    ```

### Tasks

- **Get Tasks:** `GET /api/:username/tasks`
- **Add Task:** `POST /api/:username/tasks`
    ```json
    {
        "name": "Task name",
        "date": "2024-05-24T10:00:00.000Z",
        "hour": 10,
        "minute": 0,
        "priority": "5",
        "done": false
    }
    ```

- **Edit Task:** `PUT /api/:username/tasks/:id`
    ```json
    {
        "name": "Updated Task name",
        "date": "2024-05-25T11:00:00.000Z",
        "hour": 11,
        "minute": 0,
        "priority": "3",
        "done": true
    }
    ```

- **Delete Task:** `DELETE /api/:username/tasks/:id`

## Technologies

- **Frontend:**
  - React Native
  - AsyncStorage
  - react-native-vector-icons
  - @react-native-community/datetimepicker
  - @react-native-picker/picker

- **Backend:**
  - Node.js
  - Express
  - Mongoose
  - JWT for authentication
  - bcrypt for password hashing

## Contributing

Contributions are welcome! Please fork this repository and submit pull requests with detailed descriptions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
