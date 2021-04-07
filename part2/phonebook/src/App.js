import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setPhoneNum] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [successMsg, setSuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    personService.getAll().then(persons => setPersons(persons))
  }, [])

  const addPerson = e => {
    e.preventDefault()
    const newPerson = { name: newName, number: newNumber }

    let idOfExistingP = 0
    const personExists = persons.some(p => {
      idOfExistingP = p.id
      return p.name === newName
    })

    if (personExists) {
      const msg = `${newName} is already added to phonebook, replace the old number with a new one?`
      if (window.confirm(msg)) {
        personService
          .update(idOfExistingP, newPerson)
          .then(newP => {
            setPersons(persons.map(p => (p.id !== idOfExistingP ? p : newP)))
            setSuccessMsg(`Changed ${newP.name}'s number to ${newP.number}`)
            setTimeout(() => setSuccessMsg(null), 5000)
          })
          .catch(err => {
            console.log(err.response)
            setErrorMsg(err.response.data.error)
            setTimeout(() => setErrorMsg(null), 5000)
          })
      }
      return
    }

    personService
      .create(newPerson)
      .then(person => {
        setPersons(persons.concat(person))
        setNewName('')
        setPhoneNum('')
        setSuccessMsg(`Added ${person.name}`)
        setTimeout(() => setSuccessMsg(null), 5000)
      })
      .catch(err => {
        setErrorMsg(err.response.data.error)
        setTimeout(() => setSuccessMsg(null), 5000)
      })
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .del(id)
        .then(_ => setPersons(persons.filter(p => p.id !== id)))
        .catch(err => {
          console.log(err)
          setErrorMsg(
            `Information of ${person.name} has already been removed from server`,
          )
          setTimeout(() => setErrorMsg(null), 5000)
        })
    }
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
      {successMsg && <Notification message={successMsg} type='success' />}
      {errorMsg && <Notification message={errorMsg} type='error' />}

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

      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
