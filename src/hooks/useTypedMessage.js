import { useEffect, useState } from "react";
import { wait } from "../functions/helpers";

export const useTypedMessage = (message) => {
    const [typedMessage, setTypedMessage] = useState('');

    useEffect(()=>{
        setTypedMessage('');
        if(message.length){
            (async() => {
                let visibleMesage = '';

                for (let i = 0; i < message.length; i++){
                    await wait(50);
                    visibleMesage = visibleMesage + message[i];
                    setTypedMessage(visibleMesage);
                }
            })();
        }
    }, [message]);

    return typedMessage;
};