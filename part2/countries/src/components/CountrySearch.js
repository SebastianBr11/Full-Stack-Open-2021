const CountrySearch = ({ search, setSearch }) => {
  return (
    <div>
      find countries{' '}
      <input value={search} onChange={e => setSearch(e.target.value)} />
    </div>
  )
}

export default CountrySearch
