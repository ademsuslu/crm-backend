const express = require('express')
const router = express.Router()
const reminderController = require('../controllers/reminderController')

router.get('/', reminderController.getAllReminder)
router.post('/', reminderController.createReminder)
// router.get('/search', reminderController.searchCustomer)
// router.get('/', reminderController.getAllReminder)
// router.get('/:id', reminderController.getCustomerById)
// router.put('/:id', reminderController.updateCustomer)
// router.delete('/:id', reminderController.deleteCustomer)

module.exports = router
