import { useState } from 'react'

const Togglable = props => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div className={visible ? 'hidden' : ''}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div className={!visible ? 'hidden' : ''}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable
