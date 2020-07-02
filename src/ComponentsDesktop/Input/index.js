import React, { Component } from 'react'
import './index.styles.css'



export class Input extends Component {

    render() {
        return (
            <div className="input-field-container">
                <input spellcheck="false" value={this.props.word} onChange={this.props.changeHandler} className="input-field" />
            </div>
        )
    }
}
