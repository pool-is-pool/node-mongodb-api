require ('../src/db/mongoose')
const User = require('../src/models/user')

// 61e51d0ec25e7be41cc07980

// User.findByIdAndUpdate( '61e51d0ec25e7be41cc07980', { age: 1}).then((user) => {
//   console.log(user)
//   return User.countDocuments({ age: 1 })
// }).then((result) => {
//   console.log(result)
// }).catch((error) => {
//   console.log(error)
// })

const updateAgeAndCount = async (id ,age) => {
  const user = await User.findByIdAndUpdate(id , { age })
  const count = await User.countDocuments({ age })
  return count
}

updateAgeAndCount('61e56cdfe3993f4f0d37b1f9', 1).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)
})