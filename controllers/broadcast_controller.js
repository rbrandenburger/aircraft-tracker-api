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
  if(!req.body.typeCode) {
    res.status(400)
    throw new Error('Missing broadcasts field')
  }

  const broadcast = await Broadcast.create({
    typeCode: req.body.typeCode,
    messageType: req.body.messageType,
    payload: req.body.payload
  })

  res.status(200).json(broadcast)
})


module.exports = {
  getSnapshot,
  getBroadcasts,
  createBroadcasts
}
