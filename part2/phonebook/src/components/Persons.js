import Person from './Person'

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map(p => (
        <Person key={p.name} person={p} />
      ))}
    </>
  )
}

export default Persons
