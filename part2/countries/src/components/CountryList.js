import CountryItem from './CountryItem'

const CountryList = ({ countries }) => {
  return (
    <div>
      {countries.map(c => (
        <CountryItem key={c.name} country={c} />
      ))}
    </div>
  )
}

export default CountryList
