const express = require('express')
const router = express.Router()
const { getSnapshot, getBroadcasts, createBroadcasts } = require('../controllers/broadcast_controller')

router.get('/snapshot', getSnapshot)

router.get('/:id', getBroadcasts)

router.post('/create', createBroadcasts)

module.exports = router
