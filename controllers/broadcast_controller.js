const asyncHandler = require('express-async-handler')
const Broadcast = require('../models/broadcast')
const Aircraft = require('../models/aircraft')

// @desc Get recently captured broadcasts
// @route GET /api/broadcasts/snapshot
// @access public
const getSnapshot = asyncHandler(async (req, res) => {
  // TODO: Implement logic
  const snapshot = await Broadcast.find()
  console.dir(Date.now())
  res.status(200).json(snapshot)
})

// @desc Get broadcasts for a specific aircraft
// @route GET /api/broadcasts/<id>
// @access public
const getBroadcastsForAircraft = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10 } = req.query

  if (limit < 1 || limit > 25) limit = 10

  const broadcasts = await Broadcast.find({ registrationNumber: req.params.id })
    .limit(limit)
    .skip((page - 1) * limit)

  const metadata = {
    page: +page,
    limit: +limit,
    count: broadcasts.length
  }

  res.status(200).json({ metadata, payload: broadcasts })
})

// @desc Add new broadcasts to the database
// @route POST /api/broadcasts/batch_create
// @access private
const batchCreateBroadcasts = asyncHandler(async (req, res) => {
  const apiKey = req.header('x-api-key')

  if (apiKey !== process.env.RADIO_API_KEY) {
    res.status(401)
    throw new Error('Unauthorized')
  }

  for (const broadcast of req.body) {
    await createBroadcast(broadcast)
  }

  res.status(201).end()
})

const createBroadcast = async (broadcast) => {
  let aircraft = await Aircraft.exists({ icao24: broadcast.icao24 })

  console.log(aircraft)

  if (aircraft == null) {
    aircraft = await Aircraft.create({
      icao24: broadcast.icao24,
      manufacturer: broadcast.aircraftDetails?.manufacturer,
      model: broadcast.aircraftDetails?.model,
      registrationNumber: broadcast.aircraftDetails?.registrationNumber
    })
  }

  await Broadcast.create({
    aircraftId: aircraft._id,
    downlinkFormat: broadcast.downlinkFormat,
    transponderCapability: broadcast.transponderCapability,
    payload: broadcast.payload,
    timestamp: broadcast.timestamp
  })
}

module.exports = {
  getSnapshot,
  getBroadcastsForAircraft,
  batchCreateBroadcasts
}
