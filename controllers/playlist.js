const asyncHandler = require('../middleware/async')
// const ErrorResponse = require('../utils/errorResponse')
const playlist = require('../models/playlist')

// @desc    Get playlist
// @route   GET /api/v1/playlist
// @access  Public Or Private
exports.getCategories = asyncHandler(async (req, res, next) => {
  console.log(res.advancedResults)
  res.status(200).json(res.advancedResults)
})

// @desc    Create playlist
// @route   POST /api/v1/playlist
// @access  Private
exports.createPlaylist = asyncHandler(async (req, res, next) => {
    
    let playListModel = await playlist.create({ name: req.body.name , userId: req.user._id , videos: req.body.videos})
  
    res.status(200).json({ sucess: true, data: playListModel })
  })
  