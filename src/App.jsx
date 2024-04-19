import { useState } from 'react';
import StartMenu from './components/startMenu/StartMenu';
import Battle from './components/battle/Battle';
import GameOver from './components/gameOver/GameOver';
import './App.css';

function App() {
 const [mode, setMode] = useState('start');
 const [winner, setWinner] = useState('');
  return (
      <div style={{ backgroundColor:'orange', display:'flex', flexDirection:'column' }}>
        {mode === 'start' && <StartMenu onStartClick={()=> setMode('battle')}/>}

        {mode === 'battle' && <Battle  onGameEnd={(winner)=>{
          setWinner(winner);
          setMode('gameOver');
        }}/>}

        {mode === 'gameOver' && <GameOver winner={winner} onStartClick={()=> setMode('battle')} />}
      </div>
  )
}

export default App;
