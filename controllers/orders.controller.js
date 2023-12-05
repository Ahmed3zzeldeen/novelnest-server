const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require('../models/user.model');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');
const Order = require("../models/order.model");


const getALLOrdersOfUser = asyncWrapper(async (req , res) => {
    const id = req.params.id;
    const user = User.findById(id);
    if (!user) {
        const error = appError.create('User not found' , 404 , httpStatusText.FAIL);
        return next(error);
    }
    const ordersOfUser = await Order.find({user_id: id});
    res.json({sttaus: httpStatusText.SUCCESS, data: {ordersOfUser}});
});

// const addOrder = asyncWrapper(async (req , res) => {
//     const validStatus = ['pending' , 'canceled' , 'arrived'];
//     const data = {
//         user_id, 
//         books,
//         orderDate: Date.now(),
//         orderStatus: validStatus[0],
//         duration_in_mins: 10,
//         total_payment: 0
//     }

// })

module.exports = {
    getALLOrdersOfUser
}