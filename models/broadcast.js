const mongoose = require('mongoose')

const broadcastSchema = mongoose.Schema({
  typeCode: {
    type: Number,
    required: true
  },
  messageType: {
    type: String,
    required: true
  },
  payload: {
    type: {},
    required: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('broadcast', broadcastSchema)
