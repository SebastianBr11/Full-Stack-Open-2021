import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setPhoneNum] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    personService.getAll().then(persons => setPersons(persons))
  }, [])

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
    const newPerson = { name: newName, number: newNumber }

    personService.create(newPerson).then(person => {
      setPersons(persons.concat(person))
      setNewName('')
      setPhoneNum('')
    })
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
