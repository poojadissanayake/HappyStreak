# Controllers

This folder contains the controller logic. Controllers handle incoming HTTP requests, perform necessary operations (e.g., data manipulation, database queries), and send appropriate responses to the client. They act as the intermediary between the routes and the models.

## What to Add:
- **Controller Files**: Create controllers that handle specific actions for each resource or feature, like user authentication, challenge management.
  - Example: `userController.js`, `challengeController.js`
- Each controller should import the necessary models (e.g., `User`, `Challenge`) and services to handle business logic, interact with the MongoDB database via Mongoose, and respond to client requests.

## Example Structure:
- **`userController.js`**: Handles user related actions such as registration, login, profile updates (if we are to allow users the ability to update their profiles?), and retrieving user details.
- **`challengeController.js`**: Manages the creation, updating, and deletion of challenges, as well as retrieving challenge data.