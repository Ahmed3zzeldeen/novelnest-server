require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_URL;
const httpStatusText = require('./utils/httpStatusText');

const usersRouter = require('./routes/users.route');

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
