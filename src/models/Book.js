const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  author: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
})

module.exports = mongoose.model('Book', bookSchema)