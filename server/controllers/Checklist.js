//Controller for Checklist Page

//Imports functions from Model
const models = require('../models');

const { Checklist } = models;

//Creates default ChceklistMaker page
const checklistPage = (req, res) => {
  Checklist.ChecklistModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), toons: docs });
  });
};

//Gets toons from the user's account
const checklist = (request, response) => {
  const req = request;
  const res = response;

  return Checklist.ChecklistModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ toons: docs });
  });

  //Creates new toon object
  const checklistData = {
    laff: req.body.laff,
    gagTracks: req.body.gagTracks,
    gagPouch: req.body.gagPouch,
    jellybeanBag: req.body.jellybeanBag,
    taskCapapcity: req.body.taskCapapcity,
    tpAccess: req.body.tpAccess
  };

  const newChecklist = new Checklist.ChecklistModel(checklistData);

  const checklistPromise = newChecklist.save();

  checklistPromise.then(() => res.json({ redirect: '/checklist' }));

  checklistPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      console.log('Checklist.js checklistData -> Checklist already exists called');
      return res.status(400).json({ error: 'ToonTip: That checklist already exists' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return toonPromise;
    
};

//Exports functions to Controller index
module.exports.checklistPage = checklistPage;
module.exports.checklist = checklist;
