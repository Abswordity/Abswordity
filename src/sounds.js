const sounds = {
  tileSound: () => {
    const tileSound = new Audio()
    tileSound.src = "https://raw.githubusercontent.com/tzip25/wordy-frontend/master/site/public/sounds/tile.mp3"
    tileSound.play()
  },
  invalidTileSound: () => {
    const invalidTileSound = new Audio()
    invalidTileSound.src = process.env.PUBLIC_URL + "/sounds/invalidTile.mp3"
    invalidTileSound.play()
  },
  wordSound: () => {
    const wordSound = new Audio()
    wordSound.src = "https://raw.githubusercontent.com/tzip25/wordy-frontend/master/site/public/sounds/wordsubmit.mp3"
    wordSound.play()
  },
  invalidWordSound: () => {
    const invalidWordSound = new Audio()
    invalidWordSound.src = process.env.PUBLIC_URL + "/sounds/invalidWord.mp3"
    invalidWordSound.play()
  },
  gameOverSound: () => {
    const gameOver = new Audio()
    gameOver.src = process.env.PUBLIC_URL + "/sounds/endGameWhistle.mp3"
    gameOver.play()
  },
  heartSound: () => {
    const heartSound = new Audio()
    heartSound.src = process.env.PUBLIC_URL + "/sounds/heartSound.mp3"
    heartSound.play()
  }
}

export default sounds;