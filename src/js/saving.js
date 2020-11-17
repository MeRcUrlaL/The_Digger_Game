import {gameField, setGameField} from './map-genertor'

export function saveGame() {
	//Temporarily saving in localStorage
	localStorage.setItem('load1', JSON.stringify(gameField))
}

export function loadGame(saveKey) {
	setGameField(JSON.parse(localStorage.getItem(saveKey)))
}


