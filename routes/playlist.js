const express = require('express')
const {
  getPlayList, 
  createPlaylist,
  getUserPlaylist,
  getUserPlaylistDetail
} = require('../controllers/playlist')

const router = express.Router()

const playlist = require('../models/playlist')

const { protect } = require('../middleware/auth')
const advancedResults = require('../middleware/advancedResults')

router
  .route('/')
  .get(
    advancedResults(
      playlist,
      [
        { path: 'userId' },
        { path: 'videos' },
      ],
      {
        status: 'public'
      }
    ),    
    getPlayList
  )

router.get('/userPlaylist', protect, getUserPlaylist)  
router.get('/:id/getUserPlaylistDetail', getUserPlaylistDetail)  

router.post('/', protect, createPlaylist)



module.exports = router
