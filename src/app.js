require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bookRoutes = require('./routes/books')
const userRoutes = require('./routes/users')
const errorHandler = require('./middleware/errorHandler')

const app = express()

// ===== ПОДКЛЮЧЕНИЕ К MONGODB =====
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err))

// ===== MIDDLEWARE =====
app.use(cors())
app.use(express.json())

// ===== ЛОГИРОВАНИЕ ЗАПРОСОВ =====
app.use((req, res, next) => {
  console.log(`📌 ${req.method} ${req.originalUrl}`)
  next()
})

// ===== МАРШРУТЫ =====
app.use('/api/books', bookRoutes)
app.use('/api/users', userRoutes)

// ===== ОБРАБОТКА 404 (несуществующий роут) =====
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// ===== ОБРАБОТКА ОШИБОК =====
app.use(errorHandler)

module.exports = app
