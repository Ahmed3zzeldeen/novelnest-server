const asyncWrapper = require("../middlewares/asyncWrapper");
const Book = require('../models/books.model');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');

const listBooks = asyncWrapper(async (req, res) => {
  const { bookName, author, category } = req.query;

  try {
    let query = {};

    if (bookName) {
      query.BookName = new RegExp(bookName, 'i');
    }

    if (author) {
      query.Author = new RegExp(author, 'i');
    }

    if (category) {
      query.BookCategory = new RegExp(category, 'i');
    }

    const books = await Book.find(query);
    res.json(books);
  }
   catch (error) {
    res.status(500).json({ message: error.message });
  }});


  const isAdmin = asyncWrapper((req, res) => {
    if (req.user && req.user.isAdmin) {
      next(); 
    } else {
      res.status(403).json({ message: 'Permission denied. Admin access required.' });
    }
  });
  
  const createBook = asyncWrapper(async (req, res) => {
    try {
      const newBook = await Book.create(req.body);
      res.json({ message: 'Book created successfully.' , Book:newBook});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  const updateBook = asyncWrapper(async (req, res) => {
    try {
      const bookId = req.params.id;
      const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, { new: true });
      if (!updatedBook) {
        return res.status(404).json({ message: 'Book not found.' });
      }
  
      res.json({ message: 'Book updated successfully.' , Book:updatedBook});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  const deleteBook = asyncWrapper(async (req, res) => {
    try {
      const bookId = req.params.id;
      const deletedBook = await Book.findByIdAndDelete(bookId);
  
      if (!deletedBook) {
        return res.status(404).json({ message: 'Book not found.' });
      }
      res.json({ message: 'Book deleted successfully.', book: deletedBook });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


module.exports = {
  listBooks,
  isAdmin,
  deleteBook,
  updateBook,
  createBook
}