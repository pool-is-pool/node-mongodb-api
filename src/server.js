const express = require('express')
require('./db/mongoose')
// const User = require('./models/user')
// const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('server is up on port' + port)
})


// const pet = {
//   name: "hal"
// }

// pet.toJSON = function () {
//   console.log(this)
//   return this
// }

// console.log(JSON.stringify(pet))

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('61e99c839f3d6d20480f70ab')
//     // await task.populate('owner')
//     // console.log(task.owner)

//     const user = await User.findById('61e99c669f3d6d20480f70a5')
//     await user.populate('userTasks')
//     console.log(user.userTasks)
// }

// main()
