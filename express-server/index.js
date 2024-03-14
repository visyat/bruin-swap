//npm i express pg
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { 
    getAllUsers, 
    checkValidUser, 
    checkUserAlreadyExists, 
    getUserInfoByID, 
    getUserInfoByJWT, 
    authentication, 
    getAllTransactions,
    getTransactionsByUser, 
    getTransactionsByID, 
    getTransactionsByDept, 
    getTransactionsByCourseNum, 
    getAllClasses, 
    getClassesBySC, 
    getWishlistByUser, 
    getEnrollmentsByUser, 
    addNewUser, 
    addNewClass, 
    addNewTransaction, 
    addNewWishlistEntry, 
    addNewEnrollmentEntry, 
    updateUserInfoByJWT, 
    updateCourseInfoByID, 
    updateTransactionInfoByID, 
    deleteUser, 
    deleteCourse, 
    deleteSection, 
    deleteTransaction, 
    deleteWishlistEntry, 
    deleteEnrollmentEntry,
    acceptRequest,
    rejectRequest,
    requestTransaction,

} from './queries.js';

const app = express()
const port = 3000

// Cross-Origin Resource Sharing
// app.use(cors({
//     // origin: 'http://localhost' // allow for cors only on same origin
// }));
app.use(cors());

app.use(express.json());

app.get('/', (request, response) => {
    response.json({ info: 'Course Swapper' })
})

app.get('/users', getAllUsers)
app.get('/check-valid-user/:user_id', checkValidUser)
app.get('/check-user-exists/:user_id', checkUserAlreadyExists)
app.get('/users-id/:user_id', getUserInfoByID)
app.get('/users/:user_jwt', getUserInfoByJWT)
app.get('/login/:user_id/:passwd', authentication)
app.get('/transactions', getAllTransactions)
app.get('/transactions-by-user/:user_jwt', getTransactionsByUser)
app.get('/transactions-by-tid/:transaction_id', getTransactionsByID)
app.get('/transactions-by-dept/:dept', getTransactionsByDept)
app.get('/transactions-by-cn/:course_num', getTransactionsByCourseNum)
app.get('/classes', getAllClasses)
app.get('/classes/:section_code', getClassesBySC)
app.get('/wishlist/:user_jwt', getWishlistByUser)
app.get('/enrollments/:user_jwt', getEnrollmentsByUser)

app.post('/users', addNewUser)
app.post('/classes', addNewClass)
app.post('/transactions', addNewTransaction)
app.post('/wishlist', addNewWishlistEntry)
app.post('/enrollments', addNewEnrollmentEntry)

app.put('/users/:user_jwt', updateUserInfoByJWT)
app.put('/courses/:section_code', updateCourseInfoByID)
app.put('/transactions/:transaction_id', updateTransactionInfoByID)
app.put('/request/:transaction_id', requestTransaction)
app.put('/reject-request/:transaction_id', rejectRequest)

app.delete('/users/:user_jwt', deleteUser)
app.delete('/courses/:section_code', deleteSection)
app.delete('/courses/:dept/:course_num', deleteCourse)
app.delete('/transactions/:transaction_id', deleteTransaction)
app.delete('/accept-request/:transaction_id', acceptRequest)
app.delete('/wishlist/:user_jwt/:section_id', deleteWishlistEntry)
app.delete('/enrollments/:user_jwt/:section_id', deleteEnrollmentEntry)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
