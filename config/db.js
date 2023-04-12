const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)

    console.log(`DB connection established: ${conn.connection.host}`.green.bold)
  } catch (error) {
    console.log(error)
    process.exit(1) // Exit with failure
  }
}

module.exports = connectDB
