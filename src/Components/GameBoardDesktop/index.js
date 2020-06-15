import React from 'react';
import {LetterTileDesktop} from '../LetterTileDesktop/index'
import './index.styles.css'

const lettersArray = ['r','r','r','r','i','i','i','a','r','r','r','r','r','r','r','r','i','i','i','i','i','i','t','t','t','t','n','n','n','n','n','n','n','s','s','s','s','s','s','l','l','l','l','l','c','c','c','c','c','u','u','u','u','d','d','d','p','p','p','m','m','m','h','h','h','g','g','b','b','f','f','y','y','w','k','v','x','z','j','q'];


export const GameBoardDesktop = () => {


    return (
        <div className="game-board">
           {lettersArray.map((letter, index) => {
              return <LetterTileDesktop key={index} letter={letter}/>
           })}
        </div>
    )
}