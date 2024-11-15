const cron = require('node-cron')
const nodemailer = require('nodemailer')
const Reminder = require('../models/Reminder') // Reminder modelini projenize göre import edin

const transporter = nodemailer.createTransport({
  service: 'gmail', // Gmail kullanılıyor
  auth: {
    user: 'ademsuslu9080@gmail.com',
    pass: 'Adem.suslu109578**',
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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email gönderme hatası:', error)
    } else {
      console.log('Email başarıyla gönderildi:', info.response)
    }
  })
}

// `sendTime` zamanı geldiğinde e-posta göndermek için cron job tanımla
cron.schedule('* * * * *', async () => {
  // Her dakika çalışır
  try {
    const currentTime = new Date()
    // `sendTime` geçmiş ancak henüz mail gönderilmemiş hatırlatıcıları bul
    const reminders = await Reminder.find({
      sendTime: { $lte: currentTime },
    })

    // Zamanı gelen her hatırlatıcı için e-posta gönder
    reminders.forEach(async (reminder) => {
      sendMail(reminder)
      // Gönderim işlemi tamamlandıktan sonra `sent` durumunu güncelle
      await reminder.save()
    })
  } catch (error) {
    console.error('Cron job hatası:', error)
  }
})

// Yeni reminder oluşturulduğunda schedule işlemini yap
exports.createReminder = async (req, res) => {
  try {
    const reminder = new Reminder(req.body)
    await reminder.save()
    scheduleMail(reminder) // Zamanlamayı ayarla
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

// Reminder güncelleme
exports.updateReminder = async (req, res) => {
  let id = sanitizeInput(req.params.id)

  try {
    const reminder = await Reminder.findByIdAndUpdate(id, req.body, {
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

// Reminder silme
exports.deleteReminder = async (req, res) => {
  let id = sanitizeInput(req.params.id)
  try {
    const reminder = await Reminder.findByIdAndDelete(id)
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder bulunamadı' })
    }
    res.status(200).json({ message: 'Reminder silindi' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const sanitizeInput = (input) => {
  return input.replace(/[^a-zA-Z0-9\s]/g, '') // Sadece harf ve sayıları kabul et
}
