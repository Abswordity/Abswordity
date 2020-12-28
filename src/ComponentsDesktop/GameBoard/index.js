import React, { Component } from 'react';
import { LetterTile } from '../LetterTile/index';
import { Input } from '../Input/index';
import { PlayButton } from '../PlayButton/index';
import './index.styles.css';
import dictionaryRegex from '../../DictionaryRegex.js';
import sounds from '../../sounds';
import { HeartDisplay } from '../HeartDisplay/index';
import { GameScoreDisplay } from '../GameScoreDisplay/index';
import { GameClock } from '../GameClock/index'
import { LevelUpModal } from '../LevelUpModal/index'

const { tileSound, invalidTileSound, wordSound, invalidWordSound, gameOverSound, heartSound, gameStartSound, levelUpSound } = sounds;

const lettersArray = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 't', 't', 't', 't', 't', 't', 't', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 's', 's', 's', 's', 's', 's', 'l', 'l', 'l', 'l', 'l', 'c', 'c', 'c', 'c', 'c', 'u', 'u', 'u', 'u', 'd', 'd', 'd', 'p', 'p', 'p', 'm', 'm', 'm', 'h', 'h', 'h', 'g', 'g', 'b', 'b', 'f', 'f', 'y', 'y', 'w', 'k', 'v', 'x', 'z', 'j', 'q'];

const letterScoreObject = {
	a: 1,
	b: 2,
	c: 2,
	d: 1,
	e: 1,
	f: 3,
	g: 1,
	h: 3,
	i: 1,
	j: 4,
	k: 3,
	l: 1,
	m: 2,
	n: 1,
	o: 1,
	p: 2,
	q: 5,
	r: 1,
	s: 1,
	t: 1,
	u: 2,
	v: 3,
	w: 3,
	x: 4,
	y: 3,
	z: 5
}

let letterAppendingSetInterval;

export class GameBoard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			displayLetters: [],
			inputWord: '',
			gameInPlay: false,
			hearts: 3,
			gameStartCountdown: null,
			gameScore: 0,
			currentWordScore: 0,
			letterAdditionInterval: 1000,
			paused: false,
			currentLevel: 1,
			levelingUp: false,
			gameWordArray: []
		};
	}

	componentDidMount = () => {
		dictionaryRegex.test('yeet')
		dictionaryRegex.test('play')
		dictionaryRegex.test('ball')
	}

	componentWillUnmount = () => {
		clearInterval(this.startLetterAppending);
	}

	playButtonClickHandler = () => {
		this.startCountdown().then(() => {
			this.setState({
				displayLetters: [],
				inputWord: '',
				gameInPlay: true,
				hearts: 3,
				gameScore: 0,
			})

			setTimeout(() => {
				this.startLetterAppending();
			}, 0)
		})
	}

	pushToDisplayLetters = () => {
		const { displayLetters } = this.state;
		const randomIndex = Math.floor(Math.random() * 103)
		const randomLetter = { letter: lettersArray[randomIndex], selected: false }
		const newDisplayLetters = [...displayLetters, randomLetter]
		this.setState({ displayLetters: newDisplayLetters })
	}

	startLetterAppending = () => {
		const { gameInPlay } = this.state;
		if (gameInPlay) {
			this.setState({
				paused: false,
				levelingUp: false
			})
			letterAppendingSetInterval = setInterval(() => {
				const { displayLetters } = this.state;
				if (displayLetters.length > 59) {
					this.endGame();
				}
				else {
					this.pushToDisplayLetters()
				}
			}, this.state.letterAdditionInterval)
		}
	}

	postScore = () => {
		const { gameWordArray, gameScore } = this.state;
		fetch('http://localhost:1000/users', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: "tali.scheer@gmail.com",
				gameWordArray,
				gameScore
			})
		}).then(res => {
			console.log({ res })
		}).catch(err => console.log({ err }))
	}

	endGame = () => {
		gameOverSound()
		clearInterval(letterAppendingSetInterval)
		this.postScore();
		this.setState({
			gameInPlay: false,
			gameStartCountdown: null,
			letterAdditionInterval: 1000,
			currentLevel: 1,
			gameWordArray: []
		})
	}

	pauseGame = () => {
		const { gameInPlay } = this.state;
		if (gameInPlay) {
			this.setState({ paused: true })
			clearInterval(letterAppendingSetInterval)
		}
	}

	deriveLetterCountObject = (word) => {
		const countObject = {};
		word.split('').forEach((letter) => {
			if (countObject[letter]) {
				countObject[letter] += 1;
			}
			else {
				countObject[letter] = 1;
			}

		})
		return countObject
	}

	highlightProperTiles = (word, keyPressed) => {
		const { displayLetters } = this.state;
		if (this.validInput(word) || !word.length) {
			tileSound()
			const countObject = this.deriveLetterCountObject(word);
			const resetDisplayLetters = displayLetters.map((letter) => {
				return { ...letter, selected: false }
			})

			return resetDisplayLetters.map((letterObject) => {
				if (!letterObject.selected && countObject[letterObject.letter]) {
					letterObject.selected = true;
					countObject[letterObject.letter]--;
				}
				return letterObject
			})
		} else {
			if (keyPressed === " ") {
				this.explodeHeart()
				this.setState({ inputWord: '' })
			} else {
				invalidTileSound()
			}
		}
	}

	wordInputChangeHandler = (event) => {
		const { paused } = this.state;
		if (!paused) {
			const { nativeEvent: { data } } = event;
			const displayLetters = this.highlightProperTiles(event.target.value, data)

			if (displayLetters) {
				this.setState({
					inputWord: event.target.value,
					displayLetters: displayLetters
				})
			}
		}
	}

	validInput = (word) => {
		const { displayLetters, inputWord } = this.state;
		if (word.length < inputWord.length) {
			return true;
		}
		const lastLetter = word[word.length - 1]
		const letterAvailable = displayLetters.find((letterObject) => {
			return (letterObject.letter === lastLetter && !letterObject.selected)
		})

		if (letterAvailable) {
			return true;
		}
		const wordWithoutLastLetter = word.slice(0, word.length - 1)
		this.setState({
			inputWord: wordWithoutLastLetter
		})

	}

	wordInputSubmitHandler = () => {
		const { displayLetters, inputWord, gameWordArray, gameScore } = this.state;

		const nonHighlightedLetters = displayLetters.filter((letterObject) => {
			return !letterObject.selected
		})
		if (dictionaryRegex.test(inputWord)) {
			const wordScore = this.addWordScore(inputWord)
			const wordObj = { word: inputWord, score: wordScore }
			const newGameWordArray = [...gameWordArray, wordObj]
			const updatedGameScore = gameScore + wordScore
			wordSound()
			this.setState(
				{
					gameWordArray: newGameWordArray,
					displayLetters: nonHighlightedLetters,
					inputWord: '',
					gameScore: updatedGameScore,
					currentWordScore: wordScore
				}
			)
			setTimeout(() => {
				this.resetWordScore()
			}, 1000)
		} else {
			invalidWordSound()
		}
	}

	addWordScore = (word) => {
		let wordScore = 0;
		const wordLettersArray = word.split("");
		const multiplier = this.lengthScoreMultiplier(wordLettersArray);

		wordLettersArray.forEach((letter) => {
			wordScore += letterScoreObject[letter]
		})
		wordScore = Math.round(wordScore * multiplier);
		return wordScore
	}

	lengthScoreMultiplier = (wordArray) => {
		if (wordArray.length > 4) {
			let multiplier = .1 * wordArray.length
			return 1 + multiplier
		}
		return 1
	}

	explodeHeart = () => {
		const { gameInPlay, hearts } = this.state;
		if (gameInPlay && hearts) {
			heartSound()
			let newHeartCount = hearts - 1

			this.setState({
				displayLetters: [],
				hearts: newHeartCount
			})
		}
	}

	startCountdown = () => {
		return new Promise((resolve, reject) => {
			let timerCount = 3;
			const countdownInterval = setInterval(() => {
				if (timerCount === 0) {
					gameStartSound()
					clearInterval(countdownInterval)
					resolve('countdown over');
					return;
				} else {
					tileSound()
					this.setState({
						gameStartCountdown: timerCount,
					})
					timerCount--
				}
			}, 1000)
		})
	}

	resetWordScore = () => {
		this.setState({
			currentWordScore: 0,
		})
	}

	levelUp = async () => {
		// pause the game, increase the speed, increment the level, show popup, clear board and unpause game
		await this.pauseGame()
		await this.setState(prevState => {
			return {
				...prevState,
				currentLevel: prevState.currentLevel + 1,
				letterAdditionInterval: (prevState.letterAdditionInterval) / 1.2,
				displayLetters: [],
				inputWord: '',
				levelingUp: true
			}
		})
		levelUpSound()
	}

	render() {
		const { displayLetters, gameInPlay, hearts, gameStartCountdown, gameScore, inputWord, currentWordScore, paused, levelingUp, currentLevel } = this.state;
		return (
			<>
				<div>
					<div id="top-bar">
						<GameClock gameInPlay={gameInPlay} paused={paused} levelUp={this.levelUp} />
						<GameScoreDisplay score={gameScore} />
						<HeartDisplay hearts={hearts} />
					</div>
					{!gameInPlay &&
						<div>
							<PlayButton gameStartCountdown={gameStartCountdown} clickHandler={this.playButtonClickHandler} />
						</div>}
					{levelingUp && <LevelUpModal level={currentLevel} startLetterAppending={this.startLetterAppending} />}
					<div className="game-board">
						{displayLetters.map((letter, index) => {
							return <LetterTile key={index} letter={letter.letter} selected={letter.selected} paused={paused} />
						})}
					</div>
					<Input changeHandler={(e) => this.wordInputChangeHandler(e)} submitHandler={this.wordInputSubmitHandler} word={inputWord} gameInPlay={gameInPlay} wordScore={currentWordScore} paused={paused} pauseGame={this.pauseGame} startLetterAppending={this.startLetterAppending} levelingUp={levelingUp} />
				</div>
			</>
		)
	}

}