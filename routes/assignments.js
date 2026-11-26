const express = require('express');
const router = express.Router(); // mini app just for /assignments stuff
const Assignment = require('../models/assignment'); // pull in the model

//gets assignment, assending order due date
router.get('/', async (req, res) => {
  const assignments = await Assignment.find().sort({ dueDate: 1 });
  res.render('assignments/list', { assignments });
});

// show empty form. {} so the form doesnt crash looking for values
router.get('/add', (req, res) => {
  res.render('assignments/form', { assignment: {}, action: '/assignments/add' });
});
// form submits and gets saved and goes back to list
router.post('/add', async (req, res) => {
  await Assignment.create(req.body); // req.body = whatever got typed in the form
  res.redirect('/assignments');
});

// update: find by the id in the url
router.get('/edit/:id', async (req, res) => {
  const assignment = await Assignment.findById(req.params.id); // :id = the mongo _id
  res.render('assignments/form', { assignment, action: '/assignments/edit/' + assignment._id });
});

// saves changes
router.post('/edit/:id', async (req, res) => {
  await Assignment.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/assignments');
});

// delete: confirm page so nobody deletes by accident
router.get('/delete/:id', async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  res.render('assignments/delete', { assignment });
});

// deletes it
router.post('/delete/:id', async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.redirect('/assignments');
});

module.exports = router;