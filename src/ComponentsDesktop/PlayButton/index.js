import React from 'react'
import './index.css'

export const PlayButton = ({ clickHandler }) => {

    return (
        <div id="play-button-container">
            <button id="play-button" onClick={() => {
                clickHandler()
            }} >
                <div id="play-arrow" />
            </button>
        </div>
    )
}

