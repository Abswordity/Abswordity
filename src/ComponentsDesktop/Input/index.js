import React, { Component } from 'react'
import './index.styles.css'



export class Input extends Component {

    render() {
        const { changeHandler, gameInPlay, submitHandler, word } = this.props;
        return (
            <div className="input-field-container">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    submitHandler()
                }}
                >
                    <input spellcheck="false" value={word} onChange={changeHandler} className="input-field" disabled={!gameInPlay} ref={input => input && gameInPlay && input.focus()} />
                </form>
            </div>
        )
    }
}
