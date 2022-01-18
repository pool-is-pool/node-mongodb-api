const express = require('express')
const router = new express.Router
const Task = require('../models/task')


router.post('/tasks', async (req, res) => {
  const task = new Task(req.body)

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

router.get('/tasks', async (req, res) => {
  
  try {
    const tasks = await Task.find({})
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

router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id

  try{
    const task = await Task.findById(_id)

    if (!task) {
      res.staus(404).send()
    }
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

router.patch('/tasks/:id', async (req, res) => {
  try{
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true} )

    if (!task){
      res.status(404).send()
    }
    res.send(task)

  }catch(error) {
    res.send(error)

  }
})

router.delete('/tasks/:id', async(req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)

    if (!task){
      res.status(404).send()
    }
    res.send(task)

  }catch (error) {
    res.send(error)
  }
})

module.exports = router