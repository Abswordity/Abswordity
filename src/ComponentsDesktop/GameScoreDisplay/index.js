import React from 'react';
import './index.styles.css'

export const GameScoreDisplay = ({ score }) => {
    return (
        <div id="score-display-container">
            {!!score && (<div>{score}</div>)}
        </div>

    )
}