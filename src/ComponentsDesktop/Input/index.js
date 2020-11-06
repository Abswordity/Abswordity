import React, { Component } from 'react'
import { WordScoreDisplay } from '../WordScoreDisplay/index'
import './index.styles.css'



export class Input extends Component {

    render() {
        const { changeHandler, gameInPlay, submitHandler, word, wordScore } = this.props;

        return (
            <div className="input-field-container">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    submitHandler()
                }}
                >
                    <input spellcheck="false" value={word} onChange={changeHandler} className="input-field" disabled={!gameInPlay} ref={input => input && gameInPlay && input.focus()} />
                </form>
                {!!wordScore && <WordScoreDisplay score={wordScore} />}
            </div>
        )
    }
}
