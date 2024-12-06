const Blog = require('../models/Blog')

// İş yeri oluşturma
exports.createBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body)
    await blog.save()
    res.status(201).json({
      data: blog,
      message: 'Blog Create Success',
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Tüm iş yerlerini listeleme
exports.getAllBlog = async (req, res) => {
  try {
    const blog = await Blog.find()
    res.status(200).json(blog)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Belirli bir iş yerini getirme
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' })
    }
    res.status(200).json(blog)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// İş yeri güncelleme
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' })
    }
    res.status(200).json({ message: 'Updated Blog Successfully' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// İş yeri silme
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id)
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' })
    }
    res.status(200).json({ message: 'Delete Blog Successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
