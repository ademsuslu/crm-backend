const express = require('express')
const router = express.Router()
const reminderController = require('../controllers/reminderController')

router.post('/', reminderController.createReminder)
router.get('/', reminderController.getAllReminder)
router.get('/:id', reminderController.getReminderById)
router.put('/:id', reminderController.updateReminder)
router.delete('/:id', reminderController.deleteReminder)

module.exports = router
