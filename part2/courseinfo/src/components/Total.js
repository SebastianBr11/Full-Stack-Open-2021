const Total = ({ parts }) => {
  const exercises = parts.map(({ exercises }) => exercises)

  return (
    <strong>
      total of {exercises.reduce((acc, val) => acc + val)} exercises
    </strong>
  )
}

export default Total
