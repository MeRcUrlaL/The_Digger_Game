import {gameField, loadGameField} from './map-genertor'
import {digger, loadDigger} from './movement'

export function saveGame() {
	//Temporarily saving in localStorage
	localStorage.setItem('load1', [JSON.stringify(gameField),JSON.stringify(digger)])
}

export function loadGame(saveKey) {
	loadGameField(JSON.parse(localStorage.getItem(saveKey))[0])
	loadDigger(JSON.parse(localStorage.getItem(saveKey))[1])
}


