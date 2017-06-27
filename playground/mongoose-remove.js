const {ObjectID} = require('mongodb');

const {mongoose} = require('../db/mongoose');
const {Todo} = require('../models/todo');
const {User} = require('../models/user');

Todo.remove({}).then( result => {
  console.log(result);
});

//Todo.findOneAndRemove
//Todo.findByIdAndRemove

Todo.findOneAndRemove({_id: '564777278919878289178288'}).then(todo => {
  console.log(todo);
});

Todo.findByIdAndRemove('5454646646646466664646884').then( todo => {
  console.log(todo);
});
