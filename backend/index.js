import express from 'express'
import cors from 'cors'
import { PORT } from './config.js'
import notesRouter from './controllers/notes.js'
import mongoose from 'mongoose'
import usersRouter from './controllers/users.js'
import { notFound } from './middlewares/notFound.js'
import dotenv from 'dotenv'
import loginRouter from './controllers/login.js'

dotenv.config()

export const app = express()

app.use(express.json())
app.use(cors())

const { DATABASE_URL, DATABASE_URL_TEST, NODE_ENV } = process.env

const connectionString =
  NODE_ENV === 'development' ? DATABASE_URL : DATABASE_URL_TEST

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => {
    console.error(error)
  })

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(notFound)

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
