const express = require('express')
const router = express.Router()
const plansController = require('../controllers/plansController')

// Yeni Plan oluşturma
router.post('/', plansController.createPlan)

// Planleri listeleme
router.get('/', plansController.getAllPlans)

// Id ye göre Plan getirme
router.get('/:id', plansController.getPlanById)
// router.put('/:id', plansController.getTaskById)

// Plan güncelleme
router.put('/:id', plansController.updatePlans)

// Plan silme
router.delete('/:id', plansController.deletePlan)

module.exports = router
