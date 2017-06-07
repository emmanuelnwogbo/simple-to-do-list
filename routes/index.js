const express = require('express');
const router = express.Router();
const {Todo} = require('../models/todo');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/todos', (req, res, next) => {
  let todo = new Todo({
    text: req.body.text
  });
  todo.save()
    .then( doc => {
      res.send(doc);
  }, e => {
      res.status(400).send(e);
  });
});

module.exports = router;
