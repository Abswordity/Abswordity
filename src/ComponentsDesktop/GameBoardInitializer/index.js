import React, { useState} from 'react';
import { GameBoard } from '../GameBoard/index';
import { LoadingScreen } from '../LoadingScreen/index';
import dictionaryRegex from '../../DictionaryRegex.js';





export const GameBoardInitializer = () => {

    const [showLoadingScreen, setShowLoadingScreen] = useState(true)
    const initializeDictionary = () => {
        return new Promise((resolve, reject) => {
          dictionaryRegex.test('yeet')
          dictionaryRegex.test('play')
          dictionaryRegex.test('ball')
      
          // if(somethingSuccesfulHappened) {
          //    const successObject = {
          // 	  msg: 'Success',
          // 	  data,//...some data we got back
          //    }
          //    resolve(successObject); 
          // } else {
          //    const errorObject = {
          // 	  msg: 'An error occured',
          // 	  error, //...some error we got back
          //    }
          //    reject(errorObject);
          // }
          resolve("dictionary resolved");
         });
         
      }

    initializeDictionary().then(()=> {
        showLoadingScreen && setShowLoadingScreen(false)
    })
    return (
        <>
            {showLoadingScreen ? <LoadingScreen/> : <GameBoard/>}
        </>
    )
}


