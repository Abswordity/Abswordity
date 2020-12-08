import React from 'react';

import './index.styles.css';

export const Button = ({ text, onClick }) => {
    return (
        <button className="button" onClick={onClick}>{text}</button>
    )
};