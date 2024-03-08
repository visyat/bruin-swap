import express from 'express';
import bodyParser from 'body-parser';
import { getAllUsers, checkValidUser, getUserInfoByID, authentication, getAllTransactions, getTransactionsByUser, getTransactionsByID, getAllClasses, getClassesByCC, addNewUser, addNewClass, addNewTransaction, addUserWishlist, updateUserInfoByID, updateCourseInfoByID, updateTransactionInfoByID, deleteUser, deleteClass, deleteTransaction } from './queries.js';

const app = express()
const port = 3000
// var engines = require('consolidate');

app.use(express.json());
app.get('/', (request, response) => {
    response.json({ info: 'Course Swapper' })
})

app.get('/users', getAllUsers)
app.get('/check-user/:user_id', checkValidUser)
app.get('/users/:user_id', getUserInfoByID)
app.get('/login/:user_id/:passwd', authentication)
app.get('/transactions', getAllTransactions)
app.get('/transactions-by-user/:user_id', getTransactionsByUser)
app.get('/transactions-by-tid/:transaction_id', getTransactionsByID)
app.get('/classes', getAllClasses)
app.get('/classes/:course_code', getClassesByCC)

app.post('/users', addNewUser)
app.post('/classes', addNewClass)
app.post('/transactions', addNewTransaction)

app.put('/users/:user_id', updateUserInfoByID)
app.put('/wishlist/:user_id', addUserWishlist)
app.put('/courses/:course_code', updateCourseInfoByID)
app.put('/transactions/:transaction_id', updateTransactionInfoByID)

app.delete('/users/:user_id', deleteUser)
app.delete('/courses/:course_code', deleteClass)
app.delete('/transactions/:transaction_id', deleteTransaction)

//TODO's: 
//1. Proper handling of invalid inputs (error messages), instead of crashing the server or returning empty set. 
//2. Sanitize inputs (e.g. account for empty strings)
//3. Authentication (e.g. storing user_id in local cookie for repeated insertion into queries?)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
