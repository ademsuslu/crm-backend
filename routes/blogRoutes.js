const express = require('express')
const blogController = require('../controllers/blogController')

const router = express.Router()

router.get('/', blogController.getAllBlog) // Tüm blogları getir
router.post('/', blogController.createBlog) // Yeni blog oluştur
router.get('/title/:title', blogController.getBlogByTitle) // Başlığa göre getir
router.get('/:id', blogController.getBlogById) // ID'ye göre getir
router.patch('/:id', blogController.updateBlog) // Blog güncelle
router.delete('/:id', blogController.deleteBlog) // Blog sil

module.exports = router
