import axios from 'axios'
import { useEffect, useState } from 'react'
import CountryList from './components/CountryList'
import CountryOverview from './components/CountryOverview'
import CountrySearch from './components/CountrySearch'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => setCountries(res.data))
  }, [])

  const countriesToShow = countries.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div>
      <CountrySearch search={search} setSearch={setSearch} />
      {countriesToShow.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : countriesToShow.length !== 1 ? (
        <CountryList countries={countriesToShow} />
      ) : (
        <CountryOverview country={countriesToShow[0]} />
      )}
    </div>
  )
}

export default App
