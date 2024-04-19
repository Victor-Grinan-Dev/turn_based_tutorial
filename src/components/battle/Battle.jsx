import React, { useEffect, useState } from 'react';
import PlayerSummary from '../playerSummary/PlayerSummary';
import { playerStats, opponentStats } from '../../classes/character';
import BattleMenu from '../battleMenu/BattleMenu';
import BattleAnnouncer from '../battleAnnouncer/BattleAnnouncer';
import { useBattleSequence } from '../../hooks/useBattleSequence';
import { useAIOpponent } from '../../hooks/useAIOpponent';
import { wait } from '../../functions/helpers';

const Battle = ({onGameEnd}) => {
    const [sequence, setSequence] = useState({turn:0, mode:'static'});
    const {
        turn,
        inSequence,
        opponentHealth,
        playertHealth,
        announcerMessage,
        playerAnimation,
        opponentAnimation,
    } = useBattleSequence(sequence);

    const aiChoice = useAIOpponent(turn); 

    useEffect(() => {
        if(aiChoice && turn === 1 && !inSequence){
            setSequence({turn, mode: aiChoice});
        }
    }, [turn, aiChoice, inSequence]);

    useEffect(() => {
        
        if(playertHealth === 0 || opponentHealth === 0){
            (async ()=>{
                await wait(2000);
                onGameEnd(playertHealth === 0 ? opponentStats : playerStats);
            })();
        }
    }, [opponentHealth, playertHealth, onGameEnd]);
    
  return (
    <div className='battle' >
        <div className="main" style={{display:'flex', flexDirection:'column', justifyContent:'space-between', height:'80svh', padding:'10px'}}>
            <div className="opponent" style={{display:'flex', justifyContent:'space-between', width:'90vw', gap:'10px'}}>
                <div style={{width:'50%'}}></div>
                <div className="summary" style={{width:'50%'}}>
                    <PlayerSummary
                        name={opponentStats.name}
                        level={opponentStats.level}
                        health={opponentHealth}  
                        maxHealth={opponentStats.maxHealth}
                        color={opponentStats.color}
                    />
                </div>
            </div>

            <div className="characters">
                <div className="gameHeader">
                    <h2>{playerStats.name} vs {opponentStats.name}</h2>
                </div>

                <div className="gameImages" style={{display:'flex', width:'100%', justifyContent:'space-around'}}>
                    {/* <div className="opponentSprite">{opponentStats.name}'s image</div> */}
                    <div name='actual-player-sprite' className="playerSprite">
                        <div className={playerAnimation} style={{backgroundColor:"green", height:'100px', width:'100px' }}>
                            {playerStats.name}'s image
                        </div>
                    </div>
                    <div className="opponentSprite">
                        <div name='actual-opponent-sprite' className={opponentAnimation} style={{backgroundColor:"purple", height:'100px', width:'100px' }}>
                            {opponentStats.name}'s image
                        </div>
                    </div>
                </div>
            </div>

            <div className="user" style={{display:'flex', justifyContent:'space-between', width:'90vw', gap:'10px'}}>
                <div className="summary" style={{width:'50%'}}>
                    <PlayerSummary 
                        main
                        name={playerStats.name}
                        level={playerStats.level}
                        health={playertHealth}  
                        maxHealth={playerStats.maxHealth}
                        color={playerStats.color}
                    />
                </div>

                <div className="hud" style={{width:'50%', backgroundColor: playerStats.color}}>
                    <div className="hudchild">
                        <BattleAnnouncer message={announcerMessage || `What will ${playerStats.name} do?`}/>
                    </div>
                    <div className="hudChild">
                        <BattleMenu 
                            disabled = {inSequence}
                            onAttck={()=>setSequence({turn, mode: 'attack'})}
                            onMagic={()=>setSequence({turn, mode: 'magic'})}
                            onHeal={()=>setSequence({turn, mode: 'heal'})}
                        />
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Battle;