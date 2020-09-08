const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  Name: { type: String, required: true, trim:true },
  Date_time: { type: Date, required: true },
  RegDateStart: { type: Date, required: true },
  RegDateEnd: { type: Date, required: true },
  OfferType : { type: String, required: true},
  Category: { type: String, required: true },
  OpenFor : { type: String, required: true},
  Locations: { type: Array, required: true },  
  CProfiles: [{type: Schema.Types.ObjectId, ref:'CProfile'}],
}, {
  timestamps: true,
});

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;