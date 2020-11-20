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
        const { paused, gameInPlay } = this.props;
        const { counting } = this.state;
        const { paused: prevPausedStatus, gameInPlay: prevGameInPlayStatus } = prevProps
        if ((!prevPausedStatus && paused) || (prevGameInPlayStatus && !gameInPlay)) {
            clearInterval(gameClockSetInterval);
            this.setState({
                counting: false
            })
        }
        if (!counting && !prevGameInPlayStatus && gameInPlay) {
            this.setState({ timeInSeconds: 0 })
            this.startGameClock();
        }
        if (!counting && prevPausedStatus && !paused) {
            this.startGameClock();
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