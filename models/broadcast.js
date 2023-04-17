const mongoose = require('mongoose')

const broadcastSchema = mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true
  },
  downlinkFormat: {
    type: Number,
    required: true
  },
  transponderCapability: {
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
