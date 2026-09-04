const User = require('../models/User')
const Book = require('../models/Book')

// GET /users — получить всех пользователей
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('borrowedBooks')
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// GET /users/:id — получить пользователя по ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('borrowedBooks')
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// POST /users — создать пользователя
const createUser = async (req, res) => {
  try {
    const { name, lastname, username } = req.body
    const user = new User({ name, lastname, username })
    await user.save()
    res.status(201).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// PUT /users/:id — обновить пользователя
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// DELETE /users/:id — удалить пользователя
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// GET /users/:id/books — получить книги пользователя
const getUserBooks = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('borrowedBooks')
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(user.borrowedBooks)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserBooks
}