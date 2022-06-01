const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value){
      if (value.length < 6 ){
        throw new Error('please provide password greater than 6 digits')
      }
      if (value.toLowerCase().includes('password')){
        throw new Error('please ensure password does not contain password')
      }
    }
  },
  age: {
    type: Number,
    default: 0
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  avatar: {
    type: Buffer
  }
})

userSchema.virtual('userTasks', {
  ref: 'task',
  localField: '_id',
  foreignField: 'owner'
})



userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()
  
  delete user.password
  delete user.tokens
  
  return userObject
}


userSchema.methods.generateAuthToken = async function() {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'aaaaaaa')

  user.tokens = user.tokens.concat({token: token})
  await user.save()

  return token
}


userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Unable to login')
  }

  return user
}

// hash password before user is saved
userSchema.pre('save', async function(next) {
  const user = this 
  if (user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8)
  }
  
  console.log('just before saving')
  next()
})

// Delete user tasks when user is deleted
userSchema.pre('remove', async function(next) {
  const user = this
  await Task.deleteMany({ owner: user._id })
  next()

})


const User = mongoose.model('user', userSchema)

module.exports = User