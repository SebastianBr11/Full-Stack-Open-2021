import React, { useState } from 'react'

const Header = () => <h1>give feedback</h1>

const Buttons = ({ setGood, setNeutral, setBad }) => {
  return (
    <>
      <Button handleClick={() => setGood(good => good + 1)} text={'good'} />
      <Button
        handleClick={() => setNeutral(neutral => neutral + 1)}
        text={'neutral'}
      />
      <Button handleClick={() => setBad(bad => bad + 1)} text={'bad'} />
    </>
  )
}

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad

  if (sum === 0) return <p>No feedback given</p>

  return (
    <p>
      <h1>Statistics</h1>
      <Statistic text='good' value={good} />
      <Statistic text='neutral' value={neutral} />
      <Statistic text='bad' value={bad} />
      <Statistic text='all' value={sum} />
      <Statistic text='average' value={(good - bad) / sum} />
      <Statistic text='positive' value={(good / sum) * 100 + ' %'} />
    </p>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
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
