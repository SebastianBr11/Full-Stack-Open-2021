import Person from './Person'

const Persons = ({ persons, deletePerson }) => {
  return (
    <>
      {persons.map(p => (
        <Person
          key={p.name}
          person={p}
          deletePerson={() => deletePerson(p.id)}
        />
      ))}
    </>
  )
}

export default Persons
