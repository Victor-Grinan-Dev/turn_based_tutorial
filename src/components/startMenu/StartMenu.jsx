import React from 'react'

const StartMenu = ({onStartClick}) => {
  return (
    <div>
        <div>
        Start Menu component
        </div>
        <button onClick={onStartClick}>Start</button>
    </div>
  )
}

export default StartMenu;