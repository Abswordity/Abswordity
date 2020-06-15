import React from 'react';
import logo from './logo.svg';
import {GameBoardDesktop} from './Components/GameBoardDesktop/index'
import './App.css';

const fetchUsers = () => { fetch('http://localhost:1000/users')
.then(response => response.json())
.then(users => {
  console.log({users})
})
}
function App() {
fetchUsers()
const sampleWord = ["h", "e", "l", "l"]
  return (
    <div className="App">
      <header className="App-header">
         <p>
          Get ready to embrace your inner Abswordity!
        </p>
        <GameBoardDesktop sampleWord={sampleWord}/>
      </header>
    </div>
  );
}

export default App;