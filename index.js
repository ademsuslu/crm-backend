const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const customerRoutes = require('./routes/customerRoutes')
const bodyParser = require('body-parser')

dotenv.config()
connectDB()

const app = express()
app.use(bodyParser.json())

app.use('/api/customers', customerRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`)
})
