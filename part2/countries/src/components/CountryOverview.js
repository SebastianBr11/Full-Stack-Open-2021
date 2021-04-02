import axios from 'axios'
import { useEffect, useState } from 'react'

const CountryOverview = ({ country: c }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${c.capital}`,
      )
      .then(res => setWeather(res.data))
  }, [])

  return (
    <div>
      <div key={c.numericCode}>
        <h1>{c.name}</h1>
        <div>capital {c.capital}</div>
        population {c.population}
        <h2>Spoken languages</h2>
        <ul>
          {c.languages.map(lang => (
            <li key={lang.name}>{lang.name}</li>
          ))}
        </ul>
        <img style={{ maxHeight: '100px' }} src={c.flag} alt={c.name} />
        {weather?.current && (
          <>
            <h2>Weather in {c.capital}</h2>
            <div>
              <strong>temperature:</strong> {weather.current.temperature}{' '}
              Celcius
            </div>
            <img
              src={weather.current.weather_icons[0]}
              alt={weather.current.weather_descriptions[0]}
            />
            <div>
              <strong>wind: </strong> {weather.current.wind_speed} km/h
              direction {weather.current.wind_dir}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CountryOverview
