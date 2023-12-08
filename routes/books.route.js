const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require('../middlewares/allowedTo');
const userRoles = require('../utils/userRoles');
const booksController = require('../controllers/books.controller')
router.route('/')
            .get(verifyToken , booksController.getAllBooks)
            .post(verifyToken , allowedTo(userRoles.ADMIN) , booksController.createBook);
router.route('/:id')
            .get(verifyToken , booksController.getBookById)
            .delete(verifyToken , allowedTo(userRoles.ADMIN) , booksController.deleteBook)
            .patch(verifyToken , allowedTo(userRoles.ADMIN) , booksController.updateBookByid);            
router.route('/filterName/:name')
            .get(verifyToken , booksController.getBookByName);
router.route('/filterAuthor/:author')
            .get(verifyToken , booksController.getBookByAuthorName);
router.route('/filterCategory/:category')
            .get(verifyToken , booksController.getBookByCategory);

module.exports = router;