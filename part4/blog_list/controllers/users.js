const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')


usersRouter.post('/', async (req, res) => {
  const body = req.body

  if (body.password.length < 3) {
    return res.status(400).json({ error: 'password length is min 3' })
  }

  const saltRound = 10

  const passwordHash = await bcrypt.hash(body.password, saltRound)

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await newUser.save()

  res.json(savedUser.toJSON())

})


usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs')

  res.json(users.map(u => u.toJSON()))
})


module.exports = usersRouter
