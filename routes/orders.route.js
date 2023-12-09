const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require('../middlewares/allowedTo');
const userRoles = require('../utils/userRoles');
const ordersController = require('../controllers/orders.controller')

router.route('/')
            .post(ordersController.createOrder)
            .get(verifyToken , allowedTo(userRoles.ADMIN) ,  ordersController.getAllOrders);
            
router.route('/:id')
            .get(verifyToken ,ordersController.readOrder)
            .delete(verifyToken , ordersController.deleteOrder)
            .patch(verifyToken , ordersController.updateOrder);            

router.route('/userOrders/:id')
            .get(verifyToken , ordersController.getALLOrdersOfUser);
 router.route('/bookOrders/:id')
            .get(verifyToken , allowedTo(userRoles.ADMIN) , ordersController.getAllOrdersOfBook);

module.exports = router;
