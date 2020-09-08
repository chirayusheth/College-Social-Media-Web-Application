const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
  AddressedTo: { type: String, required: true },
  Description: { type: String, required: true },
  
}, {
  timestamps: true,
});

const Complaint = mongoose.model('Complaint', ComplaintSchema);

module.exports = Complaint;