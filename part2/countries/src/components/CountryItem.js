import { useState } from 'react'
import CountryOverview from './CountryOverview'

const CountryItem = ({ country }) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div>
      {country.name}{' '}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'show'}
      </button>
      {showDetails && <CountryOverview country={country} />}
    </div>
  )
}

export default CountryItem
