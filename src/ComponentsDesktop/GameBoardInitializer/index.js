import React, { useState, useEffect} from 'react';
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
          resolve("dictionary resolved");
         });
         
      }

    useEffect(() => {
        initializeDictionary()
        .then(() => showLoadingScreen && setShowLoadingScreen(false) )
    }, [showLoadingScreen])
    return (
        <>
            {showLoadingScreen ? <LoadingScreen/> : <GameBoard/>}
        </>
    )
}


