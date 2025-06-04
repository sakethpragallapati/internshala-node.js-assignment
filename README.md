# Node.js Development Internship Assignment

## About the Assignment
This assignment was given as part of the Node.js Development Internship application process at Educase India. The goal was to build a simple REST API using Node.js, Express, and MySQL that allows users to add schools and retrieve a list of schools sorted by proximity to a given latitude and longitude.

I completed this assignment to demonstrate my understanding of:
- Building RESTful APIs with Express
- Connecting and interacting with MySQL databases using `mysql2`
- Handling environment variables securely with `dotenv`
- Implementing geospatial calculations (Haversine formula) to sort locations by distance
- Writing clean, maintainable code following best practices

This task helped me gain hands-on experience in backend development using Node.js and database management.

---

## Features
- Add new schools with name, address, latitude, and longitude
- Retrieve a list of schools sorted by distance from a given location
- Database table creation handled automatically on server start

---

## Installation & Setup

### Prerequisites
- Node.js and npm installed on your machine.
- MySQL server running locally or remotely.
- Basic knowledge of command line usage.

### Steps

Clone the repository:
```bash
git clone https://github.com/sakethpragallapati/internshala-node.js-assignment.git
cd internshala-node-js-assignment
```
Install dependencies:

```bash
npm install
```

Set up environment variables:

Make a copy of the example environment file:

```bash
cp .env.example .env
```
Open .env in a text editor and fill in your MySQL credentials and port configuration, e.g.:

```
MYSQLHOST=localhost
MYSQLUSER=root
MYSQLPASSWORD=your_mysql_password
MYSQLDATABASE=school_db
MYSQLPORT=3306
PORT=3000
```
Create the MySQL database (if not already created):
Log in to your MySQL server and run:

```
CREATE DATABASE school_db;
```
(Make sure the database name matches MYSQLDATABASE in your .env file.)

Start the Node.js server:

```
npm start
```
Testing the API:

Use Postman, Insomnia, or your browser to test endpoints.

Example GET request to list schools sorted by distance near latitude 18.510000 and longitude 79.620000:

API Endpoints
```
POST /addSchool
```
Test the Live API Endpoint: https://internshala-nodejs-assignment-production.up.railway.app/listSchools?latitude=18.510000&longitude=79.620000

```
Request body (JSON example):
{
  "name": "School Name",
  "address": "School Address",
  "latitude": 18.5204,
  "longitude": 73.8567
}
```
```
GET /listSchools?latitude={lat}&longitude={lng}
```
Retrieve a list of schools sorted by distance from the provided latitude and longitude.

Additional Notes
The database table schools will be created automatically if it does not exist when the server starts.
The app uses a connection pool for efficient database access.
Distances are calculated using the Haversine formula for accurate geospatial results.
This project uses environment variables to keep sensitive data secure.

Thank you for considering my submission.

Educase India Node.js Development Internship Assignment
