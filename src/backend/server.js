require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const transactionRouter = require('./routes/transaction')
app.use('/transaction', transactionRouter)

const adminActionRouter = require('./routes/adminActions')
app.use('/adminActions', adminActionRouter)

const userRouter = require('./routes/userRouter')
app.use('/userRouter', userRouter)

const trials = require('./routes/trial')
app.use('/trial', trials)


app.listen(8080, () => console.log('Server Started'))