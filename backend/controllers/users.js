import { Router } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/User.js'

const usersRouter = Router()

usersRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({}).populate('notes', {
      content: 1,
      date: 1,
    })
    res.send(users)
  } catch (error) {
    console.error(error)
  }
})

usersRouter.post('/', async (req, res) => {
  const { username, name, passwordHash } = req.body
  try {
    const passwordHashed = await bcrypt.hash(passwordHash, 10)
    const newUser = new User({
      username,
      name,
      passwordHash: passwordHashed,
    })

    await newUser.save()
    res.status(201).send(newUser)
  } catch (error) {
    console.error(error)
    throw error
  }
})

export default usersRouter
