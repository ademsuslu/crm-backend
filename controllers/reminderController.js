const Reminder = require('../models/Reminder')

// Müşteri oluşturma
exports.createReminder = async (req, res) => {
  try {
    let body = sanitizeInput(req.body)
    const reminder = new Reminder(body)
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

// Belirli bir müşteri bilgisi getirme
exports.getReminderById = async (req, res) => {
  let id = sanitizeInput(req.params.id)
  try {
    const reminder = await Reminder.findById(id)
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
exports.updateReminder = async (req, res) => {
  let id = sanitizeInput(req.params.id)
  let body = sanitizeInput(req.body)
  try {
    const reminder = await Reminder.findByIdAndUpdate(id, body, {
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
exports.deleteReminder = async (req, res) => {
  let id = sanitizeInput(req.params.id)
  try {
    const reminder = await Reminder.findByIdAndDelete(id)
    if (!reminder) {
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
