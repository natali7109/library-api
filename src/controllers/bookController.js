const Book = require('../models/Book')
const User = require('../models/User')

// GET /books — получить все книги
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('borrowedBy', 'name lastname')
    res.status(200).json(books)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// GET /books/:id — получить книгу по ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('borrowedBy', 'name lastname')
    if (!book) {
      return res.status(404).json({ error: 'Book not found' })
    }
    res.status(200).json(book)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// POST /books — создать книгу
const createBook = async (req, res) => {
  try {
    const { title, author, year } = req.body
    const book = new Book({ title, author, year })
    await book.save()
    res.status(201).json(book)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// PUT /books/:id — обновить книгу
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!book) {
      return res.status(404).json({ error: 'Book not found' })
    }
    res.status(200).json(book)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// DELETE /books/:id — удалить книгу
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id)
    if (!book) {
      return res.status(404).json({ error: 'Book not found' })
    }
    res.status(200).json({ message: 'Book deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// POST /books/:id/borrow — взять книгу
const borrowBook = async (req, res) => {
  try {
    const { borrowerId } = req.body
    const book = await Book.findById(req.params.id)
    if (!book) {
      return res.status(404).json({ error: 'Book not found' })
    }
    if (!book.isAvailable) {
      return res.status(400).json({ error: 'Book is already borrowed' })
    }
    const user = await User.findById(borrowerId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    book.isAvailable = false
    book.borrowedBy = borrowerId
    await book.save()

    user.borrowedBooks.push(book._id)
    await user.save()

    res.status(200).json({ message: 'Book borrowed successfully', book })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// POST /books/:id/return — вернуть книгу
const returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      return res.status(404).json({ error: 'Book not found' })
    }
    if (book.isAvailable) {
      return res.status(400).json({ error: 'Book is already available' })
    }

    const user = await User.findById(book.borrowedBy)
    if (user) {
      user.borrowedBooks = user.borrowedBooks.filter(
        id => id.toString() !== book._id.toString()
      )
      await user.save()
    }

    book.isAvailable = true
    book.borrowedBy = null
    await book.save()

    res.status(200).json({ message: 'Book returned successfully', book })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook
}
