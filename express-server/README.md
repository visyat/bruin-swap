# BruinSwap

Idea: Forum to allow students to post classes that they intend to drop and to help coordinate class swaps with other students. 

To download and test working queries, run the following commands: 

```
git clone https://github.com/visyat/35L-project.git
cd express-server
npm install
npm start
```
Access the server on ```http:/localhost:3000/```

Currently supports the following: 

**GET Requests:**

```/users``` - Provides list of all users' ID's and names (meant for user directories)

```/check-user/:user_id``` - Determines whether a given user ID is valid; user exists in the DB

```/users/:user_id``` - Provides user information given user ID

```/login/:user_id/:passwd``` - Takes in user ID and password; meant for authentication (IN PROGRESS)

```/transactions``` - Provides all active transactions (for main page)

```/transactions-by-user/:user_id``` - Provides all transactions posted by a specific user (for user profile)

```/transactions-by-tid/:transaction_id``` - Provides transaction information for a specific transaction ID (searching)

```/classes``` - Provides list of all classes stored in DB

```/classes/:course_code``` - Provides class information for a specific course code


**POST Requests:**

```/users``` - Inserts new user into DB; Request Body: {user_id, user_name, passwd, year, email}

```/classes``` - Inserts new class; RB: {course_code, course_name}

```/transactions``` - Inserts new transaction; RB: {t_id, user_id, class_wanted, class_dropped}


**PUT Requests:**

```/users/:user_id``` - Updates information for a specific user; RB: {user_name, passwd, year_level, email}

```/wishlist/:user_id``` - Adds wishlist to the user's entry in DB; RB: {w1, w2, w3, w4, w5}

```/courses/:course_code```- Updates a course's information/name; RB: {sec_course_code, course_name}

```/transactions/:transaction_id``` - Updates information for specific transaction; RB: {class_wanted, class_to_drop}


**DELETE Requests:**

```/users/:user_id``` - Deletes a user (will delete all transactions they posted)

```/courses/:course_code``` - Deletes a class

```/transactions/:transaction_id``` - Deletes a transaction


GET requests can be tested in the search browser directly. POST, PUT and DELETE requests can be tested with Postman (to insert request bodies). 

Here is an example: 
![Postman Example](./postman_demo.png)

Active TODO's: 
1. Proper handling of invalid inputs (error messages), instead of crashing the server or returning empty set. 
2. Sanitize inputs (e.g. account for empty strings)
3. Finish authentication (e.g. storing user_id in local cookie for repeated insertion into requests?)