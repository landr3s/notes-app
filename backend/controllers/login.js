import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const loginRouter = Router()

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  const passwordCorrect = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false

  if (!user || !passwordCorrect) {
    return res.status(401).send('Invalid credentials')
  }

  const userForToken = {
    id: user._id,
    username: user.username,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60 * 24 * 7,
  })

  res.send({
    name: user.name,
    username: user.username,
    token,
  })
})

export default loginRouter
