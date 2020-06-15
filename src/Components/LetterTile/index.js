import React from 'react';
import './index.styles.css'

export const LetterTile = ({letter}) => {
	
	return (
		<div className="letter-tile">
		<p>{letter.toUpperCase()}</p>
		</div>

	)
}