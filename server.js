require('colors')
require('dotenv').config()

const express = require('express')
const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/error_middleware')

connectDB()

const app = express()

app.use(express.json())

app.use('/api/broadcasts', require('./routes/broadcast_routes'))

app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('Aircraft Tracker Api')
})

app.listen(port, () => console.log(`Server started on port ${port}`))
