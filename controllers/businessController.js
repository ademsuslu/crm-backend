const Business = require('../models/Business')

// İş yeri oluşturma
exports.createBusiness = async (req, res) => {
  try {
    const business = new Business(req.body)
    await business.save()
    res.status(201).json({
      data: business,
      message: 'Business Create Success',
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Tüm iş yerlerini listeleme
exports.getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find().populate('employees')
    res.status(200).json(businesses)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Belirli bir iş yerini getirme
exports.getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id).populate(
      'employees'
    )
    if (!business) {
      return res.status(404).json({ message: 'Bussiness not found' })
    }
    res.status(200).json(business)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// İş yeri güncelleme
exports.updateBusiness = async (req, res) => {
  try {
    const business = await Business.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!business) {
      return res.status(404).json({ message: 'Bussiness not found' })
    }
    res.status(200).json({ message: 'Updated business Successfully' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// İş yeri silme
exports.deleteBusiness = async (req, res) => {
  try {
    const business = await Business.findByIdAndDelete(req.params.id)
    if (!business) {
      return res.status(404).json({ message: 'Bussiness not found' })
    }
    res.status(200).json({ message: 'Delete Business Successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
