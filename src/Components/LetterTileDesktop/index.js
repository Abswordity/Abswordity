import React from 'react';
import './index.styles.css'

export const LetterTileDesktop = ({letter}) => {
	
	return (
		<div className="letter-tile">
		<p>{letter.toUpperCase()}</p>
		</div>

	)
}