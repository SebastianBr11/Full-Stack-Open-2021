import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setPhoneNum] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const addPerson = e => {
    e.preventDefault()
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    if (persons.some(p => p.number === newNumber)) {
      alert(`${newNumber} is already added to the phonebook`)
      return
    }
    setPersons([...persons, { name: newName, number: newNumber }])
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

      <Filter {...{ handleSearchChange, searchQuery }} />

      <h3>Add a new</h3>

      <PersonForm
        {...{
          addPerson,
          handleNameChange,
          handleNumberChange,
          newName,
          phoneNum: newNumber,
        }}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
