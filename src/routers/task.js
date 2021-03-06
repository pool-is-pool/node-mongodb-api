const express = require('express')
const router = new express.Router
const auth = require('../middleware/auth')
const Task = require('../models/task')


router.post('/tasks', auth, async (req, res) => {
  // const task = new Task(req.body)
  const task = new Task({
    ...req.body,
    owner: req.user._id
  })

  try {
    await task.save()
    res.status(201).send(task)

  }catch(error) {
    res.status(50).send(error)
  }
  

  // task.save().then(() => {
  //   res.send(task)
  // }).catch((error) => {
  //   res.status(400).send(error)
  // })
})

router.get('/tasks', auth, async (req, res) => {
  
  try {
    const tasks = await Task.find({ owner: req.user._id  })
    res.send(tasks)
  }catch(error){
    res.send(error)
  }
  
  
  // Task.find({}).then((ss) => {
  //   res.send(ss)
  // }).catch((error) => {
  //   res.send(error)
  // }) 
})

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id

  try{
    const task = await Task.findOne({ _id: _id, owner: req.user._id})

    if (!task) {
      return res.staus(404).send('no task found')
    }
    // console.log(task)
    res.send(task)

  }catch(error) {
    res.send(error)
  }

  // Task.findById(_id).then((task) => {
  //   res.send(task)
  // }).catch((error) => {
  //   res.send(error)
  // })
})

router.patch('/tasks/:id', auth, async (req, res) => {  
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true} )
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
      return res.send(400).send({ error: 'Invalid updates' })
    }

  try { 
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

    if (!task){
      return res.status(404).send()
    }
    
    
    updates.forEach((update) => task[update] = req.body[update] )
    await task.save()  
    res.send(task)

  }catch(error) {
    res.send(error)

  }
})

router.delete('/tasks/:id', auth, async(req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
    console.log(task)

    if (!task){
      return res.status(404).send('404 not found')
    }
    res.send(task)

  }catch (error) {
    res.send(error)
  }
})

module.exports = router