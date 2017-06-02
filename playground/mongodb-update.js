//const  MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

let obj = new ObjectID();
console.log(obj);

let user = {name: 'andrew', age: 25};
let {name} = user;
console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log(`there was an err ${err}`);
  }
  console.log('Connected to MongDB server');

  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID("5931919fe001a8193c324e22")
  }, {
      $set: {
        completed: true
      }
  }, {
      returnOriginal: false
  }).then(result => {
      console.log(result);
  });

  db.close();
});
