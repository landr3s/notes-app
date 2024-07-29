import { Router } from 'express'
import { Note } from '../models/Note.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../models/User.js'
import { userExtractor } from '../middlewares/userExtractor.js'

dotenv.config()

const notesRouter = Router()

notesRouter.get('/', async (req, res) => {
  try {
    const notes = await Note.find({}).populate('user', {
      username: 1,
    })
    res.send(notes)
  } catch (error) {
    console.error(error)
    throw error
  }
})
notesRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const note = await Note.findById(id)
    res.send(note)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

notesRouter.post('/', userExtractor, async (req, res, next) => {
  const { content, important } = req.body
  try {
    const { userId } = req

    const user = await User.findById(userId)

    if (!content) return res.status(400).send('Data missing')

    const newNote = new Note({
      content,
      important: important === undefined ? false : important,
      date: new Date(),
      user: user._id,
    })

    await newNote.save()
    user.notes = user.notes.concat(newNote._id)
    await user.save()

    res.status(201).send(newNote)
  } catch (error) {
    console.error(error)
    throw error
  }
})

notesRouter.put('/:id', userExtractor, async (req, res, next) => {
  const { id } = req.params
  const { content, important } = req.body
  try {
    const note = {
      content,
      important: important || false,
    }

    const updatedNote = await Note.findByIdAndUpdate(id, note, { new: true })
    res.send(updatedNote)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

notesRouter.delete('/:id', userExtractor, async (req, res, next) => {
  const { id } = req.params
  try {
    if (!id) return res.send('Missing or invalid note')

    await Note.findByIdAndDelete(id)
    res.status(204).end()
  } catch (error) {
    console.error(error)
    next(error)
  }
})

export default notesRouter
