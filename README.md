# Job Candidate Information Web Application

## Description

The application provides functionality for adding or updating candidate information. The email of the candidate is used as the unique identifier. If the candidate profile already exists in the system, it will be updated; if not, it will be created. The form and API endpoint expect the following information:

- First name (required)
- Last name (required)
- Phone number
- Email (required)
- Time interval when it's better to call
- LinkedIn profile URL
- GitHub profile URL
- Free text comment (required)

## Technologies and Tools

- Backend: NestJS, TypeORM, PostgreSQL
- Frontend: React, TypeScript, Fetch API

## Setup Instructions

Backend Setup

Clone the repository:

```sh

$ git clone https://github.com/Ayaf-Bless/candidates-app-sigma.git
$ cd backend
```

Install dependencies:

```sh
npm install
```

Create a .env file and add the following environment variables:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=job_candidates
```

Run the application:

```sh
$ npm run start:dev
```

Frontend Setup

Navigate to the frontend directory:

```sh
cd frontend
```

Install dependencies:

```sh
npm install
```

Run the application:

```sh
npm start
```

## Abstract Database Implementation

To make it easy to change databases if needed, I implemented an abstract class for CRUD operations in the database module. This abstract class defines the CRUD methods, and its implementation is provided by a service within the database module.

## Caching Considerations

Caching is not implemented in this project because we are primarily performing write operations. However, caching can be beneficial when an admin wants to retrieve all the candidates, possibly based on some search or sort criteria.

```ts
  @Cacheable()
  async findAll(): Promise<Candidate[]> {
    return this.candidateRepositoryService.findAll();
  }
```

## Others

- implement honeypot security (though not asked but it made sense)
- I used typescript on the frontend as well, I hope that's ok

## Improvements

### Frontend

- Form Validation: Improve form validation to provide real-time feedback to users.
- Styling: Enhance the UI with better styling and responsiveness.
- Error Handling: Add more comprehensive error handling for network and form errors.

### Backend

- Validation: Use class-validator to add more robust validation for incoming data.
- Authentication: Implement authentication and authorization for API endpoints.

- Logging: Add logging to track API usage and errors.
- Testing: Increase test coverage for edge cases and integration tests.

* Docker: Consider adding Docker support for easier deployment and environment setup.
* Documentation: Improve API documentation using tools like Swagger.
