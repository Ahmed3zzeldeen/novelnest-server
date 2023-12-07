const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.ObjectId ,
            require: true
        },
        books: {
            type: Array , 
            required: true
        },
        order_date: {
            type: Date , 
            required: true
        },
        order_status: {
            type: String , 
            required: true
        },
        duration_in_mins: {
            type: Number , 
            required: true
        },
        total_payment: {
            type: Number , 
            required: true
        } 
    },
    {
        timestamps: true
    }   
);

module.exports = mongoose.model('Order' , orderSchema);