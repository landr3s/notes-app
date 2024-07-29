import { Note } from './Note'

export const Notes = ({ notes, toggleImportance }) => {
  return Object.values(notes).map((note) => {
    return (
      <Note
        key={note.id}
        note={note}
        toggleImportance={() => toggleImportance(note.id)}
      />
    )
  })
}
