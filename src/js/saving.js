import {gameField, loadGameField} from './map-genertor'
import {digger, loadDigger} from './movement'
import {minutes} from './game'

export function saveGame(saveKey) {
	//Temporarily saving in localStorage
	const jsonGameField =  JSON.stringify(gameField)
	const jsonDigger = JSON.stringify(digger)
	const jsonMinutes = JSON.stringify(minutes)
	localStorage.setItem(`${saveKey}_minutes`, jsonMinutes)
	localStorage.setItem(`${saveKey}_gameField`, jsonGameField)
	localStorage.setItem(`${saveKey}_digger`, jsonDigger)
}

export function loadGame(saveKey) {
	loadGameField(JSON.parse(localStorage.getItem(`${saveKey}_gameField`)))
	loadDigger(JSON.parse(localStorage.getItem(`${saveKey}_digger`)))
}


