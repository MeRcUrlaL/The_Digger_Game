import {gameField, loadGameField} from './map-genertor'
import {digger, loadDigger} from './movement'

export function saveGame() {
	//Temporarily saving in localStorage
	const jsonGameField =  JSON.stringify(gameField)
	const jsonDigger = JSON.stringify(digger)
	localStorage.setItem('load1_gameField', jsonGameField)
	localStorage.setItem('load1_digger', jsonDigger)
}

export function loadGame(saveKey) {
	loadGameField(JSON.parse(localStorage.getItem(`${saveKey}_gameField`)))
	loadDigger(JSON.parse(localStorage.getItem(`${saveKey}_digger`)))
}


