const Person = ({ person: { name, number } }) => {
  return (
    <div>
      {name} {number}
    </div>
  )
}

export default Person
