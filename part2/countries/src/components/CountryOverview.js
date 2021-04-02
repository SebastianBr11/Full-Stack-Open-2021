const CountryOverview = ({ country: c }) => {
  return (
    <div>
      {
        <div key={c.numericCode}>
          <h1>{c.name}</h1>
          <div>capital {c.capital}</div>
          population {c.population}
          <h2>languages</h2>
          <ul>
            {c.languages.map(lang => (
              <li key={lang.name}>{lang.name}</li>
            ))}
          </ul>
          <img style={{ maxHeight: '100px' }} src={c.flag} alt={c.name} />
        </div>
      }
    </div>
  )
}

export default CountryOverview
