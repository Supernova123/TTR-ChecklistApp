//Model for Toon Page
const mongoose = require('mongoose');

//Requirements
mongoose.Promise = global.Promise;
const _ = require('underscore');

//Creates new Toon Model
let ToonModel = {};

//Trims data strings
const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();
const setSpecies = (species) => _.escape(species).trim();
const setColor = (color) => _.escape(color).trim();
const setHouse = (house) => _.escape(house).trim();


//Creates a new toon object
const ToonSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      trim: true,
      set: setName,
  },

  species: {
      type: String,
      required: true,
      trim: true,
      set: setSpecies,
  },
    
  color: {
      type: String,
      required: true,
      trim: true,
      set: setColor,
  },
    
  house: {
      type: String,
      required: true,
      trim: true,
      set: setHouse
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

ToonSchema.statics.toAPI = (doc) => ({
      name: doc.name,
      species: doc.species,
      color: doc.color,
      house: doc.house,
      laff: doc.laff,
      gagTracks: doc.gaTracks,
      gagPouch: doc.gagPouch,
      jellybeanBag: doc.jellybeanBag,
      taskCapapcity: doc.taskCapapcity,
      tpAccess: doc.tpAccess
});

//Authenticates if a toon exists with an account
ToonSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return ToonModel.find(search).select('name species color house laff gagTracks gagPouch jellybeanBag taskCapacity tpAccess').lean().exec(callback);
};

//Finalizes the Maker model
ToonModel = mongoose.model('Toon', ToonSchema);

//Exports functions to Model Index
module.exports.ToonModel = ToonModel;
module.exports.ToonSchema = ToonSchema;
