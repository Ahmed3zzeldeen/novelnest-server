const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller')
// const verifyToken = require('../middlewares/verifyToken');
// const allowedTo = require('../middlewares/allowedTo');
// const userRoles = require('../utils/userRoles');

router.route('/:id')
            .post(ordersController.getALLOrdersOfUser)

module.exports = router;
