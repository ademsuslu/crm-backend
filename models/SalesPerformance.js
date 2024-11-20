const mongoose = require('mongoose')

const salesPerformanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalSales: { type: Number, default: 0 }, // Toplam satış miktarı
  dealsClosed: { type: Number, default: 0 }, // Kapanan fırsat sayısı
  avgDealTime: { type: Number, default: 0 }, // Ortalama anlaşma süresi (gün)
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const SalesPerformance = mongoose.model(
  'SalesPerformance',
  salesPerformanceSchema
)

module.exports = SalesPerformance
