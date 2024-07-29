import { Schema, model } from 'mongoose'

const noteSchema = new Schema({
  content: String,
  important: Boolean,
  date: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export const Note = model('Note', noteSchema)
