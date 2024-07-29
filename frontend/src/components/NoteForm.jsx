import PropTypes from 'prop-types'
import { useState, useRef } from 'react'
import { Toggable } from './Toggable'

export const NoteForm = ({ addNote, handleLogout }) => {
  const [newNote, setNewNote] = useState('')
  const toggableRef = useRef()

  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      const noteObject = {
        content: newNote,
        important: Math.random() > 0.5,
      }
      await addNote(noteObject)
      setNewNote('')
      toggableRef.current.toggleVisibility()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <Toggable buttonLabel={'Create note'} ref={toggableRef}>
        <form onSubmit={handleSubmit}>
          <input
            onChange={({ target }) => setNewNote(target.value)}
            type="text"
            value={newNote}
          />
          <button>Submit</button>
        </form>
        <button onClick={handleLogout}>Log out</button>
      </Toggable>
    </>
  )
}

NoteForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleLogout: PropTypes.func.isRequired,
  newNote: PropTypes.string,
}
