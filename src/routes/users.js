const express = require('express')
const router = express.Router()
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserBooks
} = require('../controllers/userController')

// GET /users — получить всех пользователей
router.get('/', getAllUsers)

// GET /users/:id — получить пользователя по ID
router.get('/:id', getUserById)

// POST /users — создать пользователя
router.post('/', createUser)

// PUT /users/:id — обновить пользователя
router.put('/:id', updateUser)

// DELETE /users/:id — удалить пользователя
router.delete('/:id', deleteUser)

// GET /users/:id/books — получить книги пользователя
router.get('/:id/books', getUserBooks)

module.exports = router