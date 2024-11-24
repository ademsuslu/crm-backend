const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')

// Yeni görev oluşturma
router.post('/', taskController.createTask)

// Görevleri listeleme
router.get('/', taskController.getTasks)

// Id ye göre görev getirme
router.get('/:id', taskController.getTaskById)
// router.put('/:id', taskController.getTaskById)

// Görev güncelleme
router.put('/:id', taskController.updateTask)

// Görev silme
router.delete('/:id', taskController.deleteTask)

module.exports = router
