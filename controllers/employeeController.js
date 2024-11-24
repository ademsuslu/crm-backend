const Employee = require('../models/Employee')

// Çalışan oluşturma
exports.createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body)
    await employee.save()
    res.status(201).json(employee)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
    res.status(200).json(employees)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Belirli bir iş yerine ait tüm çalışanları listeleme
exports.getEmployeesByBusiness = async (req, res) => {
  try {
    const employees = await Employee.find({ businessId: req.params.businessId })
    res.status(200).json(employees)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Belirli bir çalışanı getirme
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate(
      'businessId'
    )
    if (!employee) {
      return res.status(404).json({ message: 'Çalışan bulunamadı' })
    }
    res.status(200).json(employee)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Çalışan güncelleme
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!employee) {
      return res.status(404).json({ message: 'Çalışan bulunamadı' })
    }
    res.status(200).json({ message: 'Employee has been updated' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Çalışan silme
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id)
    if (!employee) {
      return res.status(404).json({ message: 'Çalışan bulunamadı' })
    }
    res.status(200).json({ message: 'Employee has been deleted.' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
