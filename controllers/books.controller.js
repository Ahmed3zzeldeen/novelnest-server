const asyncWrapper = require("../middlewares/asyncWrapper");
const Book = require('../models/books.model');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');

const createBook = asyncWrapper(async(req , res , next) => {
  const {
    BookName ,
    Author ,
    ISBN ,
    BookPrice ,
    NoPages ,
    BookCover ,
    BookCategory ,
    Rate ,
    Replyno 
  } = req.body;
  const oldBook = await Book.findOne({ISBN: ISBN}); 
  if (oldBook) {
    const error = appError.create('Book is already exist' , 400 , httpStatusText.FAIL);
    return next(error);
  }
  const book = new Book();
  if (BookName) book.BookName = BookName;
  if (Author) book.Author = Author;
  if (ISBN) book.ISBN = ISBN;
  if (BookPrice) book.BookPrice = BookPrice;
  if (NoPages) book.NoPages = NoPages;
  if (BookCover) book.BookCover = BookCover;
  if (BookCategory) book.BookCategory = BookCategory;
  if (Rate) book.Rate = Rate;
  if (Replyno) book.Replyno = Replyno;
  await book.save();
  res.send({status: httpStatusText.SUCCESS , data: {book}});
});



module.exports = {
  createBook
}
