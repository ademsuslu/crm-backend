const express = require('express')
const router = express.Router()
const salesPerformanceController = require('../controllers/SalesPerformanceController')

router.post('/', salesPerformanceController.createSalesPerformance)
router.get('/', salesPerformanceController.getAllSalesPerformance)
// router.get('/business/:businessId', employeeController.getEmployeesByBusiness)
// router.get('/:id', employeeController.getEmployeeById)
// router.put('/:id', employeeController.updateEmployee)
// router.delete('/:id', employeeController.deleteEmployee)

module.exports = router
