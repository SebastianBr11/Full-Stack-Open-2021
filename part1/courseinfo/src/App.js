import React from 'react'

const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  )
}

const Content = ({ part1, part2, part3 }) => {
  return (
    <>
      <Part part={part1.name} exercises={part1.exercises} />
      <Part part={part2.name} exercises={part2.exercises} />
      <Part part={part3.name} exercises={part3.exercises} />
    </>
  )
}

const Total = ({ exercises }) => {
  console.log(exercises)
  return <p>Number of exercises {exercises.reduce((a, b) => a + b)}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  }

  return (
    <div>
      <Header course={course} />
      <Content {...{ part1, part2, part3 }} />
      <Total
        exercises={[part1, part2, part3].map(({ exercises }) => exercises)}
      />
    </div>
  )
}

export default App
