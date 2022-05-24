# Practicum

CodeOp full stack MVP - Solo Project. This is a web app that connects small business owners, who want a simple website or feature built, to bootcamp students, who need real world projects in their portfolio.

## Setup Instructions

Two terminal windows are required:

- Backend: Run `yarn migrate` to create the project tables. Run `yarn` in the project's root folder to install Node dependencies. `yarn start` in the root folder starts the Express server on port 5000.
- Frontend: `cd client` to navigate to the client folder, then run `yarn` to install React dependencies. `yarn start` starts the client server on port 3000.

## Features

This project essentially has two pages:

- A basic landing page, where business owners can:

  - get in touch with bootcamp staff via the contact form on the landing page. This sends an email that also includes the name, organization, phone number and email of the sender.
  - use the projects submission form to submit a file with their design requirements, along with their name, organization, phone number and email.

- A Staff page, where bootcamp staff can:

  - see all projects, their details and the current state of the projects using color coding:

    - red - project has not yet been accepted.
    - yellow - project has been accepted and is awating assignment or is being worked on
    - green - project has been completed.

  - download the file uploaded when that project was submitted

  - assign one project to one student and a supervising instructor. Instructors can supervise more than one student.

  - see a list of all assignments that have been made.

## Technologies

### Frontend

- React
- Tailwind CSS
- getwaves.io
- React-icons (Heroicons)
- classnames package

### Backend

- MySQL Database
- Node JS
- Express JS
- Nodemailer
- Multer (to handle multipart/form-data)
- Postman

## MySQL Database Schema

![Practicum Database Schema](/model/practicum%20schema.png)

## React Component Structure

![Practicum Component Structre](/client/public/files/Practicum%20Component%20Structure.png)

## Feature Extensions

- secure staff login
- confirmation on successful addition of new student or instructor, sent message from the Contact Form and uploads from Project Submission Form
- remove an instructor or student
- remove completed projects from main view
- send email with all relevant project details and files to student once they've been assigned to a project
- multiple file uploads and size and type limits to the uploads

​ \_This is a student project that was created at
[CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona.
