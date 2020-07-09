import React, { Component } from 'react';
import { LetterTile } from '../LetterTile/index';
import { Input } from '../Input/index';
import './index.styles.css'

const lettersArray = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 't', 't', 't', 't', 't', 't', 't', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 's', 's', 's', 's', 's', 's', 'l', 'l', 'l', 'l', 'l', 'c', 'c', 'c', 'c', 'c', 'u', 'u', 'u', 'u', 'd', 'd', 'd', 'p', 'p', 'p', 'm', 'm', 'm', 'h', 'h', 'h', 'g', 'g', 'b', 'b', 'f', 'f', 'y', 'y', 'w', 'k', 'v', 'x', 'z', 'j', 'q'];

export class GameBoard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			displayLetters: [],
			inputWord: ''
		};
	}

	componentDidMount = () => {
		this.letterAdditionInterval();
	}

	componentWillUnmount = () => {
		clearInterval(this.letterAdditionInterval);
	}

	pushToDisplayLetters = () => {
		const { displayLetters } = this.state;
		const randomIndex = Math.floor(Math.random() * 103)
		const randomLetter = { letter: lettersArray[randomIndex], selected: false }
		const newDisplayLetters = [...displayLetters, randomLetter]
		this.setState({ displayLetters: newDisplayLetters })
	}


	letterAdditionInterval = () => {
		const interval = setInterval(() => {
			const { displayLetters } = this.state;
			if (displayLetters.length > 59) {
				clearInterval(interval)
			}
			else {
				this.pushToDisplayLetters()
			}
		}, 100)
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

	render() {
		const { displayLetters } = this.state;
		return (
			<div>
				<div className="game-board">
					{displayLetters.map((letter, index) => {
						return <LetterTile key={index} letter={letter.letter} selected={letter.selected} />
					})}
				</div>
				<Input changeHandler={this.wordInputChangeHandler} word={this.state.inputWord} />
			</div>
		)
	}

}