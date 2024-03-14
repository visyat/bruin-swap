import pkg from 'pg';
//NOTE: Have to manually run "npm install jsonwebtoken" when cloning server
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

import { notification } from './notification.js';
const { Pool } = pkg;

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_ADMIN_USER,
    password: process.env.POSTGRES_PASSWORD, 
    database: process.env.POSTGRES_DB_NAME, 
    port: process.env.POSTGRES_PORT,
    ssl: {
        rejectUnauthorized: false
    }
})

//GET Requests
const getAllUsers = (request, response) => { 
    console.log('Querying users');
    pool.query('SELECT user_id, user_name, email FROM users;', (error, results) => {
        console.log('Done withq query');
        if (error) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json(results.rows); 
    })
}
const getUserInfoByID = (request, response) => {
    const user_id = request.params.user_id 

    if (user_id == null || user_id == undefined || typeof(user_id) !== 'string' || user_id === '') {
        response.status(400).json({msg: `INVALID USER ID`});
    } 
    else {
        pool.query('SELECT user_id,user_name,year_level,email FROM users WHERE user_id=$1;', [user_id], (error, results) => {
            if (results.rows.length === 0 || error) {
                response.status(400).json({ msg: `INVALID QUERY` }); 
                return;
            }
            response.status(200).json(results.rows); 
        })
        
    }
}
//SELECT  FROM users WHERE user_id=$1;
const getUserInfoByJWT = (request, response) => {
    const user_jwt = request.params.user_jwt

    if (user_jwt === null || user_jwt === undefined || typeof(user_jwt) !== 'string' || user_jwt === '') {
        response.status(400).json({msg: `INVALID USER JWT`});
    } 
    else {
        pool.query('SELECT * FROM users WHERE user_jwt=$1;', [user_jwt], (error, results) => {
            if (error) {
                response.status(400).json({ msg: 'INVALID QUERY' });
            }
            response.status(200).json(results.rows); 
        })
    }
}
//For Log In - to see if the user actually exists in the DB
const checkValidUser = (request, response) => {
    const user_id = request.params.user_id 

    if (user_id === null || user_id === undefined || typeof(user_id) !== 'string' || user_id === '') {
        response.status(400).json({msg: `INVALID QUERY`});
    } 
    else {
        pool.query('SELECT user_id FROM users WHERE user_id=$1;', [user_id], (error, results) => {
            if (error || results.rows.length != 1) {
                response.status(400).json({ msg: 'INVALID QUERY' });
            }
            response.status(200).json({ msg: 'VALID USER' }); 
        })
    }
}
//For Registration - to see if the user-id already exists in the DB before inserting
const checkUserAlreadyExists = (request, response) => {
    const user_id = request.params.user_id 

    if (user_id === null || user_id === undefined || typeof(user_id) !== 'string' || user_id === '') {
        response.status(400).json({msg: `INVALID USER ID`});
    }  
    else {
        pool.query('SELECT user_id FROM users WHERE user_id=$1;', [user_id], (error, results) => {
            if (error) {
                response.status(400).json({ msg: 'INVALID QUERY' });
            } 
            else if (results.rows.length > 0) {
                response.status(400).json({ msg: 'USER ALREADY EXISTS' });
            } 
            else {
                response.status(200).json({ msg: 'USER DOES NOT EXIST' });
            }
        })
    }
}
const authentication = (request, response) => {
    const user_id = request.params.user_id
    const passwd = request.params.passwd

    if (user_id === null || user_id === undefined || typeof(user_id) !== 'string' || user_id === '') {
        response.status(400).json({msg: `INVALID USER ID`});
    }  
    else if (passwd === null || passwd === undefined || typeof(passwd) !== 'string' || passwd === '') {
        response.status(400).json({msg: `INVALID PASSWORD`});
    }  
    else {
        pool.query('SELECT user_jwt FROM users WHERE user_id=$1 AND passwd=$2;', [user_id, passwd], (error, results) => {
            if (error || results.rows.length != 1) {
                response.status(400).json({ msg: 'INVALID QUERY' });
            }
            else
            {
                response.status(200).json(results.rows);
            }
        })
    }
}
//Filtered out JWT tokens from results

const getAllTransactions = (request, response) => {
    pool.query('SELECT transaction_id,user_id,class_wanted,class_to_drop FROM active_transactions JOIN users ON active_transactions.user_jwt=users.user_jwt;', (error, results) => {
        if (error) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json(results.rows); 
    })
}
const getTransactionsByUser = (request, response) => {
    const user_jwt = request.params.user_jwt 

    if (user_jwt === null || user_jwt === undefined || typeof(user_jwt) !== 'string' || user_jwt === '') {
        response.status(400).json({msg: `INVALID USER JWT`});
    }  
    else {
        pool.query('SELECT * FROM active_transactions WHERE user_jwt=$1;', [user_jwt], (error,results) => {
            if (error) {
                response.status(400).json({ msg: 'INVALID QUERY' });
            }
            response.status(200).json(results.rows); 
        }) 
    }
}
const getTransactionsByID = (request, response) => {
    const transaction_id = request.params.transaction_id 

    if (transaction_id === null || transaction_id === undefined || typeof(transaction_id) !== 'string' || transaction_id === '') {
        response.status(400).json({msg: `INVALID TRANSACTION ID`});
    }  
    else {
        pool.query('SELECT * FROM active_transactions WHERE transaction_id=$1;', [transaction_id], (error,results) => {
            if (error) {
                response.status(400).json({ msg: 'INVALID QUERY' });
            }
            response.status(200).json(results.rows); 
        })
    }
}
const getTransactionsByDept = (request, response) => {
    const dept = request.params.dept 

    if (dept === null || dept === undefined || typeof(dept) !== 'string' || dept === '') {
        response.status(400).json({msg: `INVALID DEPARTMENT`});
    }   
    else {
        pool.query ('SELECT transaction_id,user_id,class_wanted,class_to_drop FROM active_transactions JOIN classes ON active_transactions.class_to_drop=classes.section_code WHERE classes.department=$1;', [dept], (error, results) => {
            if (error){
                response.status(400).json({ msg: 'INVALID QUERY' });
            }
            response.status(200).json(results.rows);
        })
    }
}
const getTransactionsByCourseNum = (request, response) => {
    const course_num = request.params.course_num 

    if (course_num === null || course_num === undefined || typeof(course_num) !== 'string' || course_num === '') {
        response.status(400).json({msg: `INVALID COURSE NUMBER`});
    }   
    else {
        pool.query ('SELECT transaction_id,user_id,class_wanted,class_to_drop FROM active_transactions JOIN classes ON active_transactions.class_to_drop=classes.section_code WHERE classes.course_num=$1;', [course_num], (error, results) => {
            if (error){
                response.status(400).json({ msg: 'INVALID QUERY' });
            }
            response.status(200).json(results.rows);
        })
    }
}

const getAllClasses = (request, response) => {
    pool.query('SELECT * FROM classes;', (error, results) => {
        if (error) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json(results.rows);
    })
}
const getClassesBySC = (request, response) => {
    const section_code = request.params.section_code 

    if (section_code === null || section_code === undefined || typeof(section_code) !== 'string' || section_code === '') {
        response.status(400).json({msg: `INVALID SECTION CODE`});
    }   
    else {
        pool.query('SELECT * FROM classes WHERE section_code=$1;', [section_code], (error,results) => {
            if (error) {
                response.status(400).json({ msg: 'INVALID QUERY' });
            }
            response.status(200).json(results.rows); 
        })
    }
}
const getWishlistByUser = (request, response) => {
    const user_jwt = request.params.user_jwt 

    if (user_jwt === null || user_jwt === undefined || typeof(user_jwt) !== 'string' || user_jwt === '') {
        response.status(400).json({msg: `INVALID USER JWT`});
    }  
    else {
        pool.query('SELECT * FROM wishlist JOIN classes ON wishlist.section_code=classes.section_code WHERE user_jwt=$1;', [user_jwt], (error,results) => {
            if (error) {
                response.status(400).json({ msg: 'INVALID QUERY' });
            }
            response.status(200).json(results.rows); 
        })
    }
}
const getEnrollmentsByUser = (request, response) => {
    const user_jwt = request.params.user_jwt

    if (user_jwt === null || user_jwt === undefined || typeof(user_jwt) !== 'string' || user_jwt === '') {
        response.status(400).json({msg: `INVALID USER JWT`});
    }  
    else {
        pool.query('SELECT * FROM enrollments JOIN classes ON wishlist.section_code=classes.section_code WHERE user_jwt=$1;', [user_jwt], (error,results) => {
            if (error) {
                response.status(400).json({ msg: 'INVALID QUERY' });
            }
            response.status(200).json(results.rows); 
        })
    }
}

//POST Requests
const addNewUser = (request, response) => {
    const { user_id, user_name, passwd, year, email } = request.body
    console.log(`Received: ${JSON.stringify(request.body)}`);
    console.log('Making user ', user_id, user_name, passwd, year, email);
    if (user_id === null || user_id === undefined || typeof(user_id) !== 'string' || user_id === '') {
        console.log(`Invalid user ID`);
        response.status(400).json({msg: `INVALID USER ID`});
    } 
    else if (user_name === null || user_name === undefined || typeof(user_name) !== 'string' || user_name === '') {
        console.log(`Invalid user name: ${user_name}`);
        response.status(400).json({msg: `INVALID USER NAME`});
    }
    else if (passwd === null || passwd === undefined || typeof(passwd) !== 'string' || passwd === '') {
        console.log('Invalid user pass');
        response.status(400).json({msg: `INVALID PASSWORD`});
    }
    else if (year === null || year === undefined || typeof(year) !== 'number' || year <= 0) {
        console.log('Invalid user year');
        response.status(400).json({msg: `INVALID YEAR`});
    }
    else if (email === null || email === undefined || typeof(email) !== 'string' || email === '') {
        console.log('Invalid email');
        response.status(400).json({msg: `INVALID USER EMAIL`});
    }
    else {
        console.log('Passed tests user');
        var secret_key = 'secret-key'
        const token = jwt.sign({ userID: user_id }, secret_key)
        pool.query('INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6);', [token, user_id, user_name, passwd, year, email], (error, results) => {
            if (error) {
                console.log('Invalid query');
                console.error(`Error is that: ${error}`)
                console.log('"INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6);"', [token, user_id, user_name, passwd, year, email]);
                response.status(400).json({ msg: 'INVALID QUERY' });
            } else {
                response.status(200).json({msg: `USER INSERT SUCCESSFUL`});
                console.log('Successfully amde user');
            }
        })
    }
}
const addNewClass = (request, response) => {
    const { section_code, department, course_num, course_name, professor, disc_section } = request.body

    if (section_code === null || section_code === undefined || typeof(section_code) !== 'string' || section_code === '') {
        response.status(400).json({msg: `INVALID SECTION CODE`});
    } 
    else if (department === null || department === undefined || typeof(department) !== 'string' || department === '') {
        response.status(400).json({msg: `INVALID DEPARTMENT`});
    }
    else if (course_num === null || course_num === undefined || typeof(course_num) !== 'string' || course_num === '') {
        response.status(400).json({msg: `INVALID COURSE NUMBER`});
    }
    else if (course_name === null || course_name === undefined || typeof(course_name) !== 'string' || course_name === '') {
        response.status(400).json({msg: `INVALID COURSE NAME`});
    }
    else if (professor === null || professor === undefined || typeof(professor) !== 'string' || professor === '') {
        response.status(400).json({msg: `INVALID USER PROFESSOR NAME`});
    } 
    else if (disc_section === null || disc_section === undefined || typeof(disc_section) !== 'string' || disc_section === '') {
        response.status(400).json({msg: `INVALID USER DISCUSSION SECTION`});
    } 
    else {
        pool.query('INSERT INTO classes VALUES ($1, $2, $3, $4, $5, $6);', [section_code, department, course_num, course_name, professor, disc_section], (error, results) => {
            if (error) {
                response.status(400).json({ msg: 'INVALID QUERY' });
            }
            response.status(200).json({msg: `CLASS INSERT SUCCESSFUL: ${section_code}`});
        })
    }
    
}
const addNewTransaction = (request, response) => {
    const {t_id, user_jwt, class_wanted, class_dropped} = request.body 
    console.log('Adding new transaction');
    if (t_id === null || t_id === undefined || typeof(t_id) !== 'number' || t_id === '') {
        response.status(400).json({msg: `INVALID TRANSACTION ID`});
    } 
    else if (user_jwt === null || user_jwt === undefined || typeof(user_jwt) !== 'string' || user_jwt === '') {
        response.status(400).json({msg: `INVALID USER JWT`});
    }
    else if (class_wanted === null || class_wanted === undefined || typeof(class_wanted) !== 'string' || class_wanted === '') {
        response.status(400).json({msg: `INVALID CLASS WANTED`});
    }
    else if (class_dropped === null || class_dropped === undefined || typeof(class_dropped) !== 'string' || class_dropped === '') {
        response.status(400).json({msg: `INVALID CLASS DROP`});
    }
    else {
        console.log('Transaction good format');
        pool.query('INSERT INTO active_transactions VALUES ($1, $2, $3, $4, FALSE);', [t_id, user_jwt, class_wanted, class_dropped], (error, results) => {
            if (error) {
                console.log('Transaction could not go through');
                console.error('The error is:', error);
                response.status(400).json({ msg: 'INVALID QUERY' });
            }
            console.log('Transaction going thorugh');
            pool.query('SELECT user_name,email,department,course_num,course_name FROM wishlist JOIN users ON wishlist.user_jwt=users.user_jwt JOIN classes ON wishlist.section_code=classes.section_code WHERE wishlist.section_code=$1;', [class_dropped], (e_not, r_not) => {
              if (e_not) {
                console.log('Error!')
                response.status(400).json({ msg: 'ERROR' });  
              }
              if (r_not.rows.length > 0)
              {
                for (let i = 0; i < r_not.rows.length; i++) //for (user in r_not.rows) 
                {
                  var user = r_not.rows[i]
                  const { user_name, email, department, course_num, course_name } = user
                  const user_class = department.concat(" ", course_num, " ", course_name)
                  
                  const req = {
                    "user_name": user_name,
                    "user_email": email,
                    "user_class": user_class
                  }
                  notification(request=req)
                }
              }
            })
            console.log('Transaction went thorugh');
            response.status(200).json({msg: `TRANSACTION INSERT SUCCESSFUL: ${t_id}`})
        })
    }
}
const addNewWishlistEntry = (request, response) => {
    const {user_jwt, class_wished} = request.body

    if (user_jwt === null || user_jwt === undefined || typeof(user_jwt) !== 'string' || user_jwt === '') {
        response.status(400).json({msg: `INVALID USER JWT`});
    } 
    else if (class_wished === null || class_wished === undefined || typeof(class_wished) !== 'string' || class_wished === '') {
        response.status(400).json({msg: `INVALID CLASS WISH`});
    }
    else {
        pool.query('INSERT INTO wishlist VALUES ($1, $2);' [user_jwt, class_wished], (error, results) => {
            if (error) {
                response.status(400).json({ msg: 'INVALID QUERY' });
            }
            response.status(200).json({msg: `WISHLIST INSERT SUCCESSFUL`})
        })
    }
}
const addNewEnrollmentEntry = (request, response) => {
    const {user_jwt, class_enrolled} = request.body

    if (user_jwt === null || user_jwt === undefined || typeof(user_jwt) !== 'string' || user_jwt === '') {
        response.status(400).json({msg: `INVALID USER JWT`});
    } 
    else if (class_enrolled === null || class_enrolled === undefined || typeof(class_enrolled) !== 'string' || class_enrolled === '') {
        response.status(400).json({msg: `INVALID CLASS ENROLLED`});
    } 
    else {
        pool.query('INSERT INTO enrollments VALUES ($1, $2);' [user_jwt, class_enrolled], (error, results) => {
            if (error) {
                response.status(400).json({ msg: 'INVALID QUERY' });
            }
            response.status(200).json({msg: `ENROLLMENT INSERT SUCCESSFUL`})
        })
    }
}

//PUT Requests
const updateUserInfoByJWT = (request, response) => {
    const user_jwt = request.params.user_jwt
    const { user_name, passwd, year_level, email } = request.body 

    if (user_jwt === null || user_jwt === undefined || typeof(user_jwt) !== 'string' || user_jwt === '') {
        response.status(400).json({msg: `INVALID USER JWT`});
    } 
    else if (user_name === null || user_name === undefined || typeof(user_name) !== 'string' || user_name === '') {
        response.status(400).json({msg: `INVALID USER NAME`});
    }
    else if (passwd === null || passwd === undefined || typeof(passwd) !== 'string' || passwd === '') {
        response.status(400).json({msg: `INVALID PASSWORD`});
    }
    else if (year_level === null || year_level === undefined || typeof(year_level) !== 'number' || year_level <= 0) {
        response.status(400).json({msg: `INVALID YEAR LEVEL`});
    }
    else if (email === null || email === undefined || typeof(email) !== 'string' || email === '') {
        response.status(400).json({msg: `INVALID USER EMAIL`});
    } 
    else {
        pool.query ('UPDATE users SET user_name=$1, passwd=$2, year_level=$3, email=$4 WHERE user_jwt=$5;', [user_name, passwd, year_level, email, user_jwt], (error, results) => {
            if (error) {
                response.status(400).json({ msg: 'INVALID QUERY' });
            }
            response.status(200).json({msg: `INFO UPDATED FOR USER`})
        })
    }
}
const updateCourseInfoByID = (request, response) => {
    const section_code = request.params.section_code
    const { department, course_num, course_name, professor, disc_section } = request.body 

    if (section_code === null || section_code === undefined || typeof(section_code) !== 'string' || section_code === '') {
        response.status(400).json({msg: `INVALID SECTION CODE`});
    } 
    else if (department === null || department === undefined || typeof(department) !== 'string' || department === '') {
        response.status(400).json({msg: `INVALID DEPARTMENT`});
    }
    else if (course_num === null || course_num === undefined || typeof(course_num) !== 'string' || course_num === '') {
        response.status(400).json({msg: `INVALID COURSE NUMBER`});
    }
    else if (course_name === null || course_name === undefined || typeof(course_name) !== 'string' || course_name === '') {
        response.status(400).json({msg: `INVALID COURSE NAME`});
    }
    else if (professor === null || professor === undefined || typeof(professor) !== 'string' || professor === '') {
        response.status(400).json({msg: `INVALID PROFESSOR NAME`});
    } 
    else if (disc_section === null || disc_section === undefined || typeof(disc_section) !== 'string' || disc_section === '') {
        response.status(400).json({msg: `INVALID DISCUSSION SECTION`});
    } 
    else {
        pool.query ('UPDATE classes SET department=$1, course_num=$2, course_name=$3, professor=$4, disc_section=$5 WHERE section_code=$3;', [department, course_num, course_name, professor, disc_section,section_code], (error, results) => {
            if (error) {
                response.status(400).json({ msg: 'INVALID QUERY' });
            }
            response.status(200).json({msg: `INFO UPDATED FOR COURSE ${section_code}`})
        })
    }
}
const updateTransactionInfoByID = (request, response) => {
    const transaction_id = request.params.transaction_id
    const { class_wanted, class_to_drop } = request.body

    if (transaction_id === null || transaction_id === undefined || typeof(transaction_id) !== 'number' || transaction_id === '') {
        response.status(400).json({msg: `INVALID TRANSACTION ID`});
    } 
    else if (class_wanted === null || class_wanted === undefined || typeof(class_wanted) !== 'string' || class_wanted === '') {
        response.status(400).json({msg: `INVALID CLASS WANTED`});
    } 
    else if (class_to_drop === null || class_to_drop === undefined || typeof(class_to_drop) !== 'string' || class_to_drop === '') {
        response.status(400).json({msg: `INVALID CLASS TO DROP`});
    }
    else {
        pool.query ('UPDATE active_transactions SET class_wanted=$1, class_to_drop=$2 WHERE transaction_id=$3;', [class_wanted, class_to_drop, transaction_id], (error, results) => {
            if (error) {
                response.status(400).json({ msg: 'INVALID QUERY' });
            }
            response.status(200).json({msg: `INFO UPDATED FOR TRANSACTION ${transaction_id}`})
        })
    }
}

//DELETE Requests
const deleteUser = (request, response) => { 
    const user_jwt = request.params.user_jwt 

    if (user_jwt === null || user_jwt === undefined || typeof(user_jwt) !== 'string' || user_jwt === '') {
        response.status(400).json({msg: `INVALID USER JWT`});
    } 
    else {
        pool.query('DELETE FROM users WHERE user_jwt=$1;', [user_jwt], (error, results) => {
            if (error) {
                response.status(400).json({ msg: 'INVALID QUERY' });
            }
            response.status(200).json({msg: `USER DELETED`})
        })
    } 
}
const deleteSection = (request, response) => {
    const section_code = request.params.section_code 

    if (section_code === null || section_code === undefined || typeof(section_code) !== 'string' || section_code === '') {
        response.status(400).json({msg: `INVALID SECTION CODE`});
    }  
    else {
        pool.query('DELETE FROM classes WHERE section_code=$1;', [section_code], (error, results) => {
            if (error) {
                response.status(400).json({ msg: 'INVALID QUERY' });
            }
            response.status(200).json({msg: `SECTION ${section_code} DELETED`})
        })
    }
}
const deleteCourse = (request, response) => {
    const dept = request.params.dept
    const course_num = request.params.course_num 

    if (dept === null || dept === undefined || typeof(dept) !== 'string' || dept === '') {
        response.status(400).json({msg: `INVALID DEPARTMENT`});
    }  
    else if (course_num === null || course_num === undefined || typeof(course_num) !== 'string' || course_num === '') {
        response.status(400).json({msg: `INVALID COURSE NUMBER`});
    }   
    else {
        pool.query('DELETE FROM classes WHERE dept=$1 AND course_num=$2;', [dept, course_num], (error, results) => {
            if (error) {
                response.status(400).json({ msg: 'INVALID QUERY' });
            }
            response.status(200).json({msg: `COURSE ${dept} ${course_num} DELETED`})
        })
    }
}
const deleteTransaction = (request, response) => {
    const transaction_id = request.params.transaction_id 

    if (transaction_id === null || transaction_id === undefined || typeof(transaction_id) !== 'number' || transaction_id === '') {
        response.status(400).json({msg: `INVALID TRANSACTION ID`});
    }  
    else {
        pool.query('DELETE FROM active_transactions WHERE transaction_id=$1;', [transaction_id], (error, results) => {
            if (error) {
                response.status(400).json({ msg: 'INVALID QUERY' });
            }
            response.status(200).json({msg: `TRANSACTION ${transaction_id} DELETED`})
        })
    }
}
const deleteWishlistEntry = (request, response) => {
    const user_jwt = request.params.user_jwt
    const section_code = request.params.section_code 

    if (user_jwt === null || user_jwt === undefined || typeof(user_jwt) !== 'string' || user_jwt === '') {
        response.status(400).json({msg: `INVALID USER JWT`});
    }  
    else if (section_code === null || section_code === undefined || typeof(section_code) !== 'string' || section_code === '') {
        response.status(400).json({msg: `INVALID SECTION CODE`});
    }  
    else {
        pool.query('DELETE FROM wishlist WHERE user_jwt=$1 AND section_code=$2;', [user_jwt, section_code], (error, results) => {
            if (error) {
                response.status(400).json({ msg: 'INVALID QUERY' });
            }
            response.status(200).json({msg: `WISHLIST ENTRY DELETED`})
        })
    }
}
const deleteEnrollmentEntry = (request, response) => {
    const user_jwt = request.params.user_jwt
    const section_code = request.params.section_code 

    if (user_jwt === null || user_jwt === undefined || typeof(user_jwt) !== 'string' || user_jwt === '') {
        response.status(400).json({msg: `INVALID USER JWT`});
    }  
    else if (section_code === null || section_code === undefined || typeof(section_code) !== 'string' || section_code === '') {
        response.status(400).json({msg: `INVALID SECTION CODE`});
    }  
    else {
        pool.query('DELETE FROM enrollments WHERE user_jwt=$1 AND section_code=$2;', [user_jwt, section_code], (error, results) => {
            if (error) {
                response.status(400).json({ msg: 'INVALID QUERY' });
            }
            response.status(200).json({msg: `ENROLLMENT ENTRY DELETED`})
        })
    }
}

export {
    //GET Requests
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

    //POST Requests
    addNewUser,
    addNewClass,
    addNewTransaction,
    addNewWishlistEntry,
    addNewEnrollmentEntry,


    //PUT Requests
    updateUserInfoByJWT,
    updateCourseInfoByID,
    updateTransactionInfoByID,

    //DELETE Requests
    deleteUser,
    deleteSection,
    deleteCourse, 
    deleteTransaction,
    deleteWishlistEntry,
    deleteEnrollmentEntry
}
