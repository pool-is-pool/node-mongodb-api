const mongoose = require('mongoose')
const validator = require('validator')


const User = mongoose.model('user', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
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
  }
})

module.exports = User