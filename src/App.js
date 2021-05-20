import React from 'react';
import logo from './logo.svg';
import { GameBoardInitializer } from './ComponentsDesktop/GameBoardInitializer/index'
import './App.css';

const fetchUsers = () => {
  fetch('http://localhost:1000/users')
    .then(response => response.json())
    .then(users => {
      console.log({ users })
    })
}

function App() {
  fetchUsers()

  console.log("APP.js LOADED")
  return (
    <div className="App">
      <header className="App-header">
        <GameBoardInitializer/> 
      </header>
    </div>
  );
}

export default App;