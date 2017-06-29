const express = require('express');
const router = express.Router();
const {Todo} = require('../models/todo');
const {ObjectID} = require('mongodb');

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

router.post('/photos/todos', (req, res, next) => {
  //console.log(res.status);
});

router.get('/todos', (req, res) => {
  Todo.find().then(todos => {
    res.send({todos});
  }, e => {
      res.status(400).send(e);
  });
});

router.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then(todo => {
    if(!todo) {
      return res.status(404).send();
    }

    //res.send(todo);
    res.send({todo});
  }).catch(e => {
      res.status(400).send();
  });
});

router.delete('/todos/:id', (req, res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then( todo => {
    if(!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  })
  .catch( e => {
    res.status(400).send();
  });
});

module.exports = router;
