import React from 'react'

const GameOver = ({winner, onStartClick}) => {
  return (
    <div>
        <h1>{winner.name} has won!</h1>
        <button onClick={onStartClick}>Play Again?</button>
    </div>
  )
}

export default GameOver