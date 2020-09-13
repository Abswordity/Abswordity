import React, { useState } from 'react'
import './index.styles.css'

export const PlayButton = ({ gameStartCountdown, clickHandler }) => {
    const [playButtonDisabled, setPlayButtonDisabled] = useState(false)
    return (
        <div id="play-button-container">
            {gameStartCountdown ?
                <button id="play-button">
                    {gameStartCountdown}
                </button>
                :
                (<button disabled={playButtonDisabled} id="play-button" onClick={() => {
                    setPlayButtonDisabled(true);
                    clickHandler()
                }} >
                    <div id="play-arrow" />
                </button>)}
        </div>
    )
}

