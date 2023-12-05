const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller')

router.route('/:id')
            .get(ordersController.getALLOrdersOfUser);

module.exports = router;
