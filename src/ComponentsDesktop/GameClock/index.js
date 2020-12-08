import React, { Component } from 'react';
import './index.styles.css'

let gameClockSetInterval;

export class GameClock extends Component {

    constructor(props) {
        super(props)
        this.state = {
            timeInSeconds: 0,
            counting: false
        }
    }



    componentDidUpdate = (prevProps, prevState) => {
        const { paused, gameInPlay, levelUp } = this.props;
        const { counting, timeInSeconds } = this.state;
        const { paused: prevPausedStatus, gameInPlay: prevGameInPlayStatus } = prevProps
        const { timeInSeconds: prevTimeInSeconds } = prevState
        // when game is paused or game ends
        if ((!prevPausedStatus && paused) || (prevGameInPlayStatus && !gameInPlay)) {
            clearInterval(gameClockSetInterval);
            this.setState({
                counting: false
            })
        }
        // after the game ends and you start a new game
        else if (!counting && !prevGameInPlayStatus && gameInPlay) {
            this.setState({ timeInSeconds: 0 })
            this.startGameClock();
        }
        // when game goes from paused to unpaused 
        else if (!counting && prevPausedStatus && !paused) {
            this.startGameClock();
        }
        // when a user levels up - prevents levelUp from getting called multiple times accidentally
        else if (timeInSeconds && timeInSeconds !== prevTimeInSeconds && timeInSeconds % 90 === 0) {
            levelUp()
        }
    }


    startGameClock = () => {
        gameClockSetInterval = setInterval(() => {
            this.setState(prevState => {
                return { timeInSeconds: prevState.timeInSeconds + 1, counting: true }
            })
        }, 1000);
    }

    toMMSS = function (secondsString) {
        let sec_num = parseInt(secondsString, 10); // don't forget the second param
        let minutes = Math.floor((sec_num) / 60);
        let seconds = sec_num - (minutes * 60);
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return minutes + ':' + seconds;
    }


    render() {
        const { timeInSeconds } = this.state;
        return (
            <div id="clock-display-container" >
                <div>{this.toMMSS(timeInSeconds)}</div>
            </div>
        )
    }
}