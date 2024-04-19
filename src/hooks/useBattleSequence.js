import { useEffect, useState } from "react";
import { opponentStats, playerStats } from "../classes/character";
import { attack, heal, magic } from "../functions/helpers";
import { wait } from "../functions/helpers";

export const useBattleSequence = (sequence) => {
    const [turn, setTurn] = useState(0);
    const [inSequence, setInSequence] = useState(false);
    const [opponentHealth, setOpponentHealth] = useState(opponentStats.maxHealth);
    const [playertHealth, setPlayertHealth] = useState(playerStats.maxHealth);
    const [announcerMessage, setAnnouncerMessage] = useState('');
    const [playerAnimation, setPlayerAnimation] = useState('static'); //magic, damage, static
    const [opponentAnimation, setOpponentAnimation] = useState('static'); //magic, damage, static
    const [isBattleMenuDisabled, setIsBattleMenuDisabled] = useState(true);

    useEffect(()=>{
        const {mode, turn} = sequence;
        const attacker = turn === 0 ? playerStats : opponentStats;
        const receiver = turn === 0 ? opponentStats : playerStats;

        if(mode){

            switch (mode) {
                case 'attack':
                    
                    const damage = attack({attacker, receiver});   

                    (async()=>{
                        setInSequence(true);

                        setAnnouncerMessage(`${attacker.name} has chosen to attack!`);

                        await wait(1000);

                        turn === 0 ? setPlayerAnimation('attack') : setOpponentAnimation('attack');

                        await wait(100);

                        turn === 0 ? setPlayerAnimation('static') : setOpponentAnimation('static');

                        await wait(500);

                        turn === 0 ? setOpponentAnimation('damage') : setPlayerAnimation('damage');

                        await wait(750);

                        turn === 0 ? setPlayerAnimation('static') : setOpponentAnimation('static');

                        setAnnouncerMessage(`${receiver.name} felt that!`);
                        
                        turn === 0 ? setOpponentHealth(h => (h-damage > 0 ? h-damage : 0)) : setPlayertHealth(h => (h-damage > 0 ? h-damage : 0));

                        await wait(2000);
                        
                        setAnnouncerMessage(`Now is ${receiver.name}'s turn!`);

                        await wait(1500);

                        setTurn( turn === 0 ? 1 : 0);

                        setInSequence(false);
                    })()
                    break;

                case 'magic':
                    const magicDamage = magic({attacker, receiver});   

                    (async()=>{
                        setInSequence(true);

                        setAnnouncerMessage(`${attacker.name} has chosen to cast a spell!`);

                        await wait(1000);

                        turn === 0 ? setPlayerAnimation('attack') : setOpponentAnimation('attack');

                        await wait(100);

                        turn === 0 ? setPlayerAnimation('static') : setOpponentAnimation('static');

                        await wait(500);

                        turn === 0 ? setOpponentAnimation('damage') : setPlayerAnimation('damage');

                        await wait(750);

                        turn === 0 ? setPlayerAnimation('static') : setOpponentAnimation('static');

                        setAnnouncerMessage(`${receiver.name} doesn't know what hit him!`);
                        
                        turn === 0 ? setOpponentHealth(h => (h-magicDamage > 0 ? h-magicDamage : 0)) : setPlayertHealth(h => (h-magicDamage > 0 ? h-magicDamage : 0));

                        await wait(2500);
                        
                        setAnnouncerMessage(`Now is ${receiver.name}'s turn!`);

                        await wait(1500);

                        setTurn( turn === 0 ? 1 : 0);

                        setInSequence(false)

                    })()
                    break;

                case 'heal':
                    const recover = heal({receiver:attacker});

                    (async()=>{

                        setInSequence(true);

                        setAnnouncerMessage(`${attacker.name} has chosen to heal!`);

                        await wait(1000);

                        turn === 0 ? setPlayerAnimation('magic') : setOpponentAnimation('magic');

                        await wait(1000);

                        turn === 0 ? setPlayerAnimation('static') : setOpponentAnimation('static');

                        await wait(500);

                        setAnnouncerMessage(`${attacker.name} has recover health!`);
                        turn === 0 ? setPlayertHealth(h => (h + recover <= attacker.maxHealth ? h + recover : attacker.maxHealth)) : setOpponentHealth(h => (h + recover <= attacker.maxHealth ? h + recover : attacker.maxHealth));

                        await wait(2500);
                        
                        setAnnouncerMessage(`Now is ${receiver.name}'s turn!`);

                        await wait(1500);

                        await wait(2500);
                         
                        setTurn( turn === 0 ? 1 : 0);

                        setInSequence(false);

                    })()
                    break;

                default:
                    break;
            }
        }
    },[sequence]);

    return {
        turn,
        inSequence,
        opponentHealth,
        playertHealth,
        announcerMessage,
        playerAnimation,
        opponentAnimation,
        isBattleMenuDisabled
    }
};