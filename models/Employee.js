const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
    },
    phone: {
      type: String,
    },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Employee', employeeSchema)
