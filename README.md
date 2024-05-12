# Survey Poll App

Survey/Poll backend application built with TypeScript, Node.js and Prisma.

## Overview

The application allows users to create and participate in surveys. Each survey consists of one or more questions, and each question can have multiple options. Users can select an option to vote in a survey.


## Features

- Create a new survey
- Get a list of all surveys
- Get details of a specific survey
- Add/Delete Survey questions 
- Vote in a survey

  
## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm.
- Typescript and ts-node
- Prisma CLI.
- PostgreSQL database setup.
 

## API Endpoints

The application provides the following endpoints:

- `GET /surveys`: Fetch all surveys.
- `POST /surveys`: Create a new survey.

<details>
<summary>Request Body</summary>

```json
{
  "name": "Education Survey",
  "questions": [
    {
      "text": "What is your educational qualification?",
      "options": [{"text": "10th"}, {"text": "12th"}, {"text": "Bachelors"}, {"text": "Masters"}, {"text": "PhD."}]
    }, {
      "text": "How you enjoy reading books?",
      "options": [{"text": "Yes"}, {"text": "No"}]
    }
  ]
}
```
</details>

- `GET /surveys/:surveyId`: Fetch a specific survey.
- `PUT /surveys/append/:surveyId`: Append new questions to survey.

<details>
<summary>Request Body</summary>

```json
{
  "questions": [
    {
      "text": "How would you rate our questions (out of 5)?",
      "options": [{"text": 1}, {"text": 2}, {"text": 3}, {"text": 4}, {"text": 5}]
    }, {
      "text": "What is your age group?",
      "options": [{"text": "18 to 24 years"}, {"text": "24 to 30 years"}, {"text": "30 to 45 years"}, {"text": "45 to 60 years"}]
    }
  ]
}
```
</details>

- `DELETE /surveys/delete/:surveyId`: Delete a specific survey.
- `DELETE /surveys/delete/question/:questionId`: Delete a specific question.


## Tech Stack

- TypeScript
- Node.js
- Express.js
- Prisma

## Getting Started

Please follow the standard instructions to initiate a node app

- Clone the repo

1.Change your directory
```bash
cd survey-poll-app
```

2.Initiate a dependencies
```bash
npm install
npm install ts-node
```

4. Configure .env
```
DATABASE_URL=<your postgressdb>
PORT=<your prefered port>

```

6. Generate Prisma Client  
```bash
npx prisma generate
```
Now you can use prisma client in your code

7. Apply migrations
```bash
npx prisma migrate dev --name  <name for you migration>
```

8. Run Express App
```bash
npx ts-node ./src/server.ts
```
<br>
