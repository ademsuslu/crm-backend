const Task = require('../models/Task')
const Employee = require('../models/Employee')

// Yeni görev oluşturma
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, assignedEmployees } =
      req.body

    // Görev oluşturma
    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      assignedEmployees,
    })

    // Görevi kaydet
    await task.save()
    res.status(201).json({ message: 'Görev başarıyla oluşturuldu!', task })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Bir hata oluştu', error: error.message })
  }
}

// Görevleri listeleme
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate(
      'assignedEmployees',
      'name position phone'
    ) // Çalışan bilgilerini dahil et
    res.status(200).json({ data: tasks, message: 'Tasks' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Bir hata oluştu', error: error.message })
  }
}
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      'assignedEmployees'
    )
    if (!task) {
      return res.status(404).json({ message: 'İş yeri bulunamadı' })
    }
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
// Görev güncelleme
exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params
    const { title, description, priority, dueDate, assignedEmployees, status } =
      req.body

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, priority, dueDate, assignedEmployees, status },
      { new: true } // Güncellenen task'ı geri döndür
    )

    if (!updatedTask) {
      return res.status(404).json({ message: 'Görev bulunamadı' })
    }

    res
      .status(200)
      .json({ message: 'Görev başarıyla güncellendi!', task: updatedTask })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Bir hata oluştu', error: error.message })
  }
}

// Görev silme
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params
    const deletedTask = await Task.findByIdAndDelete(taskId)

    if (!deletedTask) {
      return res.status(404).json({ message: 'Görev bulunamadı' })
    }

    res.status(200).json({ message: 'Görev başarıyla silindi!' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Bir hata oluştu', error: error.message })
  }
}
