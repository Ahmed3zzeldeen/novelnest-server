const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books.controller')

router.route('/')
              .get(booksController.getAllBooks);

module.exports = router;