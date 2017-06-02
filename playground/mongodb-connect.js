//const  MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

//let obj = new ObjectID();
//console.log(obj);

let user = {name: 'andrew', age: 25};
let {name} = user;
console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log(`there was an err ${err}`);
  }
  console.log('Connected to MongDB server');


  db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false
  }, (err, result) => {
      if(err) {
        return console.log('Unable to insert todo', err);
      }

      console.log(JSON.stringify(result.ops, undefined, 2));
      console.log(result.ops[0]._id.getTimestamp());
  });

  db.close();
});
