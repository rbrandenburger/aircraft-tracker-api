const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const {errorHandler} = require('./middleware/error_middleware')

const app = express()

app.use(express.json())

app.use('/api/broadcasts', require('./routes/broadcast_routes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
