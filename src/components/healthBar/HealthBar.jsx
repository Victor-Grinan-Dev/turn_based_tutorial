import React from 'react';
import ProgressBar from '../progressBar/ProgressBar';

const HealthBar = ({health, maxHealth, color='pink'}) => {
  return (
    <ProgressBar color={color} value={health} maxValue={maxHealth}/>
  )
}

export default HealthBar;