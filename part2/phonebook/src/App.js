import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ])

  const [newName, setNewName] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

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
  const handleSearchChange = e => setSearchQuery(e.target.value)

  const personsToShow = persons.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{' '}
        <input value={searchQuery} onChange={handleSearchChange} />
      </div>
      <h2>add a new</h2>
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
      {personsToShow.map(p => (
        <div key={p.name}>
          {p.name} {p.number}
        </div>
      ))}
    </div>
  )
}

export default App
