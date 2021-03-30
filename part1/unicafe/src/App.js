import React, { useState } from 'react'

const Header = () => <h1>give feedback</h1>

const Buttons = ({ setGood, setNeutral, setBad }) => {
  return (
    <>
      <button onClick={() => setGood(good => good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral => neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad => bad + 1)}>bad</button>
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  return (
    <>
      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header />
      <Buttons {...{ setGood, setNeutral, setBad }} />
      <Statistics {...{ good, neutral, bad }} />
    </div>
  )
}

export default App
