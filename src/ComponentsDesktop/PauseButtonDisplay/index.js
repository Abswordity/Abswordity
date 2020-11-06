import React from 'react';
import './index.styles.css'

export const PauseButtonDisplay = ({ paused, clickHandler }) => {

    return (
        <div id="pause-button-container" >
            <div onClick={clickHandler}>
                <div id="pause-button-circle">
                    {!paused ? <div id="pause-button-symbol" /> : <div id="resume-button-symbol" />}
                </div>
            </div>
            <div>{paused ? 'Resume' : 'Pause'}</div>
        </div >
    )
}