import React, { Component } from 'react';
import {LetterTileDesktop} from '../LetterTileDesktop/index'
import './index.styles.css'

const lettersArray = ['e','e','e','e','e','e','e','e','e','e','e','a','a','a','a','a','a','a','a','r','r','r','r','r','r','r','r','i','i','i','i','i','i','i','i','o','o','o','o','o','o','o','t','t','t','t','t','t','t','n','n','n','n','n','n','n','s','s','s','s','s','s','l','l','l','l','l','c','c','c','c','c','u','u','u','u','d','d','d','p','p','p','m','m','m','h','h','h','g','g','b','b','f','f','y','y','w','k','v','x','z','j','q'];





export class GameBoardDesktop extends Component {

    constructor(props) {
        super(props);
        this.state = {
          displayLetters: []
        };        
      }

    componentDidMount = () => {
       this.letterAdditionInterval();
    }

    componentDidUpdate = (prevProps,prevState) => {
        const { prevSampleWord } = prevProps;
        const { sampleWord } = this.props;
        if (prevSampleWord !== sampleWord){
            this.highlightProperTiles();
        }
    }

    componentWillUnmount = () => {
        clearInterval(this.letterAdditionInterval);
    }

    pushToDisplayLetters = () => {
        const { displayLetters } = this.state;
        const randomIndex = Math.floor(Math.random()*103)
        const randomLetter = {letter: lettersArray[randomIndex], selected: false}
        displayLetters.push(randomLetter)
        this.setState({displayLetters})
    }


    letterAdditionInterval = () => {
        const { displayLetters } = this.state;
       const interval = setInterval(()=> {
            if (displayLetters.length > 95){
                clearInterval(interval)
            }
            else {
                this.pushToDisplayLetters()
            }   
        }, 500)
    }


    deriveLetterCountObject = () => {
        const { sampleWord } = this.props;
        const countObject = {};
        sampleWord.forEach((letter) => {
          if (countObject[letter]){
              countObject[letter]+=1;
          }
          else {
              countObject[letter] = 1;
          }
          
        })
        return countObject
    }

    highlightProperTiles = () => {

        // still need to figure out how to prevent repeated unwanted calls of this 
        // function, and to mutate countObject without it being reset
        const countObject = this.deriveLetterCountObject();
        let tilesSelected = false;
        const { displayLetters } = this.state;
        displayLetters.forEach((letterObject) => {
            console.log({countObject})
            if(!letterObject.selected && countObject[letterObject.letter]){
                tilesSelected=true;
                letterObject.selected = true;
                countObject[letterObject.letter]--;
            }    
        })
        if (tilesSelected){
            this.setState({displayLetters})
        }
       
     }

    render(){
        const { displayLetters } = this.state;
        return (
            <div className="game-board">
            {displayLetters.map((letter, index) => {
                return <LetterTileDesktop key={index} letter={letter.letter} selected={letter.selected}/>
            })}
            </div>
        )
    }
   
}