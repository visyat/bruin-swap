# BruinSwap

![Banner](./img/banner.png)

BruinSwap is full-stack web application that allows students to post classes they intend to drop, and coordinate class swaps with other students. 

## Installation/Setup

To download and run our application, first clone our git repository; then you can install dependencies for and run both the client and server. 

```
git clone https://github.com/visyat/bruin-swap.git
```

### Server
To install dependencies for our Express.js server, run the following commands: 
```
cd express-server
npm install
```

In the `express-server` directory, place the following keys in a file named `.env` to connect to our Amazon RDS instance and email server:
```
POSTGRES_HOST=cs35l-course-swaps.czme8i86mreh.us-east-2.rds.amazonaws.com
POSTGRES_ADMIN_USER=postgres
POSTGRES_PASSWORD=comsci35lpassword
POSTGRES_DB_NAME=courseswaps
POSTGRES_PORT=5432
MAIL_SERVICE=gmail
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_ADDRESS=vishalyathish01@gmail.com
MAIL_PASSWORD="gdbe ksxx lrho ruhi"
```
To run the server, enter the following command:

```
npm start
 ```

The backend server will be available at `http://localhost:3000`. If you want to test individual routes, full instructions regarding available routes, request parameters/bodies, and outputs are available in the server README file: `express-server/README.md`. 

### Client
To install dependencies for our frontend application, run the following commands: 
```
cd client
npm i
```

In the `client` directory, place the following in a file named `.env.local` to allow the browser to connect to the server:
```
NEXT_PUBLIC_API_URI="http://localhost:3000"
```
To run the completed application, enter the following command: 

```
npm run dev
```
The application will be available at `http://localhost:8080`

## Main Features 
1. Create posts, proposing class drops, and read & accept such posts from other students
2. Search for course listings that you want, by department, course number, etc.
3. Save courses on your wishlist; when a new post is created offering that course, you will get notified via email

## Tech Stack 
* JavaScript 
* TypeScript
* Node.js
* Express.js
* React.js (Fluent UI)
* PostgreSQL

## References
Below are some tutorials we used to help guide our implementation: 
* https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/
* https://blog.logrocket.com/sending-emails-node-js-nodemailer/ 

## Authors
BruinSwap was made as a project for COM SCI 35L (Winter 2024), taught by Professor Paul Eggert. It was built by Vishal Yathish, Rathul Anand, Aditya Pai, Christian Giron-Michel, and Matthew Day.  
