const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/db')
const customerRoutes = require('./routes/customerRoutes')
const businessRoutes = require('./routes/businessRoutes')
const employeeRoutes = require('./routes/employeeRoutes')
const reminderRoutes = require('./routes/reminderRoutes')
const bodyParser = require('body-parser')

//! securty
const helmet = require('helmet')
const cors = require('cors') // cors paketini dahil ediyoruz

dotenv.config()
connectDB()

const app = express()

app.use(cors()) // cors'u uygulamada kullanıyoruz
app.use(bodyParser.json())
app.use(helmet())

app.use('/api/customers', customerRoutes)
app.use('/api/businesses', businessRoutes)
app.use('/api/employees', employeeRoutes)
app.use('/api/reminder', reminderRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(colors.bgCyan(`Sunucu ${PORT} portunda çalışıyor`))
})
