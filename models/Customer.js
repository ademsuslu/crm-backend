const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema(
  {
    ad: {
      type: String,
      required: true,
    },
    soyad: {
      type: String,
      required: true,
    },
    cinsiyet: {
      type: String,
      enum: ['Erkek', 'Kadın', 'Diğer'],
    },
    dogum_tarihi: Date,
    iletisim_bilgileri: {
      telefon: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      adres: {
        sokak: String,
        sehir: String,
        posta_kodu: String,
        ulke: String,
      },
      sosyal_medya: {
        twitter: String,
        linkedin: String,
      },
    },
    sirket_bilgileri: {
      sirket_adi: String,
      gorev: String,
      sirket_adresi: {
        sokak: String,
        sehir: String,
        posta_kodu: String,
        ulke: String,
      },
    },
    satin_alma_gecmisi: [
      {
        siparis_id: String,
        urun: String,
        miktar: Number,
        toplam_fiyat: Number,
        tarih: Date,
      },
    ],
    segmentasyon: {
      musteri_segmenti: {
        type: String,
        enum: ['Bireysel', 'Kurumsal', 'VIP'],
      },
      ilgi_alanlari: [String],
      sadakat_durumu: {
        type: String,
        enum: ['Yeni Müşteri', 'Sadık Müşteri', 'Potansiyel Müşteri'],
      },
    },
    iliskiler: {
      asama: {
        type: String,
        enum: ['Yeni', 'Mevcut Müşteri', 'Potansiyel Müşteri'],
      },
      notlar: String,
    },
    pazarlama_izinleri: {
      email_izni: Boolean,
      sms_izni: Boolean,
      tercih_edilen_kanal: {
        type: String,
        enum: ['Email', 'SMS', 'Telefon'],
      },
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Customer', customerSchema)
