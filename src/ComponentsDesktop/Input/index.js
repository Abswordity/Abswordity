import React, { Component } from 'react'
import './index.styles.css'



export class Input extends Component {

    render() {
        return (
            <div>
                <input value={this.props.word} onChange={this.props.changeHandler} />
            </div>
        )
    }
}
