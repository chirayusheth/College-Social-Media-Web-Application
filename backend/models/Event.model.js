const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  Name: { type: String, required: true, trim:true },
  Organizer : { type: Schema.Types.ObjectId, ref:'ClubCom', required:false},
  Contact : { type: Number, required: true},
  Date: { type: String, required: true },
  Time: {type: String, required: true},
  Venue : { type: String, required: true},
  Duration: { type: Number, required: true },
  Description: { type: String, required: true },
  NoOfAttendees: {type: Number},
  Approved: {type: Boolean, default:false},
}, {
  timestamps: true,
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;