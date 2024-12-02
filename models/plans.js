const mongoose = require('mongoose')
const plansSchema = new mongoose.Schema(
  {
    //! ordere eklenecek userId
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User', // Kullanıcı ile ilişki kurmak için
    //   required: true, // Kullanıcı ID'si zorunlu
    // },
    plan: {
      type: String,
      required: true,
      enum: ['Free', 'Starter', 'Professional', 'Enterprise'],
      default: 'Free',
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Fiyat negatif olamaz
    },
    features: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true } // Oluşturulma ve güncellenme zamanlarını otomatik ekler
)

module.exports = mongoose.model('Plans', plansSchema)
