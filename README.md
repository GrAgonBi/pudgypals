# Project Title

PudgyPals

## Overview

An app allows users to monitor their weight progress, set goals, and record daily weights, providing insights and trends over time

### Problem

Obesity is a problem that many people face now, including myself. Making the decision to lose weight is not easy in itself. Most apps on the market are often integrated with various functions that can be overwhelming and seem overly complicated. This can make losing weight seem like an even more daunting task. Therefore, I decided to create PudgePals. PudgePals is a simple and straightforward app that is designed solely for tracking weight changes. This will make it easier for people to take the first step towards their weight loss goals.

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
  - react-router
  - react-datepicker
  - react-Chartjs-2
  - axios
- Server libraries:
  - knex
  - express
  - bcrypt for password hashing

### APIs

- No external APIs will be used for the first sprint

### Sitemap

![](src/proposal_assets/sitemap.png)

### Mockup Wireframes

![](src/proposal_assets/mockups.png)

### Data

![](src/proposal_assets/data.png)

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

- Endpoint: `POST /api/weight`
- Parameters:
  - `weight` (decimal): Weight value.
  - `date` (string): Date of the weight record.
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

- Endpoint: `GET /api/weight`
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

- Endpoint: `GET /api/weight/lastSevenDays`
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

- Endpoint: `GET /api/weight/lastThirtyDays`
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
  "height": 170,
  "initialWeight": 165.3,
  "targetWeight": 154.3
}
```

Update User Profile

- Endpoint: `PUT /api/user`
- Parameters:
  - `height` (decimal): Updated height value.
  - `initialWeight` (decimal): Updated initial weight value.
  - `targetWeight` (decimal): Updated target weight value.
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

Does your project include any login or user profile functionality? If so, describe how authentication/authorization will be implemented.

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build.

## Nice-to-haves

Your project will be marked based on what you committed to in the above document. Under nice-to-haves, you can list any additional features you may complete if you have extra time, or after finishing.

```

```
