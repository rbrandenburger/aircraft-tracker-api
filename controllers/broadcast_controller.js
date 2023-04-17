const asyncHandler = require('express-async-handler')
const Broadcast = require('../models/broadcast')

// @desc Get recently captures broadcasts
// @route GET /api/broadcasts/snapshot
// @access public
const getSnapshot = asyncHandler(async (req, res) => {
  const snapshot= await Broadcast.find()

  res.status(200).json(snapshot)
})

// @desc Get broadcasts for a specific aircraft
// @route GET /api/broadcasts/<id>
// @access public
const getBroadcasts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get broadcasts for ${req.params.id}` })
})

// @desc Add new broadcasts to the database
// @route POST /api/broadcasts/create
// @access private
const createBroadcasts = asyncHandler(async (req, res) => {
  const apiKey = req.header('x-api-key')

  if(apiKey != process.env.RADIO_API_KEY ) {
    res.status(401)
    throw new Error("Unauthorized")
  }

  const broadcast = await Broadcast.create({
    registrationNumber: req.body.registrationNumber,
    downlinkFormat: req.body.downlinkFormat,
    transponderCapability: req.body.transponderCapability,
    payload: req.body.payload
  })

  res.status(200).json(broadcast)
})

module.exports = {
  getSnapshot,
  getBroadcasts,
  createBroadcasts
}
