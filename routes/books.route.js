const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books.controller')

router.route('/')
            .post(booksController.createBook);

module.exports = router;