const express = require('express')
const User = require('../models/user')
const router = new express.Router

router.get('/test', (req, res) => {
  res.send("From a new file")
})


router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).send(user)
  } catch(error) {
    res.status(400).send(error)
  }
  // user.save().then(() => {
  //   console.log(user)
  //   res.send(user)
  // }).catch((error) => {
  //   res.status(400).send(error)
  // })

})

router.get('/users', async (req, res) => {
  
  try {
    const users = await User.find({})
    res.send(users)
  } catch(error) {
    res.status(500).send(error)
  }
  
  // User.find({}).then((users) => {
  //   res.send(users)
  // }).catch((error) => {
  //   res.send(error)
  // })
})

router.get('/users/:id', async (req, res) => {
  // console.log(req.params)
  const _id = req.params.id

  try {
    const user = await User.findById(_id)
    
    if (!user) {
      return res.staus(404).send()
    }
    res.send(user)

  }catch(error) {
    res.status(500).send(error)
  }


  // User.findById(_id).then((user) => {
  //   if (!user) {
  //     return res.status(404).send()
  //   }
  //   res.send(user)

  // }).catch((error) => {
  //   res.status(500).send(error)
  // })
})

router.patch('/users/:id', async(req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

    if (!user) {
      return res.status(404).send()
    }
    res.send(user)

  }catch(error) {
    res.send(error)
  }
})

router.delete('/users/:id', async(req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user){
      res.status(404).send()
    }
    res.send(user)

  }catch(error) {
    res.send(error)
  }
})




module.exports = router