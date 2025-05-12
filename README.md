# Assignment: CRUD API

## Description

The task is to implement simple CRUD API using in-memory database underneath.

Task link: [https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)

## Install project

1.  Clone the repository.
2.  Switch to develop branch (`git checkout develop`).
3.  Install dependencies (`npm install`).
4.  Rename `.env.example` file to `.env`.

## Scripts

- `npm run start:dev` - to start the app in **development mode**
- `npm run start:prod` - to start the app in **production mode**
- `npm run start:multi` - to start horizontally scaled app
- `npm run test` - to run tests

## Endpoints

GET `/api/users` - get all users

GET `/api/users/{userId}` - get user by id

POST `/api/userscreate` - create user

PUT `/api/users/{userId}` - edit user

DELETE `/api/users/{userId}` - delete user

GET `/server/error` - generate an error to test answer with status code `500`
