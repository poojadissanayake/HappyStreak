# Models

This folder contains the data models. Models define the schema structure for the documents in your MongoDB collections, ensuring that data is consistently stored and retrieved.

## What to Add:
- **Model Definitions**: Define the data models for different resources in the applicationn, such as users and challenges.
  - Example: `User.js`, `Challenge.js`

## Example Structure:
- `User.js`: Schema for user data, including fields like `name`, `email`, `password` and timestamps.
- `Challenge.js`: Schema for challenges, including fields like `title`, `description`, `startDate`, `endDate`, and `userId`.