Documentation
=============



Installation
------------

1. Ensure an instance of MongoDB is running.

  `$ mongod &`

2. Start the app using NPM.

  `$ npm start`




Developer API Instructions
--------------------------

**GET /people**

Returns a JSON object of all people in the database.

*Example usage*

`curl /people/`

example response in here

---
**GET /people/:_id**

Returns a JSON object of the person whose `_id` is specified.

*Example usage*

`curl /people/563cc6cce7b1db45b08b2af1`

example response in here

---
**POST /register**

Adds a new person and on success returns a JSON object containing a `token` key.

Accepts the fields:
 - username
 - password
 - email
 - firstName
 - lastName

*Example usage*

`curl --data 'username=Stan The Man&password=hello123&email=stan@example.com&firstName=Stan&lastName=Smith' /register`

example response in here

---
**POST /login**

Logs a person in and on success returns a JSON object with the person's `token`.

Accepts the fields:
 - username
 - password

*Example usage*

`curl --data 'username=Stan The Man&password=hello123' /login`

example response in here


---












Technical Test
==============

**Please build a small web application that:**
 - Allows a user to register. A user has the following properties: username,
password,email,fullname . Username and e-mail must be unique.
 - Search other users by username and add them as friends
 - Allows the user to login
 - Allows the user to change/update his properties
 - Allows user to view his friends and remove any of them

**Ensure that the application includes at least the following elements:**
 - A web front end. You may use the HTML, CSS, and JavaScript
framework(s) of your choice, or none at all.
 - A back end, built on Node.js. Please write your Node.js code in JavaScript
only and avoid the use of languages such as CoffeeScript or TypeScript.
Please specify the version of Node.js that your application requires.
 - A data store using MongoDB
