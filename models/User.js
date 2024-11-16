const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Baş ve sondaki boşlukları temizler
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email benzersiz olmalı
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'sales', 'manager'], // Kullanıcı rolleri
    default: 'sales',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
