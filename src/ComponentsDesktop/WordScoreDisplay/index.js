import React from 'react';
import './index.styles.css'

export const WordScoreDisplay = ({ score }) => {

    return (
        <>
            <div id="word-score"><span id="score-plus">+</span>{score}</div>
        </>
    )
}