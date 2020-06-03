import React from 'react';
import logo from './logo.svg';
import {GameBoard} from './Components/GameBoard/index'
import './App.css';

const fetchUsers = () => { fetch('http://localhost:1000/users')
.then(response => response.json())
.then(users => {
  console.log({users})
})
}
function App() {
fetchUsers()
  return (
    <div className="App">
      <header className="App-header">
         <p>
          Get ready to embrace your inner Abswordity!
        </p>
        <GameBoard/>
      </header>
    </div>
  );
}

export default App;
