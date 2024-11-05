const Customer = require('../models/Customer')

// Müşteri oluşturma
exports.createCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body)
    await customer.save()
    res.status(201).json(customer)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Tüm müşterileri listeleme
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find()
    res.status(200).json(customers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Belirli bir müşteri bilgisi getirme
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)
    if (!customer) {
      return res.status(404).json({ message: 'Müşteri bulunamadı' })
    }
    res.status(200).json(customer)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Müşteri güncelleme
exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!customer) {
      return res.status(404).json({ message: 'Müşteri bulunamadı' })
    }
    res.status(200).json(customer)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Müşteri silme
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id)
    if (!customer) {
      return res.status(404).json({ message: 'Müşteri bulunamadı' })
    }
    res.status(200).json({ message: 'Müşteri silindi' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
