# PudgyPals

**_PudgyPals is a straightforward app designed exclusively for tracking weight changes, simplifying the process of initiating weight-related goals for users._**

## Preview

![demo](./src/assets/proposal_assets/giphy.webp)

A capstone project from [BrainStation's](https://brainstation.io/) Software Engineering Jan 2024 bootcamp cohort. The backend server can be found [here](https://github.com/GrAgonBi/pudgypals-api).

## Deployment

Access the pudgypals online via [PudgyPals](https://pudgypals.netlify.app)

To browse the app, you can:

- create your own account or
- use our demo account
  - email: user1@example.com
  - password: user1

## Overview

### Problem

Obesity is a problem that many people face now, including myself. Making the decision to lose weight is not easy in itself. Most apps on the market are often integrated with various functions that can be overwhelming and seem overly complicated. This can make losing weight seem like an even more daunting task. Therefore, I decided to create PudgyPals. PudgyPals is a simple and straightforward app that is designed solely for tracking weight changes. This will make it easier for people to take the first step towards their weight loss goals.

### User Profile

#### Who will use it?

- People looking to lose weight or manage their weight.
- Individuals who are self-motivated and want a simple tool to track progress.
- People who find other weight loss apps overwhelming or complex.
- Users who may be discouraged by the difficulty of weight loss and need a clear starting point.

#### How will they use it?

- Regularly log their weight to monitor changes over time.
- See a clear and simple record of their weight loss journey.
- Track progress without the distraction of additional features.
- Focus on the core goal of weight management without feeling overwhelmed.

### Features

This app would include the following list of features:

- **User accounts:** users are able to create an accoutn and log in securesly using emal and password.
- **Weight tracking:** users can easily enter their weight with a date.
- **Goal setting:** users can set achievable weight loss goals whithin the app.
- **Data visualization:** provide a clear visualization representation of weight changes over time.

## Implementation

### Tech Stack

- React
- MySQL
- Express
- Client libraries:
  - react
  - react-router-dom
  - react-calendar
  - react-Chartjs-2
  - axios
- Server libraries:
  - knex
  - express
  - bcrypt for password hashing

### APIs

- No external APIs will be used for the first sprint

### Sitemap

![](src/assets/proposal_assets/sitemap.png)

### Mockup Wireframes

![](src/assets/proposal_assets/mockups.png)

### Data

![](src/assets/proposal_assets/data.png)

### Endpoints

#### User Authentication

Register User

- Endpoint: `POST /api/auth/register`
- Parameters:
  - `username` (string): Username of the user.
  - `password` (string): Password of the user.
  - `email` (string): Email address of the user.
- Response:
  - Status Code:
    - 201 Created: User registered successfully.
    - 400 Bad Request: Invalid request parameters.
- Example Response Body:

```json
{
  "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

Login User

- Endpoint: `POST /api/auth/login`
- Parameters:
  - `username` (string): Username of the user.
  - `password` (string): Password of the user.
- Response:
  - Status Code:
    - 200 OK: User logged in successfully.
    - 401 Unauthorized: Invalid credentials.
- Example Response Body:

```json
{
  "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

#### Weight Records

Add Weight Record

- Endpoint: `POST /api/weight/add`
- Parameters:
  - `weight` (decimal): Weight value.
- Response:
  - Status Code:
    - 201 Created: Weight record inserted successfully.
    - 400 Bad Request: Invalid request parameters.
- Example Response Body:

```json
{
  "message": "Weight record inserted successfully."
}
```

Get All Weight Records

- Endpoint: `GET /api/weight/all`
- Response:
  - Status Code:
    - 200 OK: Weight records retrieved successfully.
    - 404 Not Found: No weight records found.
- Example Response Body:

```json
[
  {
    "id": "1",
    "weight": 154.3,
    "date": "2024-03-18"
  },
  {
    "id": "2",
    "weight": 152.1,
    "date": "2024-03-17"
  }
  ...
]
```

Get Last Seven Days Weight Records

- Endpoint: `GET /api/weight/past7days`
- Response:
  - Status Code:
    - 200 OK: Last seven days weight records retrieved successfully.
    - 404 Not Found: No weight records found.
- Example Response Body:

```json
[
  {
    "date": "2024-03-11",
    "weight": 154.3
  },
  {
    "date": "2024-03-12",
    "weight": 152.1
  },
  ...
]
```

Get Last Thirty Days Weight Records

- Endpoint: `GET /api/weight/past30days`
- Response:
  - Status Code:
    - 200 OK: Last thirty days weight records retrieved successfully.
    - 404 Not Found: No weight records found.
- Example Response Body:

```json
[
  {
    "date": "2024-03-11",
    "weight": 154.3
  },
  {
    "date": "2024-03-12",
    "weight": 152.1
  },
  ...
]
```

#### User Profile

Create User Profile

- Endpoint: `POST /api/user`
  - `height` (decimal): height value.
  - `initialWeight` (decimal): initial weight value.
  - `initialDate` (date): initial date.
  - `targetWeight` (decimal): target weight value.
  - `targetDate` (date): target date.
- Response:
  -Status Code:
  - 201 Created: User profile created successfully.
  - 400 Bad Request: Invalid request parameters.

Get User Profile

- Endpoint: `GET /api/user`
- Response:
  - Status Code:
    - 200 OK: User profile retrieved successfully.
    - 404 Not Found: User profile not found.
- Example Response Body:

```json
{
  "username": "example_user",
  "email": "example@example.com",
  "height": 180,
  "initialWeight": 180,
  "initialDate": "2024-01-20",
  "targetWeight": 155,
  "targetDate": "2024-04-30"
}
```

Update User Profile

- Endpoint: `PUT /api/user`
- Parameters:
  - `targetWeight` (decimal): Updated target weight value.
  - `targetDate` (date): Updated target date.
- Response:
  - Status Code:
    - 204 No Content: User profile updated successfully.
    - 404 Not Found: User profile not found.

Delete User Account

- Endpoint: `DELETE /api/user`
- Response:
  - Status Code:
    - 204 No Content: User account deleted successfully.
    - 404 Not Found: User account not found.

### Auth

- JWT auth
  - Store JWT in sessionStorage, remove when a user logs out or account deleted
  - User will be directed to the Homepage once logged in

## Roadmap

### Sprint 1

- client
  - create react project with routes and boilerplate pages
  - Signin/Login Page, InitialRecord Page, Home/Progress Page, Profile Page
  - AddWeight Modal, DeleteAccount Modal
- server
  - express project with routing, with placeholder 200 responses
  - using knex, connect to database, create migrations and seeds with sample data
  - create all the endpoints and testing using postman/thunder client

### Sprint 2

- client
  - complete Signin/Login Page, InitialRecord Page, Home/Progress Page, Profile Page
  - complete AddWeight Modal, DeleteAccount Modal
  - connecting frontend to the backend server
- server
  - add extra endpoints/HTTP methods if necessary

### Sprint 3

- Testing and Deployment

## Nice-to-haves

- User will have the option to sign up with their gmail account
- Current units is fixed to cm and lbs, will have more choices to change to inches and kg
- Reminders and Notifications to log weight regularly
- The ability to add short notes to weight entries (e.g., "Started new excercise routine") and have it displayed to the user
