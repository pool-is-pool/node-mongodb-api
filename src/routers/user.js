const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router
const multer = require('multer')

// router.get('/test', (req, res) => {
//   res.send("From a new file")
// })

 
router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user: user, token: token })
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

router.post('/users/login', async(req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()

    // console.log(user.m)
    res.send({user: user, token: token})

  }catch(err) {
    res.send(err)
  }
})

// router.post('/users/signup', async (req, res) => {
//   try {
//     const user = await User.findByCredentials(req.body.email, req.body.password)
//     const token = await user.generateAuthToken()

//     res.send({user: user, token: token})

//   } catch(err) {
//     res.send(err)
//   }
// })

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((currentToken) => {
      return currentToken.token !== req.token
    })
    await req.user.save()

    res.send()

  } catch(err) {
    res.send(err)
  }
})

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []

    await req.user.save()
    res.status(200).send()

  } catch (err) {
    res.status(500).send(err)
  }
})




router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
  // try {
  //   const users = await User.find({})
  //   res.send(users)
  // } catch(error) {
  //   res.status(500).send(error)
  // }
  
  // User.find({}).then((users) => {
  //   res.send(users)
  // }).catch((error) => {
  //   res.send(error)
  // })
})

// router.get('/users/:id', async (req, res) => {
//   // console.log(req.params)
//   const _id = req.params.id

//   try {
//     const user = await User.findById(_id)
    
//     if (!user) {
//       return res.staus(404).send()
//     }
//     res.send(user)

//   }catch(error) {
//     res.status(500).send(error)
//   }


  // User.findById(_id).then((user) => {
  //   if (!user) {
  //     return res.status(404).send()
  //   }
  //   res.send(user)

  // }).catch((error) => {
  //   res.status(500).send(error)
  // })
// })

router.patch('/users/me', auth, async(req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update) )  
  
  if (!isValidOperation) {
    return res.send({error: 'Invalid updates!'})
  }

  try {    
    
    // const user = await User.findById(req.user._id)

    updates.forEach((update) => { req.user[update] = req.body[update]} )

    await req.user.save()
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

    res.send(req.user)

  }catch(error) {
    res.send(error)
  }
})

router.delete('/users/me', auth, async(req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id)

    // if (!user){
    //   res.status(404).send()
    // }
    
    await req.user.remove()
    // console.log(req.user)
    res.send(req.user)

  }catch(error) {
    res.send(error)
  }
})

const upload = multer({

  limits: {
    fileSize: 1000000
  }, 
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
      return cb(new Error('Please upload an image'))
    }

    cb(undefined, true)
  }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async(req, res) => {
  req.user.avatar = req.file.buffer
  await req.user.save()
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async(req, res) => {
  try{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
  } catch(err) {
    res.send(err)
  }
  
})

router.get('/users/:id/avatar', async(req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user || !user.avatar) {
      throw new Error()
    }
    res.set('Content-Type', 'image/jpg')
    res.send(user.avatar)

  } catch (err) {

  }
})



module.exports = router