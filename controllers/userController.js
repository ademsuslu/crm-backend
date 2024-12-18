const User = require('../models/User')

// Tüm kullanıcıları getir
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Kullanıcı oluştur
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // Aynı email'e sahip bir kullanıcı var mı kontrol et
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already use' })
    }

    const user = new User({ name, email, password, role })
    await user.save()
    res.status(201).json({ data: user, message: 'User has been created.' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Belirli bir kullanıcıyı getir
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Kullanıcıyı güncelle
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json({ data: user, message: 'User has been update.' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Kullanıcıyı sil
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json({ message: 'User has been deleted.' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
