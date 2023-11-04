const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const advancedResultsFunc = require('../utils/advancedResultsFunc')
const playlist = require('../models/playlist')
const Video = require('../models/Video')

// @desc    Get playlist
// @route   GET /api/v1/playlist
// @access  Public Or Private
exports.getPlayList = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Create playlist
// @route   POST /api/v1/playlist
// @access  Private
exports.createPlaylist = asyncHandler(async (req, res, next) => {
    
    const existPlayList = await playlist.find({ name: req.params.name })

    if (existPlayList.length > 0) {
      return next(new ErrorResponse(`Existe una nueva lista de reproducción con el nombre: ${req.params.name}`, 500))
    }

    let playListModel = await playlist.create({ name: req.body.name , userId: req.user._id , videos: req.body.videos})
  
    res.status(200).json({ sucess: true, data: playListModel })
  })

// @desc    Get playlist user
// @route   GET /api/v1/playlist/userPlaylist
// @access  Private 
exports.getUserPlaylist = asyncHandler(async (req, res, next) => {
  const userPlaylist = await playlist.find({ userId: req.user._id }).populate('userId')
  return res.status(200).json({ success: true, data: userPlaylist })
})

// @desc    Get playlist user
// @route   GET /api/v1/playlist/:id/getUserPlaylistDetail
// @access  Private 
exports.getUserPlaylistDetail = asyncHandler(async (req, res, next) => {
  const userPlaylistDetail = await playlist.findById(req.params.id)

  if (!userPlaylistDetail) {
    return next(new ErrorResponse(`No se encontró la lista de reproducción con el id: ${req.params.id}`, 404))
  }
  const videosId = userPlaylistDetail.videos.map((video) => {
    return {
      _id: video.toString()
    }
  })

  const populates = [{ path: 'userId', select: 'photoUrl channelName' }]
  advancedResultsFunc(req, res, Video, populates, 'public', videosId)
})
