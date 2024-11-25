const Task = require('../models/Task')
const Employee = require('../models/Employee')

// Yeni görev oluşturma
// exports.createTask = async (req, res) => {
//   try {
//     const { title, description, priority, dueDate, assignedEmployees } =
//       req.body

//     // Görev oluşturma
//     const task = new Task({
//       title,
//       description,
//       priority,
//       dueDate,
//       assignedEmployees,
//     })

//     // Görevi kaydet
//     await task.save()
//     res.status(201).json({ message: 'Görev başarıyla oluşturuldu!', task })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Bir hata oluştu', error: error.message })
//   }
// }
exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body)
    await task.save()
    res.status(201).json({
      data: task,
      message: 'Task Create Success',
    })
  } catch (error) {
    res.status(400).json({ message: 'Create Unsuccess! ' })
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

exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.status(200).json({
      data: updatedTask,
      message: 'Task Update has been Success',
    })
  } catch (error) {
    res.status(400).json({ message: 'Edit Unsuccess!' })
  }
}

// Görev silme

exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id)
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task bulunamadı' })
    }
    res.status(200).json({ message: 'Task has been deleted.' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
