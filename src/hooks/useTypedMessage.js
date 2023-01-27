import { useEffect, useState } from "react";
import {wait} from "../utils/wait";

export const useTypedMessage = (message) => {
    const [typedMessage, setTypedMessage] = useState('');
  
    useEffect(() => {
      setTypedMessage('');

      //console.log(message)
  
      if (message.length) {
        (async () => {
          let visibleMessage = '';
          for (let i = 0; i < message.length; i++) {
            await wait(25);
  
            visibleMessage = visibleMessage + message[i];
  
            setTypedMessage(visibleMessage);
          }
        })();
      }
    }, [message]);
  
    return typedMessage;
  };