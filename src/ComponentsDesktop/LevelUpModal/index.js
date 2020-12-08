import React from 'react';
import './index.styles.css'
import { Button } from '../Button/index'

export const LevelUpModal = ({ level, startLetterAppending }) => {
    return (
        <div id="level-up-modal-container">
            <div id="level-up-modal-body">
                <h2>You made it to Level {level}! </h2>
                <h3>Things are gonna get Absword!</h3>
                <Button text="Continue" onClick={startLetterAppending} />
            </div>
        </div >
    )
};