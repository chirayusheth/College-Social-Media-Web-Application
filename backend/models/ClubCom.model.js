const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const ClubComSchema = new Schema(
  {
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    Email_ID: {
      type: String,
      required: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    Contact: { type: Number, required: true },
    Clg_ID: { type: Number, required: true },
    UserType: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

ClubComSchema.plugin(passportLocalMongoose);

const ClubCom = mongoose.model("ClubCom", ClubComSchema);

module.exports = ClubCom;
