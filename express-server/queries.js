import pkg from 'pg';
//NOTE: Have to manually run "npm install jsonwebtoken" when cloning server
import jwt from 'jsonwebtoken';
const { Pool } = pkg;

const pool = new Pool({
    host: 'cs35l-course-swaps.czme8i86mreh.us-east-2.rds.amazonaws.com',
    user: 'postgres',
    password: 'comsci35lpassword', 
    database: 'courseswaps', 
    port: '5432',
    ssl: {
        rejectUnauthorized: false
        //cert: fs.readFileSync('cert/us-east-2-bundle.pem').toString(),
    }
})

//GET Requests
const getAllUsers = (request, response) => {
    pool.query('SELECT user_id, user_name, email FROM users;', (error, results) => {
        if (error) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json(results.rows); 
    })
}
const getUserInfoByID = (request, response) => {
    const user_id = request.params.user_id
    pool.query('SELECT user_id,user_name,year_level,email FROM users WHERE user_id=$1;', [user_id], (error, results) => {
        if (error) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json(results.rows); 
    })
}
const getUserInfoByJWT = (request, response) => {
    const user_jwt = request.params.user_jwt
    pool.query('SELECT * FROM users WHERE user_jwt=$1;', [user_jwt], (error, results) => {
        if (error) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json(results.rows); 
    })
}
//For Log In - to see if the user actually exists in the DB
const checkValidUser = (request, response) => {
    const user_id = request.params.user_id
    pool.query('SELECT user_id FROM users WHERE user_id=$1;', [user_id], (error, results) => {
        if (error || results.rows.length != 1) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json({ msg: 'VALID USER' }); 
    })
}
//For Registration - to see if the user-id already exists in the DB before inserting
const checkUserAlreadyExists = (request, response) => {
    const user_id = request.params.user_id
    pool.query('SELECT user_id FROM users WHERE user_id=$1;', [user_id], (error, results) => {
        if (error || results.rows.length > 0) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json({ msg: 'USER DOES NOT EXIST' });
    })
}
const authentication = (request, response) => {
    const user_id = request.params.user_id
    const passwd = request.params.passwd

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
    const user_jwt = request.params.user_id
    pool.query('SELECT * FROM active_transactions WHERE user_jwt=$1;', [user_jwt], (error,results) => {
        if (error) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json(results.rows); 
    })
}
const getTransactionsByID = (request, response) => {
    const transaction_id = request.params.transaction_id
    pool.query('SELECT * FROM active_transactions WHERE transaction_id=$1;', [transaction_id], (error,results) => {
        if (error) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json(results.rows); 
    })
}
const getTransactionsByDept = (request, response) => {
    const dept = request.params.dept
    pool.query ('SELECT transaction_id,user_id,class_wanted,class_to_drop FROM active_transactions JOIN classes ON active_transactions.class_to_drop=classes.section_code WHERE classes.department=$1;', [dept], (error, results) => {
        if (error){
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json(results.rows);
    })
}
const getTransactionsByCourseNum = (request, response) => {
    const course_num = request.params.course_num
    pool.query ('SELECT transaction_id,user_id,class_wanted,class_to_drop FROM active_transactions JOIN classes ON active_transactions.class_to_drop=classes.section_code WHERE classes.course_num=$1;', [course_num], (error, results) => {
        if (error){
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json(results.rows);
    })
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
    const section_code = request.params.course_code
    pool.query('SELECT * FROM classes WHERE section_code=$1;', [section_code], (error,results) => {
        if (error) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json(results.rows); 
    })
}
const getWishlistByUser = (request, response) => {
    const user_jwt = request.params.user_jwt
    pool.query('SELECT * FROM wishlist JOIN classes ON wishlist.section_code=classes.section_code WHERE user_jwt=$1;', [user_jwt], (error,results) => {
        if (error) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json(results.rows); 
    })
}
const getEnrollmentsByUser = (request, response) => {
    const user_jwt = request.params.user_id
    pool.query('SELECT * FROM enrollments JOIN classes ON wishlist.section_code=classes.section_code WHERE user_jwt=$1;', [user_jwt], (error,results) => {
        if (error) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json(results.rows); 
    })
}

//POST Requests
const addNewUser = (request, response) => {
    const { user_id, user_name, passwd, year, email } = request.body

    var secret_key = 'secret-key'
    const token = jwt.sign({ userID: user_id }, secret_key)

    pool.query('INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6);', [token, user_id, user_name, passwd, year, email], (error, results) => {
        if (error) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json({msg: `USER INSERT SUCCESSFUL: ${user_id}`});
    })
}
const addNewClass = (request, response) => {
    const { section_code, department, course_num, course_name, professor, disc_section } = request.body
    pool.query('INSERT INTO classes VALUES ($1, $2, $3, $4, $5, $6);', [section_code, department, course_num, course_name, professor, disc_section], (error, results) => {
        if (error) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json({msg: `CLASS INSERT SUCCESSFUL: ${section_code}`});
    })
}
const addNewTransaction = (request, response) => {
    const {t_id, user_jwt, class_wanted, class_dropped} = request.body
    pool.query('INSERT INTO active_transactions VALUES ($1, $2, $3, $4);', [t_id, user_jwt, class_wanted, class_dropped], (error, results) => {
        if (error) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }

        response.status(200).json({msg: `TRANSACTION INSERT SUCCESSFUL: ${t_id}`})
    })
}
const addNewWishlistEntry = (request, response) => {
    const {user_jwt, class_wished} = request.body
    pool.query('INSERT INTO wishlist VALUES ($1, $2);' [user_jwt, class_wished], (error, results) => {
        if (error) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json({msg: `WISHLIST INSERT SUCCESSFUL`})
    })
}
const addNewEnrollmentEntry = (request, response) => {
    const {user_jwt, class_enrolled} = request.body
    pool.query('INSERT INTO enrollments VALUES ($1, $2);' [user_jwt, class_enrolled], (error, results) => {
        if (error) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json({msg: `ENROLLMENT INSERT SUCCESSFUL`})
    })
}

//PUT Requests
const updateUserInfoByJWT = (request, response) => {
    const user_jwt = request.params.user_id
    const { user_name, passwd, year_level, email } = request.body
    pool.query ('UPDATE users SET user_name=$1, passwd=$2, year_level=$3, email=$4 WHERE user_jwt=$5;', [user_name, passwd, year_level, email, user_jwt], (error, results) => {
        if (error) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json({msg: `INFO UPDATED FOR USER`})
    })
}
const updateCourseInfoByID = (request, response) => {
    const section_code = requests.params.section_code
    const { department, course_num, course_name, professor, disc_section } = request.body
    pool.query ('UPDATE classes SET department=$1, course_num=$2, course_name=$3, professor=$4, disc_section=$5 WHERE section_code=$3;', [department, course_num, course_name, professor, disc_section,section_code], (error, results) => {
        if (error) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json({msg: `INFO UPDATED FOR COURSE ${section_code}`})
    })
}
const updateTransactionInfoByID = (request, response) => {
    const transaction_id = requests.params.transaction_id
    const { class_wanted, class_to_drop } = request.body
    pool.query ('UPDATE active_transactions SET class_wanted=$1, class_to_drop=$2 WHERE transaction_id=$3;', [class_wanted, class_to_drop, transaction_id], (error, results) => {
        if (error) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json({msg: `INFO UPDATED FOR TRANSACTION ${transaction_id}`})
    })
}

//DELETE Requests
const deleteUser = (request, response) => {
    const user_jwt = request.params.user_jwt
    pool.query('DELETE FROM users WHERE user_jwt=$1;', [user_jwt], (error, results) => {
        if (error) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json({msg: `USER DELETED`})
    })
}
const deleteSection = (request, response) => {
    const section_code = request.params.section_code
    pool.query('DELETE FROM classes WHERE section_code=$1;', [section_code], (error, results) => {
        if (error) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json({msg: `SECTION ${section_code} DELETED`})
    })
}
const deleteCourse = (request, response) => {
    const dept = request.params.dept
    const course_num = request.params.section_code
    pool.query('DELETE FROM classes WHERE dept=$1 AND course_num=$2;', [dept, course_num], (error, results) => {
        if (error) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json({msg: `COURSE ${dept} ${course_num} DELETED`})
    })
}
const deleteTransaction = (request, response) => {
    const transaction_id = request.params.transaction_id
    pool.query('DELETE FROM active_transactions WHERE transaction_id=$1;', [transaction_id], (error, results) => {
        if (error) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json({msg: `TRANSACTION ${transaction_id} DELETED`})
    })
}
const deleteWishlistEntry = (request, response) => {
    const user_jwt = request.params.user_jwt
    const section_code = request.params.section_code
    pool.query('DELETE FROM wishlist WHERE user_jwt=$1 AND section_code=$2;', [user_jwt, section_code], (error, results) => {
        if (error) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json({msg: 'WISHLIST ENTRY DELETED'})
    })
}
const deleteEnrollmentEntry = (request, response) => {
    const user_jwt = request.params.user_jwt
    const section_code = request.params.section_code
    pool.query('DELETE FROM enrollments WHERE user_jwt=$1 AND section_code=$2;', [user_jwt, section_code], (error, results) => {
        if (error) {
            response.status(400).json({ msg: 'INVALID QUERY' });
        }
        response.status(200).json({msg: 'ENROLLMENT ENTRY DELETED'})
    })
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
