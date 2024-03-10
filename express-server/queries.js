import pkg from 'pg';
import crypto from 'crypto';
const { Pool } = pkg;
// var shasum = crypto.createHash('sha1')

const pool = new Pool({
    host: 'cs35l-course-swaps.czme8i86mreh.us-east-2.rds.amazonaws.com',
    user: 'postgres',
    password: 'comsci35lpassword', 
    database: 'courseswaps', 
    port: '5432',
    ssl: {
        rejectUnauthorized: false
    }
})

//GET Requests
const getAllUsers = (request, response) => {
    pool.query('SELECT user_id, user_name, email FROM users;', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows); 
    })
}
const checkValidUser = (request, response) => {
    const user_id = request.params.user_id
    pool.query('SELECT user_id FROM users WHERE user_id=$1;', [user_id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json({ msg: 'VALID USER' }); 
    })
}
const getUserInfoByID = (request, response) => {
    const user_id = request.params.user_id
    pool.query('SELECT * FROM users WHERE user_id=$1;', [user_id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows); 
    })
}

//Will eventually update to check hashed passwords; rn, test entries in DB are not hashed
const authentication = (request, response) => {
    const user_id = request.params.user_id
    //const passwd = shasum.digest(request.params.passwd); 
    const passwd = request.params.passwd
    pool.query('SELECT user_id FROM users WHERE user_id=$1 AND passwd=$2;', [user_id, passwd], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json({ msg: `LOG IN SUCCESSFUL` }); 
    })
}
const getAllTransactions = (request, response) => {
    pool.query('SELECT * FROM active_transactions;', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows); 
    })
}
const getTransactionsByUser = (request, response) => {
    const user_id = request.params.user_id
    pool.query('SELECT * FROM active_transactions WHERE user_id=$1;', [user_id], (error,results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows); 
    })
}

const getTransactionsByID = (request, response) => {
    const transaction_id = request.params.transaction_id
    pool.query('SELECT * FROM active_transactions WHERE transaction_id=$1;', [transaction_id], (error,results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows); 
    })
}
const getAllClasses = (request, response) => {
    pool.query('SELECT * FROM classes;', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
}
const getClassesByCC = (request, response) => {
    const course_code = request.params.course_code
    pool.query('SELECT * FROM classes WHERE course_code=$1;', [course_code], (error,results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows); 
    })
}

//POST Requests
const addNewUser = (request, response) => {
    const { user_id, user_name, passwd, year, email } = request.body
    pool.query('INSERT INTO users VALUES ($1, $2, $3, $4, $5);', [user_id, user_name, passwd, year, email], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json({msg: `USER INSERT SUCCESSFUL: ${user_id}`});
    })
}
const addNewClass = (request, response) => {
    const { course_code, course_name} = request.body
    pool.query('INSERT INTO classes (course_code, course_name) VALUES ($1, $2);', [course_code, course_name], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json({msg: `CLASS INSERT SUCCESSFUL: ${course_code}`});
    })
}
const addNewTransaction = (request, response) => {
    const {t_id, user_id, class_wanted, class_dropped} = request.body
    pool.query('INSERT INTO active_transactions VALUES ($1, $2, $3, $4);', [t_id, user_id, class_wanted, class_dropped], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({msg: `TRANSACTION INSERT SUCCESSFUL: ${transaction_id}`})
    })
}

//PUT Requests
const addUserWishlist = (request, response) => {
    const user_id = request.params.user_id
    const { w1, w2, w3, w4, w5} = request.body
    pool.query ('UPDATE users SET wish_1=$1, wish_2=$2, wish_3=$3, wish_4=$4, wish_5=$5 WHERE user_id=$6;', [w1,w2,w3,w4,w5,user_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({msg: `WISHLIST INSERT SUCCESSFUL FOR USER ${user_id}`})
    })
}
const updateUserInfoByID = (request, response) => {
    const user_id = request.params.user_id
    const { user_name, passwd, year_level, email } = request.body
    pool.query ('UPDATE users SET user_name=$1, passwd=$2, year_level=$3, email=$4 WHERE user_id=$5', [user_name, passwd, year_level, email, user_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({msg: `INFO UPDATED FOR USER ${user_id}`})
    })
}
const updateCourseInfoByID = (request, response) => {
    const course_code = requests.params.course_code
    const { sec_course_code, course_name } = request.body
    pool.query ('UPDATE classes SET sec_course_code=$1, course_name=$2 WHERE course_code=$3;', [sec_course_code, course_name, course_code], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({msg: `INFO UPDATED FOR COURSE ${course_code}`})
    })
}
const updateTransactionInfoByID = (request, response) => {
    const transaction_id = requests.params.transaction_id
    const { class_wanted, class_to_drop } = request.body
    pool.query ('UPDATE active_transactions SET class_wanted=$1, class_to_drop=$2 WHERE transaction_id=$3;', [class_wanted, class_to_drop, transaction_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({msg: `INFO UPDATED FOR TRANSACTION ${transaction_id}`})
    })
}

//DELETE Requests
const deleteUser = (request, response) => {
    const user_id = request.params.user_id
    pool.query('DELETE FROM users WHERE user_id=$1', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({msg: `USER ${user_id} DELETED`})
    })
}
const deleteClass = (request, response) => {
    const course_code = request.params.course_code
    pool.query('DELETE FROM classes WHERE course_code=$1', [course_code], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({msg: `COURSE ${course_code} DELETED`})
    })
}
const deleteTransaction = (request, response) => {
    const transaction_id = request.params.transaction_id
    pool.query('DELETE FROM active_transactions WHERE transaction_id=$1', [transaction_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({msg: `TRANSACTION ${transaction_id} DELETED`})
    })
}

export {
    //GET Requests
    getAllUsers,
    checkValidUser, 
    getUserInfoByID, 
    authentication, 
    getAllTransactions, 
    getTransactionsByUser,
    getTransactionsByID,
    getAllClasses,
    getClassesByCC,

    //POST Requests
    addNewUser,
    addNewClass,
    addNewTransaction,

    //PUT Requests
    addUserWishlist,
    updateUserInfoByID,
    updateCourseInfoByID,
    updateTransactionInfoByID,

    //DELETE Requests
    deleteUser,
    deleteClass,
    deleteTransaction
}
