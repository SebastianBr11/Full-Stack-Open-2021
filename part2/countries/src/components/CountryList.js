const CountryList = ({ countries }) => {
  return (
    <div>
      {countries.map(c => (
        <div key={c.numericCode}>{c.name}</div>
      ))}
    </div>
  )
}

export default CountryList
