require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_URL;
const httpStatusText = require('./utils/httpStatusText');

const usersRouter = require('./routes/users.route');

const Order = require('./models/order.model');

app.use(cors()) // TODO: remove this in production
app.use(express.json());

// routes
app.use('/api/users', usersRouter);


// home route
app.get('/', (req, res) => {
  res.send('Welcome to our API');
});

// global middlewares for not found router
app.all('*', (req, res, next)=> {
  return res.status(404).json({ status: httpStatusText.ERROR, message: 'This resource is not available'})
})

// global error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({status: error.statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500, data: null});
})


// 

/**
 * 
 * {
 *  stutas: "" // "success", "fail" ,"error"
 *  data: [] // null
 *  // fail , error
 *  mesage: {// error msg}
 *  code: 500
 * }
 * 
 * 
 */
// add order api
app.post('/api/addOrder' , (req , res) => {
  const orderStatus = ['pending' , 'canceled' , 'arrived']
  const defaultDuration = "10 minutes."
  const data = {
    user_id , 
    books ,
    order_date: Date.now(),
    order_status: orderStatus[0],
    duration_in_mins: defaultDuration,
    totalPayment: 0   
  }

  // handle null values of the order request.
  if (req.user_id) user_id = req.user_id;
  if (books && books.length > 0) books = req.books;

  // handle user does not exist.

  // calculate total payment of the order.
})

// Start the server
mongoose.set("strictQuery", false);
mongoose.connect(URL)
.then(()=>{
    console.log("connected To MongoDB");
    // listen on specific port
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}).catch((error)=>{
    console.log('we cant connect to mongodb'+ error);
})
