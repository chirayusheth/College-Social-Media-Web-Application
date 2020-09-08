const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  Event: { type: Schema.Types.ObjectId, ref: 'Event'},
  Description: { type: String, required: true },
  User:{type: String, ref: 'User'},
  reported: {type: Boolean}
}, {
  timestamps: true,
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;