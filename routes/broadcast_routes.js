const express = require('express')
const router = express.Router()
const controller = require('../controllers/broadcast_controller')

router.get('/snapshot', controller.getSnapshot)

router.get('/aircraft/:id', controller.getBroadcastsForAircraft)

router.post('/batch_create', controller.batchCreateBroadcasts)

module.exports = router
