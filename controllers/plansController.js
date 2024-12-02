const Plans = require('../models/Plans')
exports.createPlan = async (req, res) => {
  try {
    const plan = new Plans(req.body)
    await plan.save()
    res.status(201).json({
      data: plan,
      message: 'Plan Create Success',
    })
  } catch (error) {
    res.status(400).json({ message: 'Create Unsuccess! ' })
  }
}

exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plans.find()
    res.status(200).json(plans)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getPlanById = async (req, res) => {
  try {
    const plans = await Plans.findById(req.params.id)
    if (!plans) {
      return res.status(404).json({ message: 'Plans not found' })
    }
    res.status(200).json(plans)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updatePlans = async (req, res) => {
  try {
    const plans = await Plans.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!plans) {
      return res.status(404).json({ message: 'Plans not found' })
    }
    res.status(200).json({
      data: plans,
      message: 'Plans Update has been Success',
    })
  } catch (error) {
    res.status(400).json({ message: 'Edit Unsuccess!' })
  }
}

exports.deletePlan = async (req, res) => {
  try {
    const plan = await Plans.findByIdAndDelete(req.params.id)
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' })
    }
    res.status(200).json({ message: 'Plan has been deleted.' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
