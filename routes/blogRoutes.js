const express = require('express')

const blogController = require('../controllers/blogController')

const router = express.Router()

router.get('/', blogController.getAllBlog)
router.post('/', blogController.createBlog)
router.get('/:id', blogController.getBlogById)
router.get('/:title', blogController.getBlogByTitle)
router.patch('/:id', blogController.updateBlog)
router.delete('/:id', blogController.deleteBlog)
module.exports = router
