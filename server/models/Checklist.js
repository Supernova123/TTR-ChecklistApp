//Model for Checklist Page
const mongoose = require('mongoose');

//Requirements
mongoose.Promise = global.Promise;
const _ = require('underscore');

//Creates new Toon Model
let ChecklistModel = {};

//Trims data strings
const convertId = mongoose.Types.ObjectId;


//Creates a new toon object
const ChecklistSchema = new mongoose.Schema({
  laff: {
    type: Number,
    min: 15,
    max: 137,
    required: true,
  },
    
  gagTracks: {
    type: Number,
    min: 2,
    max: 6,
    required: true,
  },

  gagPouch: {
    type: Number,
    min: 20,
    max: 80,
    required: true,
  },
    
  jellybeanBag: {
    type: Number,
    min: 40,
    max: 250,
    required: true,
  },
    
  taskCapapcity: {
      type: Number,
      min: 1,
      max: 4,
      required: true
  },

  tpAccess: {
      type: Number,
      min: 0,
      max: 12,
      required: true
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

ChecklistSchema.statics.toAPI = (doc) => ({
  laff: doc.laff,
  gagTracks: doc.gagTracks,
  gagPouch: doc.gagPouch,
  jellybeanBag: doc.jellybeanBag,
  taskCapapcity: doc.taskCapapcity,
  tpAccess: doc.tpAccess
});

//Authenticates if a toon exists with an account
ChecklistSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return ChecklistModel.find(search).select('laff gagTracks gagPouch jellybeanBag taskCapacity tpAccess').lean().exec(callback);
};

//Finalizes the Maker model
ChecklistModel = mongoose.model('Checklist', ChecklistSchema);

//Exports functions to Model Index
module.exports.ChecklistModel = ChecklistModel;
module.exports.ChecklistSchema = ChecklistSchema;