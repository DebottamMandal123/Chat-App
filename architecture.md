# Chat Application Architecture

This document outlines the architecture of the real-time chat application, detailing the frontend, backend, data flow, and communication protocols.

## System Architecture Diagram

The following diagram illustrates the high-level architecture of the application, including the client, server, database, and external services.

```
+-----------------------------------------------------------------------------+
|                               User's Browser                                |
|  +-----------------------------------------------------------------------+  |
|  |                             React Client                              |  |
|  | (Vite, Zustand, React Router)                                         |  |
|  +-----------------------------------------------------------------------+  |
+---------------------------------|-------------------------------------------+
                                  |
          +-----------------------+-----------------------+
          |                                               |
          | HTTP (REST API for Auth, Users, Messages)     | WebSocket (for Real-time Chat)
          v                                               v
+-----------------------------------------------------------------------------+
|                         Backend Server (Node.js/Express)                      |
|                                                                             |
|  +-----------------+   +------------------+   +---------------------------+  |
|  |   API Routes    |-->|    Middleware    |-->|        Controllers        |  |
|  | (/api/...)      |   | (Auth, Validate) |   |      (Business Logic)     |  |
|  +-----------------+   +------------------+   +-------------+-------------+  |
|                                                              |              |
|                               +------------------------------+              |
|                               |                                             |
|                               v                                             |
|  +-----------------------------------------------------------------------+  |
|  |                      WebSocket Server (Socket.io)                     |  |
|  |                     (Handles all real-time events)                    |  |
|  +-----------------------------------------------------------------------+  |
|                                      ^                                      |
|                                      | (Emits events)                       |
|                                      |                                      |
|  +-----------------------------------+------------------------------------+  |
|  |                                Models                                |  |
|  |                         (Mongoose Schemas)                           |  |
|  +-----------------------------------------------------------------------+  |
|              |                                       |                    |
+--------------|---------------------------------------|--------------------+
               |                                       |
               v                                       v
+--------------------------------+      +------------------------------------+
|      MongoDB / Mongoose        |      |        Cloudinary (File Storage)   |
|      (Database)                |      |        (Profile Pics, Images)      |
+--------------------------------+      +------------------------------------+

```

## Frontend (Client)

The client is a single-page application (SPA) built with **React** and **Vite**.

- **Framework**: React, TypeScript
- **State Management**: Zustand (`useAuthStore`, `useChatStore`) for centralized and easy-to-manage state.
- **Routing**: `react-router-dom` for navigating between pages (`Home`, `Login`, `Signup`, `Profile`).
- **Styling**: TailwindCSS (or similar utility-first CSS framework) with `shadcn/ui` components.
- **Real-time Communication**: A dedicated `socket.ts` service will manage the WebSocket connection with the server for real-time messaging and presence updates.
- **API Communication**: A service layer (`src/services/api.ts`) using `axios` will handle all HTTP requests to the backend, centralizing API logic.

### Proposed Client-side File Structure Additions
```
client/src/
├── services/
│   ├── api.ts         # Centralized Axios instance for API calls
│   └── socket.ts      # Socket.io client setup and event handling
└── ...
```

## Backend (Server)

The backend is a **Node.js** application using the **Express** framework.

- **Framework**: Express, TypeScript
- **Database**: MongoDB with **Mongoose** for data modeling (`user.model.ts`, `message.model.ts`).
- **Authentication**: JWT-based authentication implemented in `auth.middleware.ts`. Tokens are generated and sent to the client as cookies.
- **Real-time Communication**: **Socket.io** is integrated with the Express server to handle real-time events like sending/receiving messages, typing indicators, and user online status.
- **API Routes**:
    - `/api/auth`: Handles user signup, login, logout, and profile checks.
    - `/api/users`: Fetches other users for starting conversations.
    - `/api/messages`: Handles sending and retrieving chat messages.
- **Middleware**:
    - `auth.middleware.ts`: Protects routes by verifying JWT tokens.
    - `validation.middleware.ts` (New): Validates incoming request bodies to ensure data integrity before it hits the controllers.
    - `error.middleware.ts` (New): A centralized error handler to catch and format errors.
- **External Services**:
    - **Cloudinary**: Used for storing user profile pictures and any images sent in chats.

### Proposed Backend File Structure Additions
```
server/
├── middleware/
│   ├── auth.middleware.ts
│   ├── error.middleware.ts      # New: Centralized error handler
│   └── validation.middleware.ts # New: Input validation
├── socket/
│   └── socket.ts                # New: Socket.io server logic
└── ...
```

## Data & Communication Flow

### 1. User Authentication
1.  **Client**: User submits login/signup form.
2.  **API Service**: `api.ts` sends a POST request to `/api/auth/login` or `/api/auth/signup`.
3.  **Server**: The request is handled by the corresponding controller, which validates the user, creates a JWT, and sets it in an HTTP-only cookie.
4.  **Client**: The client receives the user data, stores it in the `useAuthStore`, and redirects to the home page.

### 2. Real-time Chat
1.  **Client**: After login, the `socket.ts` service establishes a WebSocket connection with the server.
2.  **Server**: The `socket.ts` handler on the server registers the new user connection and their socket ID. It can then emit events about online users.
3.  **Sending a Message**:
    - **Client**: User types and sends a message. The `useChatStore` calls a function that emits a `sendMessage` event via the WebSocket connection.
    - **Server**: The WebSocket server receives the `sendMessage` event, saves the message to the MongoDB database via the `message.controller.ts`, and then emits a `newMessage` event to the recipient's socket ID.
4.  **Receiving a Message**:
    - **Client**: The recipient's client listens for the `newMessage` event, receives the message payload, and updates the `useChatStore`, causing the UI to re-render with the new message.