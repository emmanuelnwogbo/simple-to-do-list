const {ObjectID} = require('mongodb');

const {mongoose} = require('../db/mongoose');
const {Todo} = require('../models/todo');
const {User} = require('../models/user');

let id = '593a6b32248394290495e678';

if(!ObjectID.isValid(id)) {
    console.log('ID not valid');
}

Todo.find({
  _id: id
}).then(todos => {
    console.log('Todos', todos);
});

Todo.findOne({
  _id: id
}).then(todo => {
    console.log('Todo', todo);
});

Todo.findById(id).then(todo => {
  if (!todo) {
      return console.log('Id not found');
  }
  console.log('Todo By Id', todo);
}).catch(e => console.log(e));

User.findById('593a6b32248394290495e678').then( user => {
  if(!user) {
      return console.log('Unable to find user');
  }
  console.log(JSON.stringify(user, undefined, 2));
}, e => {
    console.log(e);
});
