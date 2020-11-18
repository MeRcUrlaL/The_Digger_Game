import {gameField, loadGameField} from './map-genertor'
import {digger, loadDigger} from './movement'

export function saveGame(saveKey) {
	//Temporarily saving in localStorage
	const jsonGameField =  JSON.stringify(gameField)
	const jsonDigger = JSON.stringify(digger)
	localStorage.setItem(`${saveKey}_gameField`, jsonGameField)
	localStorage.setItem(`${saveKey}_digger`, jsonDigger)
}

export function loadGame(saveKey) {
	loadGameField(JSON.parse(localStorage.getItem(`${saveKey}_gameField`)))
	loadDigger(JSON.parse(localStorage.getItem(`${saveKey}_digger`)))
}


