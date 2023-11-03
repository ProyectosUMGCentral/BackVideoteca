const express = require('express')
const {
  getCategories, 
  createPlaylist
} = require('../controllers/playlist')

const router = express.Router()
const { protect } = require('../middleware/auth')

router.post('/', protect, createPlaylist)

router
  .route('/public')
  .get(
    getCategories
  )

module.exports = router
