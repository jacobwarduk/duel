Documentation
=============

Application developed on Node.js v0.10.34

Installation
------------

To install and use the application on a local machine for testing:

1. Ensure an instance of MongoDB is running.

  `mongod &`

2. Start the app using NPM.

  `npm start`

3. In a web browser go to [http://localhost:3000](http://localhost:3000)




Developer API Instructions
--------------------------

**GET /people**

Returns a JSON object of all people in the database.

*Example usage*

`curl /people/`

---
**GET /people/:_id**

Returns a JSON object of the person whose `_id` is specified.

*Example usage*

`curl /people/563cc6cce7b1db45b08b2af1`

Success: `{"_id":"563cc6cce7b1db45b08b2af1","hash":"874342f41ec335e13ec2fbfa4aa406bbe4324e1a6b7acaf8679e1bb7ea3a29521ed8c018f339af69d5d0c93dcf028d54f775c4d936a8d6214416717132318658","salt":"1165172732a416e908d0e4618b0de397","__v":0,"email":"stan@example.com","firstName":"Stan","lastName":"Smith","username":"Stanley","reqOut":[],"reqIn":[],"friends":[]}`

---
**GET /friends/:_id**

Returns a JSON object of the `_id`s of friends of the person whose `_id` is specified.

*Example usage*

`curl /friends/563cc6cce7b1db45b08b2af1`

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

Success: `{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NjNjYzZjY2U3YjFkYjQ1YjA4YjJhZjEiLCJ1c2VybmFtZSI6IlN0YW5sZXkiLCJleHAiOjE0NDk0OTM5ODMsImlhdCI6MTQ0NjkwMTk4M30.j3sez7YJnwAqpKCcADniAKaPCWREfVhAX1EOnHr9FA0"}`

Fail:

---
**POST /login**

Logs a person in and on success returns a JSON object with the person's `token`.

Accepts the fields:
 - username
 - password

*Example usage*

`curl --data 'username=Stan The Man&password=hello123' /login`

Success: `{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NjNjYzZjY2U3YjFkYjQ1YjA4YjJhZjEiLCJ1c2VybmFtZSI6IlN0YW5sZXkiLCJleHAiOjE0NDk0OTM5ODMsImlhdCI6MTQ0NjkwMTk4M30.j3sez7YJnwAqpKCcADniAKaPCWREfVhAX1EOnHr9FA0"}`

Fail: `{"message":"Could not find a user with that username."}`

---
**POST /friends/add/:_id**

Adds another person whose `_id` is specified as the existing persons friend.

Accepts the fields:

*Example usage*

`curl --data '_id=563cc6cce7b1db45b08b2af1' /friends/add`

example response in here

---
**PUT /update/:_id**

Updates a person's details.

Accepts the following fields:
 - username
 - password
 - email
 - firstName
 - lastName

*Example usage*

`curl -X PUT -d username=Stanley -d email=stan@example.com -d firstName=Stan -d lastName=Smith -d password=password123 /update/563cc6cce7b1db45b08b2af1`

Response: `{"message":"Successfully updated details."}`



---
To Do
-----
Currently the app satisfies all of the requirements set out in the specification.

I ran out of time due to other unexpected commitments, but extra functionality should include:
 - Sending a friend request that the other person has to accept before you become mutual friends. (Started but not completed).
 - Proper SEO, including pretty URLs, #!, fragments, etc...
 - Nicer front end styling, instead of the default Bootstrap theme.
 - Grunt tasks to concatenate and minify CSS and JS files.
 - More detailed documentation.


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
