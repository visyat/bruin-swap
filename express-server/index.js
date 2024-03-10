import express from 'express';
import bodyParser from 'body-parser';
import { getAllUsers, checkValidUser, getUserInfoByID, authentication, getAllTransactions, getTransactionsByUser, getTransactionsByID, getTransactionsByDept, getTransactionsByCourseNum, getAllClasses, getClassesBySC, getWishlistByUser, getEnrollmentsByUser, addNewUser, addNewClass, addNewTransaction, addNewWishlistEntry, addNewEnrollmentEntry, updateUserInfoByID, updateCourseInfoByID, updateTransactionInfoByID, deleteUser, deleteCourse, deleteSection, deleteTransaction, deleteWishlistEntry, deleteEnrollmentEntry } from './queries.js';

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
app.get('/transactions-by-dept/:dept', getTransactionsByDept)
app.get('/transactions-by-cn/:course_num', getTransactionsByCourseNum)
app.get('/classes', getAllClasses)
app.get('/classes/:section_code', getClassesBySC)
app.get('/wishlist/:user_id', getWishlistByUser)
app.get('/enrollments/:user_id', getEnrollmentsByUser)

app.post('/users', addNewUser)
app.post('/classes', addNewClass)
app.post('/transactions', addNewTransaction)
app.post('/wishlist', addNewWishlistEntry)
app.post('/enrollments', addNewEnrollmentEntry)

app.put('/users/:user_id', updateUserInfoByID)
app.put('/courses/:section_code', updateCourseInfoByID)
app.put('/transactions/:transaction_id', updateTransactionInfoByID)

app.delete('/users/:user_id', deleteUser)
app.delete('/courses/:section_code', deleteSection)
app.delete('/courses/:dept/:course_num', deleteCourse)
app.delete('/transactions/:transaction_id', deleteTransaction)
app.delete('/wishlist/:user_id/:section_id', deleteWishlistEntry)
app.delete('/enrollments/:user_id/:section_id', deleteEnrollmentEntry)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
