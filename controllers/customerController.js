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

// search

exports.searchCustomer = async (req, res) => {
  try {
    const sanitizeInput = (input) => {
      return input.replace(/[^a-zA-Z0-9\s]/g, '') // Sadece harf ve sayıları kabul et
    }
    const { ad } = req.query
    const sanitizedAd = sanitizeInput(ad) // ad parametresini temizle
    // Arama için ad parametresi kontrolü
    if (!ad) {
      return res
        .status(400)
        .json({ message: 'Arama için müşteri adı (ad) belirtmelisiniz.' })
    }

    // Müşterileri ad alanına göre regex ile filtreleyerek getirme
    const customers = await Customer.find({
      ad: { $regex: sanitizedAd, $options: 'i' },
    })

    if (customers.length === 0) {
      return res.status(404).json({ message: 'Müşteri bulunamadı.' })
    }

    return res.status(200).json(customers) // return ifadesini ekleyin
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message }) // return ekleyin
  }
}
