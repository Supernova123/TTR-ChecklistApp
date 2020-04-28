//Model for Account Pages

//Requirements
const crypto = require('crypto');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//Creates new Account Model
let AboutModel = {};
const iterations = 10000;
const saltLength = 64;
const keyLength = 64;


//Creates a Schema for MonogoDB
const AboutSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[A-Za-z0-9_\-.]{1,16}$/,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

//Sends the username and unique id of the user
AboutSchema.statics.toAPI = (doc) => ({
  email: doc.email,
  _id: doc._id,
});

//Searches for an account's username
AboutSchema.statics.findByUsername = (email, callback) => {
  const search = {
    username: email,
  };

  return AboutModel.findOne(search, callback);
};

//Finalizes the Account model
AboutModel = mongoose.model('About', AboutSchema);

//Exports functions to Model Index
module.exports.AboutModel = AboutModel;
module.exports.AboutSchema = AboutSchema;
