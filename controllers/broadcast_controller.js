const asyncHandler = require('express-async-handler')
const Broadcast = require('../models/broadcast')

// @desc Get recently captured broadcasts
// @route GET /api/broadcasts/snapshot
// @access public
const getSnapshot = asyncHandler(async (req, res) => {
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

  // TODO: Seralize broadcast
  // TODO: Add metadata to response
  res.status(200).json(broadcasts)
})

// @desc Add new broadcasts to the database
// @route POST /api/broadcasts/create
// @access private
const createBroadcasts = asyncHandler(async (req, res) => {
  const apiKey = req.header('x-api-key')

  if (apiKey !== process.env.RADIO_API_KEY) {
    res.status(401)
    throw new Error('Unauthorized')
  }

  await Broadcast.create({
    registrationNumber: req.body.registrationNumber,
    downlinkFormat: req.body.downlinkFormat,
    transponderCapability: req.body.transponderCapability,
    payload: req.body.payload
  })

  res.status(201).end()
})

module.exports = {
  getSnapshot,
  getBroadcastsForAircraft,
  createBroadcasts
}
