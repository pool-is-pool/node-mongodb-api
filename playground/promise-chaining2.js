require ('../src/db/mongoose')
const Task = require('../src/models/task')

// // 61e45a7ff3db82902ec7cc14
// Task.findByIdAndDelete('61e45a7ff3db82902ec7cc14').then((result) => {
//   console.log(result)
//   return Task.countDocuments({ completed: 0})
// }).then((r) => {
//   console.log(r)
// }).catch((error) => {
//   console.log(error)
// })

const DeleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments()
  return count 
}
// 61e56e118019ade28ca8f85d

DeleteTaskAndCount('61e56e118019ade28ca8f85d').then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)
})