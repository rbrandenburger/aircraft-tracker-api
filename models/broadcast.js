const mongoose = require('mongoose')

const broadcastSchema = mongoose.Schema(
  {
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
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret) {
        delete ret._id
        delete ret.createdAt
        delete ret.updatedAt
        delete ret.__v
      }
    }
  }
)

module.exports = mongoose.model('broadcast', broadcastSchema)
