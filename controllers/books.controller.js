const asyncWrapper = require("../middlewares/asyncWrapper");
const Book = require("../models/books.model");
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");


const getAllBooks = asyncWrapper(async(req , res , next) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  const books = await Book.find({}, {"__v": false, 'password': false}).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: {books}});
});

const getBookById = asyncWrapper(async (req, res, next) => {
  const bookid = req.params.id;
  const book = await Book.findById(bookid);
  if (!book) {
    const err = appError.create("Book not found", 404, httpStatusText.FAIL);
    return next(err);
  }
  res.json({ staus: httpStatusText.SUCCESS, data: { book } });
});

const getBookByName = asyncWrapper(async (req, res, next) => {
  const bookname = req.params.name;
  const book = await Book.findOne({BookName: bookname});
  if (!book) {
    const err = appError.create("Book not found", 404, httpStatusText.FAIL);
    return next(err);
  }
  res.json({ staus: httpStatusText.SUCCESS, data: { book }});
});

const getBookByAuthorName = asyncWrapper(async (req, res, next) => {
  const authername = req.params.author;
  const book = await Book.findOne({Author: authername});
  if (!book) {
    const err = appError.create("authername not found", 404, httpStatusText.FAIL);
    return next(err);
  }
  res.json({ staus: httpStatusText.SUCCESS, data: { book } });
});

const getBookByCategory = asyncWrapper(async (req, res, next) => {
  const category = req.params.category;
  const book = await Book.findOne({BookCategory: category});
  if (!book) {
    const err = appError.create("category not found", 404, httpStatusText.FAIL);
    return next(err);
  }
  res.json({ staus: httpStatusText.SUCCESS, data: { book } });
});


const createBook = asyncWrapper(async (req, res , next) => {
    const {
      BookName,
      Author,
      BookPrice,
      ISBN,
      NoPages,
      BookCover,
      BookCategory,
      Rate,
      Replyno,
    } = req.body;
    let book = await Book.findOne({ISBN: ISBN});
    if (book) {
      const err = appError.create('Book already exist' , 400 , httpStatusText.FAIL)
      return next(err);
    }
    book = new Book();
    if (BookName) {
      book.BookName = BookName;
    }
    if (Author) {
      book.Author = Author;
    }
    if (BookPrice) {
      book.BookPrice = BookPrice;
    }
    if (ISBN) {
      book.ISBN = ISBN;
    }
    if (NoPages) {
      book.NoPages = NoPages;
    }
    if (BookCategory) {
      book.BookCategory = BookCategory;
    }
    if (BookCover) {
      book.BookCover = BookCover;
    }
    if (Rate) {
      book.Rate = Rate;
    }
    if (Replyno) {
      book.Replyno = Replyno;
    }
    await book.save();
    res.json({status: httpStatusText.SUCCESS , data: {book}});
  }
);

const updateBookByid = asyncWrapper(async (req, res, next) => {
  const bookId = req.params.id;
  const {
    BookName,
    Author,
    BookPrice,
    ISBN,
    NoPages,
    BookCover,
    BookCategory,
    Rate,
    Replyno,
  } = req.body;
  const book = await Book.findById(bookId);
  if (!book) {
    const err = appError.create("Book not found", 404, httpStatusText.FAIL);
    return next(err);
  }
  if (BookName) {
    book.BookName = BookName;
  }
  if (Author) {
    book.Author = Author;
  }
  if (BookPrice) {
    book.BookPrice = BookPrice;
  }
  if (ISBN) {
    book.ISBN = ISBN;
  }
  if (NoPages) {
    book.NoPages = NoPages;
  }
  if (BookCategory) {
    book.BookCategory = BookCategory;
  }
  if (BookCover) {
    book.BookCover = BookCover;
  }
  if (Rate) {
    book.Rate = Rate;
  }
  if (Replyno) {
    book.Replyno = Replyno;
  }
  await book.save();
  res.json({ status: httpStatusText.SUCCESS, data: { book: book } });
});

const deleteBook = asyncWrapper(async (req, res, next) => {
  const bookId = req.params.id;
  const book = await Book.findById(bookId);
  if (!book) {
    const err = appError.create("Book not found", 404, httpStatusText.FAIL);
    return next(err);
  }
  await book.deleteOne();
  res.json({ status: httpStatusText.SUCCESS, data: { book } });
});

module.exports = {
  getAllBooks,
  getBookById,
  deleteBook,
  updateBookByid,
  createBook,
  getBookByName,
  getBookByAuthorName,
  getBookByCategory
};
