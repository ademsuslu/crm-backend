const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')
dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(colors.blue('MongoDB bağlantısı başarılı'))
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error.message)
    process.exit(1)
  }
}

module.exports = connectDB
