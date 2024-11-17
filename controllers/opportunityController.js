const Opportunity = require('../models/OpportunityModel')

// Müşteri oluşturma
exports.createOpportunity = async (req, res) => {
  try {
    const opportunity = new Opportunity(req.body)
    await opportunity.save()
    res.status(201).json({
      data: opportunity,
      message: 'Create Success',
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Tüm müşterileri listeleme
exports.getAllOpportunity = async (req, res) => {
  try {
    const opportunities = await Opportunity.find().populate('assignedTo')
    res.status(200).json(opportunities)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Belirli bir müşteri bilgisi getirme
exports.getOpportunityById = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id).populate(
      'assignedTo'
    )
    if (!opportunity)
      return res.status(404).json({ message: 'Fırsat bulunamadı' })
    res.status(200).json(opportunity)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Müşteri güncelleme
exports.updateOpportunity = async (req, res) => {
  const { id } = req.params
  const { stage } = req.body

  if (!stage) {
    return res.status(400).json({ message: 'Stage bilgisi gerekli' })
  }

  try {
    const opportunity = await Opportunity.findByIdAndUpdate(
      id,
      { stage },
      {
        new: true,
        runValidators: true,
      }
    )

    if (!opportunity) {
      return res
        .status(404)
        .json({ message: `ID ${id} ile eşleşen fırsat bulunamadı` })
    }

    res.status(200).json(opportunity)
  } catch (error) {
    res.status(400).json({
      message: 'Fırsat güncellenirken bir hata oluştu',
      error: error.message,
    })
  }
}

// Müşteri silme
exports.deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findByIdAndDelete(req.params.id)
    if (!opportunity)
      return res.status(404).json({ message: 'Fırsat bulunamadı' })
    res.status(200).json({ message: 'Fırsat başarıyla silindi' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// search

// exports.searchOpportunity = async (req, res) => {
//   try {
//     const { ad } = req.query
//     const sanitizedAd = sanitizeInput(ad) // ad parametresini temizle
//     // Arama için ad parametresi kontrolü
//     if (!ad) {
//       return res
//         .status(400)
//         .json({ message: 'Arama için müşteri adı (ad) belirtmelisiniz.' })
//     }

//     // Müşterileri ad alanına göre regex ile filtreleyerek getirme
//     const customers = await Opportunity.find({
//       ad: { $regex: sanitizedAd, $options: 'i' },
//     })

//     if (customers.length === 0) {
//       return res.status(404).json({ message: 'Müşteri bulunamadı.' })
//     }

//     return res.status(200).json(customers) // return ifadesini ekleyin
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({ message: error.message }) // return ekleyin
//   }
// }

const sanitizeInput = (input) => {
  return input.replace(/[^a-zA-Z0-9\s]/g, '') // Sadece harf ve sayıları kabul et
}
