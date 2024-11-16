const mongoose = require('mongoose')

const opportunitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Baş ve sondaki boşlukları temizler
  },
  stage: {
    type: String,
    enum: ['İletişim', 'Teklif', 'Görüşme', 'Kapalı', 'Kazandı', 'Kaybetti'], // Belirli aşama türleri
    default: 'İletişim',
  },
  value: {
    type: Number,
    required: true, // Fırsatın parasal değeri zorunlu
    min: 0, // Minimum 0 olmalı
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Kullanıcı ile ilişki
  },
  createdAt: {
    type: Date,
    default: Date.now, // Varsayılan olarak oluşturulma tarihi
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Şema öncesinde "updatedAt" tarihini otomatik güncelle
opportunitySchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

const Opportunity = mongoose.model('Opportunity', opportunitySchema)

module.exports = Opportunity
