import React from 'react';
import './index.styles.css'

export const PauseButtonDisplay = ({ paused, clickHandler }) => {

    return (
        <>
            <div onClick={clickHandler}>
                {!paused ? <i class="pause circle outline icon"></i> : <i class="play circle outline icon"></i>}
            </div>
        </>
    )
}