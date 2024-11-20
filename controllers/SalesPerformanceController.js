const SalesPerformance = require('../models/SalesPerformance')

exports.createSalesPerformance = async (req, res) => {
  const { userId, dealAmount, dealTime } = req.body // Gelen veriler: kullanıcı, anlaşma miktarı ve süresi

  try {
    // Kullanıcıya ait mevcut performans verisini bul
    let performance = await SalesPerformance.findOne({ userId })

    if (performance) {
      // Güncelleme işlemi
      const totalDeals = performance.dealsClosed + 1
      performance.totalSales += dealAmount
      performance.dealsClosed = totalDeals
      performance.avgDealTime =
        (performance.avgDealTime * (totalDeals - 1) + dealTime) / totalDeals
      performance.updatedAt = Date.now()

      await performance.save()
    } else {
      // Yeni performans verisi oluştur
      performance = new SalesPerformance({
        userId,
        totalSales: dealAmount,
        dealsClosed: 1,
        avgDealTime: dealTime,
      })
      await performance.save()
    }

    res.status(200).json({ success: true, performance })
  } catch (error) {
    console.error('Performans güncelleme hatası:', error)
    res.status(500).json({ success: false, error: 'Performans güncellenemedi' })
  }
}

exports.getAllSalesPerformance = async (req, res) => {
  try {
    const performances = await SalesPerformance.find().populate(
      'userId',
      'name email'
    )
    res.status(200).json({ success: true, performances })
  } catch (error) {
    console.error('Performans listeleme hatası:', error)
    res
      .status(500)
      .json({ success: false, error: 'Performans verileri getirilemedi' })
  }
}
