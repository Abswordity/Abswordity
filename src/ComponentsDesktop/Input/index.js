import React, { Component } from 'react'
import { WordScoreDisplay } from '../WordScoreDisplay/index'
import { PauseButtonDisplay } from '../PauseButtonDisplay/index'
import './index.styles.css'



export class Input extends Component {

    render() {
        const { changeHandler, gameInPlay, submitHandler, word, wordScore, paused, startLetterAppending, pauseGame } = this.props;

        return (
            <div className="input-field-container">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    submitHandler()
                }}
                >
                    <input spellcheck="false" value={word} onChange={changeHandler} className="input-field" disabled={!gameInPlay || paused} ref={input => input && gameInPlay && input.focus()} />
                </form>
                {gameInPlay && <PauseButtonDisplay clickHandler={paused ? startLetterAppending : pauseGame} paused={paused} />}
                {!!wordScore && <WordScoreDisplay score={wordScore} />}
            </div>
        )
    }
}
