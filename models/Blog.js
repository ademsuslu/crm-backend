const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    trim: true, // Baş ve sondaki boşlukları temizler
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  link: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
