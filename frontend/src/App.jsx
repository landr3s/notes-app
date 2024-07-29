import { useEffect, useState } from 'react'
import { Notes } from './components/Notes'
import noteService from './services/notes'
import loginService from './services/login'
import { Notification } from './components/Notification'
import { LoginForm } from './components/LoginForm'
import { NoteForm } from './components/NoteForm'

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showImportant, setShowImportant] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await noteService.getAll()
      setNotes(data)
    }

    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const importantNotes = showImportant
    ? notes.filter((note) => {
        return note.important
      })
    : notes

  const toggleShowImportant = () => {
    setShowImportant(!showImportant)
  }

  const addNote = async (noteObject) => {
    try {
      const noteSaved = await noteService.create(noteObject)
      setNotes(notes.concat(noteSaved))
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogin = async (event) => {
    try {
      event.preventDefault()
      const user = await loginService.login({ username, password })
      const { token } = user
      noteService.setToken(token)
      setUser(user)
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      console.log(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error(error)
      setError('Wrong credentials')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    noteService.setToken(user.token)
    window.localStorage.removeItem('loggedNoteAppUSer')
  }

  const toggleImportanceOf = async (id) => {
    try {
      const note = notes.find((n) => n.id === id)
      const changedNote = { ...note, important: !note.important }

      const updatedNote = await noteService.update(id, changedNote)
      setNotes(notes.map((note) => (note.id !== id ? note : updatedNote)))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Notification message={error} />

      {user ? (
        <NoteForm addNote={addNote} handleLogout={handleLogout} />
      ) : (
        <LoginForm
          username={username}
          password={password}
          handleChangeUsername={({ target }) => setUsername(target.value)}
          handleChangePassword={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      )}

      <section>
        <h1>Notes app</h1>
        <label />
        Show important
        <input
          type="checkbox"
          checked={showImportant}
          onClick={toggleShowImportant}
        />
        <Notes notes={importantNotes} toggleImportance={toggleImportanceOf} />
      </section>
    </>
  )
}

export default App
