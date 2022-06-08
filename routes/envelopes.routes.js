const express = require('express');
const envelopesController = require('../controllers/env.controllers');
const envelopeIdMiddle = require('../middleware/envelopeId');
const router = express.Router();

router.use('/:id', envelopeIdMiddle)

// get all envelopes
router.get('/', envelopesController.getAllEnvelopes);

// get envelope

router.get('/:id', envelopesController.getEnvelope);

// create envelope
router.post('/', envelopesController.createEnvelope)

// update envelope
router.put('/:id', envelopesController.changeEnvelope);

// delete all envelopes
router.delete('/', envelopesController.deleteAllEnvelopes)

// delete envelope
router.delete('/:id', envelopesController.deleteEnvelope)

// transfer funds
router.put('/:id/transfer', envelopesController.transferMoney)

module.exports = router;