const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require('../models/user.model');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');
const Order = require("../models/order.model");
const Book = require("../models/books.model");


const validStatus = ['pending' , 'canceled' , 'arrived'];


const getAllOrders = asyncWrapper(async(req , res , next) => {
    const orders = await Order.find({});
    res.json({status: httpStatusText.SUCCESS , data: {orders}});
});

// FIXME:
const readOrder = asyncWrapper(async(req , res , next) => {
    const order_id = req.params.order_id;
    const order = await Order.findById(order_id);
    if (!order) {
        const error = appError.create('Order not found' , 404 , httpStatusText.FAIL);
        return next(error);
    }
    res.json({status: httpStatusText.SUCCESS , data: {order}});
});

const getALLOrdersOfUser = asyncWrapper(async (req , res , next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
        const error = appError.create('User not found' , 404 , httpStatusText.FAIL);
        return next(error);
    }
    const ordersOfUser = await Order.find({user_id: id});
    res.json({status: httpStatusText.SUCCESS, data: {ordersOfUser}});
});

// FIXME:
const getAllOrdersOfBook = asyncWrapper(async(req , res , next) => {
    const book_id = req.params.book_id;
    const book = await Book.findById(book_id);
    if (!book) {
        const error = appError.create('Book not found' , 404 , httpStatusText.FAIL);
        return next(error);
    }
    const bookOrders = [];
    const orders = await Order.find({});
    orders.forEach(order => {
        const flag = false;
        order.books.forEach(book => {
            if (book.ISBN === isbn) {
                flag = true;
            }
        })
        if (flag) bookOrders.push(order);
    });
    res.json({status: httpStatusText.SUCCESS , data: {bookOrders}});
});

const createOrder = asyncWrapper(async (req , res , next) => {
    const {
        user_id, 
        books,
    } = req.body;
    const order = new Order();
    if (!user_id) {
        const error = appError.create('User not found' , 404 , httpStatusText.FAIL);
        return next(error);
    }
    order.user_id = user_id;
    if (books.length === 0) {
        const error = appError.create('Can not add empty orders' , 400 , httpStatusText.FAIL);
        return next(error);
    }
    order.books = books;
    books.forEach(book => {
        order.total_payment += +book.BookPrice;
    });
    order.order_status = validStatus[0];
    order.order_date = Date.now();
    order.duration_in_mins = 10;
    await order.save();
    res.send({status: httpStatusText.SUCCESS , data: {order}});
});

// TODO: TRY IT
const updateOrder = asyncWrapper(async (req , res , next) => {
    const body = req.body;
    const order_id = body.order_id;
    const order = await Order.findById(order_id);
    if (!order) {
        const error = appError.create('Order not found' , 404 , httpStatusText.FAIL);
        return next(error);
    }
    if (body.books) {
        order.books = body.books;
        order.books.forEach(book => {
            order.total_payment += book.BookPrice;
        });
    }
    if (body.orderStatus) {order.order_status = body.orderStatus;}
    if (body.duration_in_mins) {order.duration_in_mins = body.duration_in_mins;}
    await order.updateOne();
    res.json({status: httpStatusText.SUCCESS , data: {order}});
});

// TODO: TRY IT
const deleteOrder = asyncWrapper(async(req , res , next) => { 
    const order_id = req.params.order_id;
    const order = await Order.findById(order_id);
    if (!order) {
        const error = asyncWrapper.create('Order not found!' , 404 , httpStatusText.FAIL);
        return next(error);
    }
    await order.deleteOne();
    res.send({status: httpStatusText.SUCCESS});
});


module.exports = {
    getAllOrders,
    getAllOrdersOfBook,
    getALLOrdersOfUser,
    readOrder,
    createOrder,
    updateOrder,
    deleteOrder
}