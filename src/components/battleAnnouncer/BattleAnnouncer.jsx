import React from 'react';
import { useTypedMessage } from '../../hooks/useTypedMessage';


const BattleAnnouncer = ({message}) => {
  const typedMessage = useTypedMessage(message);
  return (
    <div className='battleAnnouncer'>
        <p className='message' style={{fontSize:'17px'}}>
            {typedMessage}
        </p>
    </div>
  )
}

export default BattleAnnouncer;