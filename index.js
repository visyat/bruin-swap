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

app.get('/users/:id', db.getUserInfo)
app.post('/transactions', db.getTransactions)
app.put('/transactions/:id', db.getTransactionsByUser)
app.delete('/classes/', db.getClasses)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

