const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const db = require('./queries')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Course Swapper' })
})

app.get('/transactions', db.getTransactions)
app.get('/transactions/:id', db.getTransactionsByUser)
app.get('/classes/', db.getClasses)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

