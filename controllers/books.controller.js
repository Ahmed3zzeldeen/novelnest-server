const asyncWrapper = require("../middlewares/asyncWrapper");
const Book = require('../models/books.model');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');



const getAllBooks = asyncWrapper(async (req , res , next) => {
  const name = req.query.BookName;
  if (!name) {
      const error = appError.create('Book not found' , 404 , httpStatusText.FAIL);
      return next(error);
  }
  const bookname = await Book.find({BookName: name});
  res.json({staus: httpStatusText.SUCCESS, data: {bookname}});
});


const getauthorName = asyncWrapper(async (req , res , next) => {
  const Author = req.params.Author;
  if (!Author) {
      const error = appError.create('Author not found' , 404 , httpStatusText.FAIL);
      return next(error);
  }
  const Authorname = await Book.find({Author: Authorname});
  res.json({staus: httpStatusText.SUCCESS, data: {Authorname}});
});

const getbookbycategory = asyncWrapper(async (req , res , next) => {
  const BookCategory = req.params.BookCategory;
  if (!BookCategory) {
      const error = appError.create('BookCategory not found' , 404 , httpStatusText.FAIL);
      return next(error);
  }
  const BookCategorytype = await Order.find({BookCategory: BookCategorytype});
  res.json({staus: httpStatusText.SUCCESS, data: {BookCategorytype}});
});


module.exports = {
  getAllBooks,
  getauthorName,
  getbookbycategory
}
