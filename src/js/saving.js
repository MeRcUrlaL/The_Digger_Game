import {gameField, loadGameField, light, loadLight} from './map-genertor'
import {digger, loadDigger} from './movement'
import {minutes} from './game'

export function saveGame(saveKey) {
	//Temporarily saving in localStorage
	const jsonGameField =  JSON.stringify(gameField)
	const jsonDigger = JSON.stringify(digger)
	const jsonMinutes = JSON.stringify(minutes)
	const jsonLight = JSON.stringify(light)
	localStorage.setItem(`${saveKey}_minutes`, jsonMinutes)
	localStorage.setItem(`${saveKey}_gameField`, jsonGameField)
	localStorage.setItem(`${saveKey}_digger`, jsonDigger)
	localStorage.setItem(`${saveKey}_light`, jsonLight)
}

export function loadGame(saveKey) {
	loadGameField(JSON.parse(localStorage.getItem(`${saveKey}_gameField`)))
	loadDigger(JSON.parse(localStorage.getItem(`${saveKey}_digger`)))
	loadLight(JSON.parse(localStorage.getItem(`${saveKey}_light`)))
}


