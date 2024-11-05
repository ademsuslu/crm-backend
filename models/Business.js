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

module.exports = mongoose.model('Business', businessSchema)
