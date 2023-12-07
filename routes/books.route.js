const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books.controller')

router.route('/')
            .get(booksController.listBooks);
router.route('/')
            .post(booksController.createBook);
router.route('/:id')
            .delete(booksController.deleteBook);
router.route('/:id')
            .patch(booksController.updateBook);            

module.exports = router;