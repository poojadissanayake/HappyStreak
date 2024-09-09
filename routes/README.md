# Routes

This folder contains the route definitions. Routes are responsible for mapping incoming HTTP requests to specific controller functions, which handle the logic of the application.

## What to Add:
- Define all the API endpoints for the application here, organizing them by feature or resource (e.g., `userRoutes.js`, `challengeRoutes.js`).
- Each route file should:
  - Import the relevant controllers that interact with the database (MongoDB).
  - Define routes that correspond to different HTTP methods (e.g., GET, POST, PUT, DELETE).

## Example Structure:
- `userRoutes.js`: Routes related to user management (e.g., `/login`, `/register`, `/users/:id`).
- `challengeRoutes.js`: Routes for handling challenges (e.g., `/challenges`, `/challenges/:id`).