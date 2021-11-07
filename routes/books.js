const express = require('express');
const router = express.Router();
// import books apis
const {
    createBook,
    deleteBook,
    getAllBooks,
    getBook,
    updateBook
} = require('../controllers/books');
// make route for book create and get all data
router.route('/')
    .get(getAllBooks)
    .post(createBook);
// make route for book get one and remove and update with id 
router.route('/:id')
    .get(getBook)
    .delete(deleteBook)
    .put(updateBook);


module.exports = router;