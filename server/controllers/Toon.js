//Controller for Account Page

//Imports functions from Model
const models = require('../models');

const { Toon } = models;

//Creates default Maker page
const toonPage = (req, res) => {
  Toon.ToonModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), toons: docs });
  });
};

//Gets toons from the user's account
const getToons = (request, response) => {
  const req = request;
  const res = response;

  return Toon.ToonModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ toons: docs });
  });
};


//Makes a new toon as requested by the user
const makeToon = (req, res) => {
  if (!req.body.name || !req.body.species || !req.body.color) {
    console.log('Toon.js makeToon -> All fields are required called');
    return res.status(400).json({ error: 'ToonTip: All fields are required!' });
  }

  //Creates new toon object
  const toonData = {
    name: req.body.name,
    species: req.body.species,
    color: req.body.color,
    house: req.body.house,
    laff: req.body.laff,
    gagTracks: req.body.gagTracks,
    gagPouch: req.body.gagPouch,
    jellybeanBag: req.body.jellybeanBag,
    taskCapapcity: req.body.taskCapapcity,
    tpAccess: req.body.tpAccess,
    owner: req.session.account._id,
  };

  const newToon = new Toon.ToonModel(toonData);

  const toonPromise = newToon.save();

  toonPromise.then(() => res.json({ redirect: '/toons' }));

  toonPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      console.log('Toon.js toonData -> Toon already exists called');
      return res.status(400).json({ error: 'ToonTip: That toon already exists' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return toonPromise;
};

const postChecklist = (req,res,color) => {
    
}

//Exports functions to Controller index
module.exports.toonPage = toonPage;
module.exports.getToons = getToons;
module.exports.makeToon = makeToon;
