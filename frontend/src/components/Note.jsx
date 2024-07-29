export const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'Make not important' : 'Make important'
  return (
    <li>
      <div>{note.content}</div>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}
