const mongoose = require('mongoose')

const aircraftSchema = mongoose.Schema(
  {
    icao24: {
      type: String,
      required: true,
      unqiue: true
    },
    manufacturer: {
      type: String,
      required: false
    },
    model: {
      type: String,
      required: false
    },
    registrationNumber: {
      type: String,
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

module.exports = mongoose.model('aircraft', aircraftSchema)
