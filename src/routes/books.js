const express = require('express')
const router = express.Router()
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook
} = require('../controllers/bookController')

// GET /books — получить все книги
router.get('/', getAllBooks)

// GET /books/:id — получить книгу по ID
router.get('/:id', getBookById)

// POST /books — создать книгу
router.post('/', createBook)

// PUT /books/:id — обновить книгу
router.put('/:id', updateBook)

// DELETE /books/:id — удалить книгу
router.delete('/:id', deleteBook)

// POST /books/:id/borrow — взять книгу
router.post('/:id/borrow', borrowBook)

// POST /books/:id/return — вернуть книгу
router.post('/:id/return', returnBook)

module.exports = router