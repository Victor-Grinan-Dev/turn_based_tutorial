import React from 'react'
import HealthBar from '../healthBar/HealthBar';
import ProgressBar from '../progressBar/ProgressBar';

const red = '#821200';
const blue = '#1953cb'

const PlayerSummary = ({ main = false, name, level, health, maxHealth, color }) => {
  return (
    <div style={{backgroundColor: color}} >
        <div className="info">
            <div className="name">{name}</div>
            <div className="level">Lvl: {level}</div>
        </div>

        <div className="health">
            <ProgressBar color={color} value={health} maxValue={maxHealth}/>
        </div>
    </div>
  )
}

export default PlayerSummary