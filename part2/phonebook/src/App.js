import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
  ])
  const [newName, setNewName] = useState('')
  const [phoneNum, setPhoneNum] = useState('')

  const addPerson = e => {
    e.preventDefault()
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    setPersons([...persons, { name: newName, number: phoneNum }])
    setNewName('')
    setPhoneNum('')
  }

  const handleNameChange = e => setNewName(e.target.value)
  const handleNumberChange = e => setPhoneNum(e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={phoneNum} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(p => (
        <div key={p.name}>
          {p.name} {p.number}
        </div>
      ))}
    </div>
  )
}

export default App
