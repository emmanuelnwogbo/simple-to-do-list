const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {Todo} = require('../models/todo');
const {User} = require('../models/user');
const {ObjectID} = require('mongodb');

const {authenticate} = require('../middleware/authenticate');

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

router.patch('/todos/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  }
  else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then( todo => {
      if(!todo) {
        return res.status(404).send();
      }
      res.send({todo});
    })
    .catch( e => {
      res.status(400).send();
    });
});

router.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  let user = new User(body);


  user.save().then( () => {
    return user.generateAuthToken();
  }).then( token => {
    res.header('x-auth', token).send(user);
  }).catch( e => {
    res.status(400).send(e);
  });
});

router.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

router.post('/users/login', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);

  //res.send(body);
  User.findByCredentials(body.email, body.password).then(user => {
    //res.send(user);
    return user.generateAuthToken().then( token => {
      res.header('x-auth', token).send(user);
    });
  }).catch(e => {
    res.status(400).send();
  });
});

router.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

module.exports = router;
