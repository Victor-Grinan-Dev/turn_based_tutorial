import React from 'react';

const BattleMenu = ({ onAttck, onMagic, onHeal, disabled }) => {
  return (
    <div className='battleMenu' >
        <button disabled={disabled} onClick={onAttck} className="skill">Attack</button>
        <button disabled={disabled} onClick={onMagic} className="skill">Magic</button>
        <button disabled={disabled} onClick={onHeal} className="skill">Heal</button>
    </div>
  )
}

export default BattleMenu;