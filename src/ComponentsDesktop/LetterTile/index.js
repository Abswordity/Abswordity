import React from 'react';
import './index.styles.css'

export const LetterTile = ({ letter, selected, paused }) => {

	return (
		<div className={selected ? "letter-tile-selected" : "letter-tile"}>
			{ paused ? <p>◟̽◞̽</p> : <p>{letter.toUpperCase()}</p>}
		</div>

	)
}