const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {

})

// console.log(mongoose.connection.readyState)
// mongoose.connection.on('connected', () => {
//   console.log('connected');
//   console.log(mongoose.connection.readyState); //logs 1
// });

// const user1 = new User({
//   name: "   gg  ",
//   email: 'gg@mead.io   ',
//   password: 'dlkee'
// }) 

// user1.save().then((result) => {
//   console.log(result)
// }).catch((error) => {
//   console.log("error", error)
// })


// const task1 = new Task({
//   description: " do housekeeping ss",
//   completed: true
// })

// task1.save().then((result) => {
//   console.log(result)
// }).catch((error) => {
//   console.log("error", error)
// })