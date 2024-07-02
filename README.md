# Dominic Bolton's simple user register and login.

## Getting Started

  ### Prerequisites:
    - node.js is installed on your machine
    - MongoDB is installed and running locally or accessible remotely

  ### Installing:
    After cloning this repo locally, please navigate to the project, and install dependencies:
      npm install

  ### Setting up environment variables:
    Please navigate to .env, as provided. Enter your own URI for MongoDB

  ### Running the Next.js development server:
    The following command starts the development server on http://localhost:3000 by default
      npm run dev


## A brief description of the project
  - Used Next.js App Router

  - Tailwind is used for styling

  - Pages include a home page, registration page, login page, and a simple user home page.

  - Frontend functionality includes registering a new user, logging in as an existing user, and navigating to user page once logged in.

  - Backend functionality supports creating new users and logging in as a user via Next.js api routes (app/api).

  - Log in state is managed via Redux
