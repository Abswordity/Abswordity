import React, { Component } from 'react';
import { LetterTile } from '../LetterTile/index';
import { Input } from '../Input/index';
import { PlayButton } from '../PlayButton/index';
import './index.styles.css';
import dictionaryRegex from '../../DictionaryRegex.js'
import sounds from '../../sounds'

const { tileSound, invalidTileSound, wordSound, invalidWordSound, gameOverSound } = sounds;

const lettersArray = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 't', 't', 't', 't', 't', 't', 't', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 's', 's', 's', 's', 's', 's', 'l', 'l', 'l', 'l', 'l', 'c', 'c', 'c', 'c', 'c', 'u', 'u', 'u', 'u', 'd', 'd', 'd', 'p', 'p', 'p', 'm', 'm', 'm', 'h', 'h', 'h', 'g', 'g', 'b', 'b', 'f', 'f', 'y', 'y', 'w', 'k', 'v', 'x', 'z', 'j', 'q'];

export class GameBoard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			displayLetters: [],
			inputWord: '',
			gameInPlay: false,
		};
	}

	componentDidMount = () => {
		dictionaryRegex.test('yeet')
		dictionaryRegex.test('play')
		dictionaryRegex.test('ball')
	}

	componentWillUnmount = () => {
		clearInterval(this.letterAdditionInterval);
	}

	playButtonClickHandler = () => {
		this.setState({
			displayLetters: [],
			inputWord: '',
			gameInPlay: true
		})

		setTimeout(() => {
			this.letterAdditionInterval();
		}, 0)
	}

	pushToDisplayLetters = () => {
		const { displayLetters } = this.state;
		const randomIndex = Math.floor(Math.random() * 103)
		const randomLetter = { letter: lettersArray[randomIndex], selected: false }
		const newDisplayLetters = [...displayLetters, randomLetter]
		this.setState({ displayLetters: newDisplayLetters })
	}

	letterAdditionInterval = () => {
		const { gameInPlay } = this.state;
		if (gameInPlay) {
			const interval = setInterval(() => {

				const { displayLetters } = this.state;
				if (displayLetters.length > 59) {
					gameOverSound()
					clearInterval(interval)
					this.setState({
						gameInPlay: false
					})
				}
				else {
					this.pushToDisplayLetters()
				}
			}, 1000)
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

	highlightProperTiles = (word) => {
		if (this.validInput(word) || !word.length) {
			tileSound()
			const countObject = this.deriveLetterCountObject(word);
			const { displayLetters } = this.state;
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
			invalidTileSound()
		}
	}

	wordInputChangeHandler = (event) => {
		const displayLetters = this.highlightProperTiles(event.target.value)
		if (displayLetters) {
			this.setState({
				inputWord: event.target.value,
				displayLetters: displayLetters
			})
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
		const { displayLetters, inputWord } = this.state;
		const nonHighlightedLetters = displayLetters.filter((letterObject) => {
			return !letterObject.selected
		})
		if (dictionaryRegex.test(inputWord)) {
			wordSound()
			this.setState({
				displayLetters: nonHighlightedLetters,
				inputWord: ''
			})
		}
		else {
			invalidWordSound()
		}
	}

	render() {
		const { displayLetters, gameInPlay } = this.state;
		return (
			<div>
				{!gameInPlay &&
					<div>
						< PlayButton clickHandler={this.playButtonClickHandler} />
					</div>}
				<div className="game-board">
					{displayLetters.map((letter, index) => {
						return <LetterTile key={index} letter={letter.letter} selected={letter.selected} />
					})}
				</div>
				<Input changeHandler={this.wordInputChangeHandler} submitHandler={this.wordInputSubmitHandler} word={this.state.inputWord} gameInPlay={gameInPlay} />
			</div>
		)
	}

}