import React, { Component } from 'react'
import { WordScoreDisplay } from '../WordScoreDisplay/index'
import './index.styles.css'



export class Input extends Component {

    render() {
        const { changeHandler, gameInPlay, submitHandler, word, wordScore, paused } = this.props;
        return (
            <div className="input-field-container">
                <form className="input-field" onSubmit={(e) => {
                    e.preventDefault()
                    submitHandler()
                }}
                >
                    <input spellCheck="false" value={word} onChange={changeHandler} className="input-field" disabled={!gameInPlay || paused} ref={input => input && gameInPlay && input.focus()} />
                </form>
                {!!wordScore && <WordScoreDisplay score={wordScore} />}
            </div>
        )
    }
}
