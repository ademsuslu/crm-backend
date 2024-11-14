const Reminder = require('../models/Reminder')

// Müşteri oluşturma
exports.createReminder = async (req, res) => {
  try {
    const reminder = new Reminder(req.body)
    await reminder.save()
    res.status(201).json({
      data: reminder,
      message: 'Create Success',
    })
  } catch (error) {
    res.status(400).json({ message: 'Create Unsuccess! ' })
  }
}

// Tüm müşterileri listeleme
exports.getAllReminder = async (req, res) => {
  try {
    const reminders = await Reminder.find()
    res.status(200).json({
      data: reminders,
      message: 'Reminders',
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// --------------------------------------------------

// Belirli bir müşteri bilgisi getirme
exports.getReminderById = async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id)
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder bulunamadı' })
    }
    res.status(200).json({
      data: reminder,
      message: 'Reminder',
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Müşteri güncelleme
exports.updateCustomer = async (req, res) => {
  try {
    const reminder = await Reminder.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder bulunamadı' })
    }
    res.status(200).json({
      data: reminder,
      message: 'Edit Success',
    })
  } catch (error) {
    res.status(400).json({ message: 'Edit Unsuccess!' })
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

const sanitizeInput = (input) => {
  return input.replace(/[^a-zA-Z0-9\s]/g, '') // Sadece harf ve sayıları kabul et
}
