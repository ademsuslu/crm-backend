const mongoose = require('mongoose')

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
)

// Çalışanları ilişkilendiren sanal alan
businessSchema.virtual('employees', {
  ref: 'Employee',
  localField: '_id',
  foreignField: 'businessId',
})

// populate işleminin çalışması için sanal alanları JSON çıktısına dahil ediyoruz
businessSchema.set('toObject', { virtuals: true })
businessSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Business', businessSchema)
