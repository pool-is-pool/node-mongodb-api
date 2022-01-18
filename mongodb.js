
const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
const { MongoClient, ObjectID } = mongodb

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL,{ useUnifiedTopology: true }, (error, client) => { 
  if (error){
    return console.log("unable to connect to database")
  }

  console.log('Connected correctly')
  const db = client.db(databaseName)

  // db.collection('users').insertOne({
  //   name: "Any",
  //   age: 27
  // }, (error, result) => {
  //     if (error) {
  //       return console.log("unable to insert one user")
  //     }
  //     console.log(result.ops)
  // })
  // db.collection('tasks').insertMany([
  //   {
  //     description: 'do this',
  //     completed: 1
  //   },{
  //     description: 'do that',
  //     completed: 0
  //   },{
  //     description: 'do this and dat',
  //     completed: 1
  //   }
  // ],(error, result) => {
  //   if (error){
  //     return console.log("unable to insert documents")
  //   }
  //   console.log(result.ops)
  // })
  
  // db.collection('tasks').find({ completed: 0 }).toArray((error, result) => {
  //   if (error){
  //     return console.log("unable to fetch results")
  //   }
  //   console.log(result)
  // })

  // const updtePromise = db.collection('users').updateOne({
  //   _id: new ObjectID("61e3bef08341004bc84e8035")
  // },{
  //   $set: {
  //     name: 'Mike'
  //   }
  // }).then((result) => {
  //   console.log(result)
  // }).catch((error)=> {
  //   console.log(error)
  // })

  // db.collection('tasks').updateMany({
  //   completed: 0
  // },{
  //   $set : {
  //     completed: 1
  //   }
  // }).then((result) => {
  //   console.log(result)
  // }).catch((error) => {
  //   console.log(error)
  // })

  // db.collection('users').deleteMany({
  //   name: "Andrew"
  // }).then((result) => {
  //   console.log(result)
  // }).catch((error) => {
  //   console.log(result)
  // })



})
