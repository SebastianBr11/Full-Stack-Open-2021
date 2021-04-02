const Person = ({ person: { name, number }, deletePerson }) => {
  return (
    <div>
      {name} {number} <button onClick={deletePerson}>delete</button>
    </div>
  )
}

export default Person
