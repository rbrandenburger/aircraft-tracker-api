const asyncHandler = require('express-async-handler')

// @desc Get recently captures broadcasts
// @route GET /api/broadcasts/snapshot
// @access public
const getSnapshot = asyncHandler(async (req, res) => {
  res.status(200).json({ snapshot: 'Get broadcasts snapshot' })
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
  if(!req.body.broadcasts) {
    res.status(400)
    throw new Error('Missing broadcasts field')
  } else {
    res.status(202).json({ message: 'Create a broadcast' })
  }
})


module.exports = {
  getSnapshot,
  getBroadcasts,
  createBroadcasts
}
