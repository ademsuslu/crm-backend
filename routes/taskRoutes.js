const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')

// Yeni görev oluşturma
router.post('/', taskController.createTask)

// Görevleri listeleme
router.get('/', taskController.getTasks)

// Görev güncelleme
router.put('/:taskId', taskController.updateTask)

// Görev silme
router.delete('/:taskId', taskController.deleteTask)

module.exports = router
