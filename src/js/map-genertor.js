import {renderOres, renderObjects, renderFuel, renderCargo, renderMoney, renderSpeed, renderLightOnLoad} from './render'
import {camFollow, digger} from './movement'
import {loadGame} from './saving'


const genRate = [
	{id: 3, rate: 100},   // stone
	{id: 4, rate: 20},		// coal
	{id: 5, rate: 15},		// copper
	{id: 6, rate: 15},		// tin
	{id: 7, rate: 8},		  // iron
	{id: 8, rate: 5},			// silver
	{id: 9, rate: 3}			// gold
]

const genDepth = [
	[0],	  		// stone id: 3
	[3, 40],    // coal id: 4
	[20, 60],   // copper id: 5
	[25, 65],		// tin id: 6
	[35, 75],   // iron id: 7
	[40, 80],		// silver id: 8
	[45, 85],		// gold id: 9
]

export const heightOfMap = 200
export const widthOfMap = 42

export let gameField = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
]

export function loadGameField(value) {
	gameField = value
}

export function generateMap(loadNum) {
	if (loadNum){
		loadGame(loadNum)
		renderOres(gameField)
		renderObjects(digger.posX, digger.posY)
		renderFuel()
		renderCargo()
		renderSpeed()
		renderMoney()
		renderLightOnLoad(gameField)
		camFollow()
	} else {
		generateMapArray(gameField)
		renderOres(gameField)
		renderObjects(digger.posX, digger.posY)
		renderFuel()
		renderCargo()
		renderSpeed()
		renderMoney()
		camFollow()
	}
}

function generateMapArray(gameField) {
	let rnd
	for (let i = 2; i < heightOfMap; i++){ 
		gameField.push([])
		for (let j = 2; j < widthOfMap; j++) {

			let sum = 0
		
			for (let k = 0; k < genRate.length; k++) {
				sum += genRate[k].rate;
			}
		
			let rand = Math.floor(Math.random() * sum);
		
			let l = 0;
			for (let s = genRate[0].rate; s <= rand; s += genRate[l].rate) {
				l++;
			}
			if (genDepth[l][0] <= i && genDepth[l][1] >= i){
				gameField[i].push(genRate[l].id)
			} else {
				gameField[i].push(3)
			}
		}
	}
}
