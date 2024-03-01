const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
var engines = require('consolidate');

const db = require('./queries.js')

app.use(express.json());
app.get('/', (request, response) => {
    response.json({ info: 'Course Swapper' })
})

app.get('/users', db.getAllUsers)
app.get('/check-user/:user_id', db.checkValidUser)
app.get('/users/:user_id', db.getUserInfoByID)
app.get('/login/:user_id/:passwd', db.authentication)
app.get('/transactions', db.getAllTransactions)
app.get('/transactions-by-user/:user_id', db.getTransactionsByUser)
app.get('/transactions-by-tid/:transaction_id', db.getTransactionsByID)
app.get('/classes', db.getAllClasses)
app.get('/classes/:course_code', db.getClassesByCC)

app.post('/users', db.addNewUser)
app.post('/classes', db.addNewClass)
app.post('/transactions', db.addNewTransaction)

app.put('/users/:user_id', db.updateUserInfoByID)
app.put('/wishlist/:user_id', db.addUserWishlist)
app.put('/courses/:course_code', db.updateCourseInfoByID)
app.put('/transactions/:transaction_id', db.updateTransactionInfoByID)

app.delete('/users/:user_id', db.deleteUser)
app.delete('/courses/:course_code', db.deleteClass)
app.delete('/transactions/:transaction_id', db.deleteTransaction)

//TODO's: 
//1. Proper handling of invalid inputs (error messages), instead of crashing the server or returning empty set. 
//2. Sanitize inputs (e.g. account for empty strings)
//3. Authentication (e.g. storing user_id in local cookie for repeated insertion into queries?)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
