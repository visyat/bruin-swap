const Pool = require('pg').Pool
const pool = new Pool({
    user: 'vishalyathish',
    host: 'localhost',
    database: 'class_swaps',
    port: 5432,
})

const authentication = (request, response) => {
    const id = request.params.id
    const passwd = request.params.passwd
    pool.query('SELECT * FROM users WHERE user_id=$1 AND passwd=$2;', [id, passwd], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getTransactions = (request, response) => {
    pool.query('SELECT * FROM active_transactions;', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getTransactionsByUser = (request, response) => {
    const user_id = request.params.id
    pool.query('SELECT * FROM active_transactions WHERE user_id=$1;', [user_id], (error,results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getClasses = (request, response) => {
    pool.query('SELECT * FROM classes;', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const addUser = (request, response) => {
    const { user_id, user_name, passwd, year, email, w1} = request.body

    pool.query('INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6);', [user_id, user_name, passwd, year, email, w1], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const addClass = (request, response) => {
    const { course_code, course_name} = request.body
    pool.query('INSERT INTO classes (course_code, course_name) VALUES ($1, $2);', [course_code, course_name], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const addTransaction = (request, response) => {
    const {t_id, user_id, class_wanted, class_dropped} = request.body
    pool.query('INSERT INTO active_transactions VALUES ($1, $2, $3, $4);', [t_id, user_id, class_wanted, class_dropped], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getUserInfo, 
    getTransactions, 
    getTransactionsByUser, 
    getClasses, 
    addUser, 
    addClass, 
    addTransaction
}
