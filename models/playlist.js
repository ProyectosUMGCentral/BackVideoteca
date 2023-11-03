const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PlayListSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    videos: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Video',
        required: [true, 'Video id is required']
      }
    ],
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('playlist', PlayListSchema)
