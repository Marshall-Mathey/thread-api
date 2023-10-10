# thread-api

Thread-API is a web application that allows you to create threads, threads can be commented, authentication is integrated. The project is designed with Adonisjs 5.9.0 and pnpm 8.8.0, a MySQL database.

## Features

- [x] Authenticate with a username and password
- [x] Create threads with a title and content 
- [x] Comment threads with text
- [x] Edit or delete your own threads
- [x] Search threads by title, content or author

## Installation

To install the project, you need to have Node.js 14 or higher, MySQL 8 or higher and pnpm 9.0 or higher installed on your machine.

Clone the GitHub repository:

```bash
git clone https://github.com/Marshall-Mathey/thread-api.git
```

Go to the project folder:

```bash
cd thread-api
```

Install the dependencies:

```bash
pnpm install
```

Create a `.env` file at the root of the project and fill in the following environment variables:

```bash
PORT=3333 # the port on which the application will be launched
HOST=127.0.0.1 # the IP address of the application
NODE_ENV=development # the mode of execution of the application
APP_KEY= # a secret key to encrypt sensitive data, to be generated with the command `node ace generate:key`
DB_CONNECTION=pg # the type of database used
PG_HOST=127.0.0.1 # the IP address of the database
PG_PORT=5432 # the port on which the database is accessible
PG_USER=postgres # the username to connect to the database
PG_PASSWORD= # the password to connect to the database
PG_DB_NAME=thread_api # the name of the database to use
```

Create the database and tables:

```bash
node ace migration:run
node ace db:seed
```

Launch the application:

```bash
node ace serve --watch
```

The application is now accessible at http://127.0.0.1:3333.


I hope this readme will be useful for you to present your project. If you have any questions or suggestions, please feel free to contact me. 😊
