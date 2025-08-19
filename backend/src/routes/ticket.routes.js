const express = require('express');
const { createTicket, getAllTickets, updateStatus } = require('../controllers/ticketController');

const router = express.Router()

router.post('/', createTicket)

router.get('/', getAllTickets)

router.put('/:id', updateStatus)

module.exports = router;