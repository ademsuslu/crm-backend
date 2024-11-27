const cron = require('node-cron')
const nodemailer = require('nodemailer')
const Reminder = require('../models/Reminder') // Reminder modelini projenize göre import edin

const transporter = nodemailer.createTransport({
  service: 'gmail', // Gmail kullanılıyor
  auth: {
    user: 'ademsuslu9080@gmail.com',
    pass: 'dsxf giwj iqps npbm',
  },
  tls: {
    rejectUnauthorized: false, // Sertifika doğrulamasını geçersiz kılar
  },
})

// E-posta gönderme fonksiyonu
const sendMail = (reminder) => {
  const mailOptions = {
    from: reminder.senderMail,
    to: reminder.receiverMail,
    subject: 'Hatırlatma',
    text: reminder.content,
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email gönderme hatası:', error)
        reject(error)
      } else {
        console.log('Email başarıyla gönderildi:', info.response)
        resolve(info.response)
      }
    })
  })
}

// `sendTime` zamanı geldiğinde e-posta göndermek için cron job tanımla
cron.schedule('* * * * *', async () => {
  // Her dakika çalışır
  try {
    const currentTime = new Date()
    // `sendTime` geçmiş ve henüz gönderilmemiş hatırlatıcıları bul
    const reminders = await Reminder.find({
      sendTime: { $lte: currentTime },
      sent: false, // Sadece gönderilmemiş hatırlatıcılar
    })

    // Zamanı gelen her hatırlatıcı için e-posta gönder
    for (const reminder of reminders) {
      try {
        await sendMail(reminder) // E-posta gönder
        reminder.sent = true // Gönderildi olarak işaretle
        await reminder.save() // Durumu kaydet
      } catch (emailError) {
        console.error('Hatırlatma gönderme sırasında hata:', emailError)
      }
    }
  } catch (error) {
    console.error('Cron job hatası:', error)
  }
})

// Yeni reminder oluşturulduğunda schedule işlemini yap
exports.createReminder = async (req, res) => {
  try {
    const reminder = new Reminder({
      ...req.body,
      sent: false, // Yeni hatırlatıcı oluşturulduğunda varsayılan olarak `sent: false`
    })
    await reminder.save()
    res.status(201).json({
      data: reminder,
      message: 'Create Success',
    })
  } catch (error) {
    res.status(400).json({ message: 'Create Unsuccess! ' })
  }
}

//! ********************************

// Tüm Reminderleri listeleme
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

// Belirli bir Reminder bilgisi getirme
exports.getReminderById = async (req, res) => {
  let id = sanitizeInput(req.params.id)
  try {
    const reminder = await Reminder.findById(id)
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' })
    }
    res.status(200).json({
      data: reminder,
      message: 'Reminder',
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Reminder güncelleme
exports.updateReminder = async (req, res) => {
  let id = sanitizeInput(req.params.id)

  try {
    const reminder = await Reminder.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' })
    }
    res.status(200).json({
      data: reminder,
      message: 'Edit Success',
    })
  } catch (error) {
    res.status(400).json({ message: 'Edit Unsuccess!' })
  }
}

// Reminder silme
exports.deleteReminder = async (req, res) => {
  let id = sanitizeInput(req.params.id)
  try {
    const reminder = await Reminder.findByIdAndDelete(id)
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' })
    }
    res.status(200).json({ message: 'Reminder has been deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const sanitizeInput = (input) => {
  return input.replace(/[^a-zA-Z0-9\s]/g, '') // Sadece harf ve sayıları kabul et
}
