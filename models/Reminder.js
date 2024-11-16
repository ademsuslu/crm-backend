const mongoose = require('mongoose')

const reminderSchema = new mongoose.Schema(
  {
    senderMail: {
      type: String,
      required: true,
    },
    receiverMail: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    sendTime: Date,
    sent: { type: Boolean, default: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Reminder', reminderSchema)
