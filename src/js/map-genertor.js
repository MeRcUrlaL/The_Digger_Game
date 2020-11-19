import {renderOres, renderObjects, renderFuel, renderCargo, renderMoney, renderSpeed, renderLightOnLoad, renderDepth} from './render'
import {camFollow} from './movement'
import {loadGame} from './saving'

const ores = [
	{id: 3, rate: 1000, depth: [0, 100000], name: 'stone', percentIncrease: 0},   // stone
	{id: 4, rate: 10, depth: [3, 100], name: 'coal', percentIncrease: 1000},		// coal
	{id: 5, rate: 15, depth: [20, 60], name: 'copper', percentIncrease: 0},		// copper
	{id: 6, rate: 15, depth: [25, 65], name: 'tin', percentIncrease: 0},		// tin
	{id: 7, rate: 8, depth: [35, 75], name: 'iron', percentIncrease: 0},		  // iron
	{id: 8, rate: 5, depth: [40, 80], name: 'silver', percentIncrease: 0},			// silver
	{id: 9, rate: 3, depth: [45, 85], name: 'gold', percentIncrease: 0},			// gold
	{id: 10, rate: 1, depth: [0, 1000], name: 'platinum', percentIncrease: 0},		// platinum
]

export const heightOfMap = 100
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
		renderObjects()
		renderFuel()
		renderCargo()
		renderSpeed()
		renderMoney()
		renderDepth()
		renderLightOnLoad(gameField)
		camFollow()
	} else {
		generateMapArray(gameField)
		console.log('game loaded')
		renderOres(gameField)
		renderObjects()
		renderFuel()
		renderCargo()
		renderSpeed()
		renderMoney()
		camFollow()
	}
}

function generateMapArray(gameField) {
	calculateRateIncrease()
	let randOreRate
	for (let i = 2; i < heightOfMap; i++){ 
		gameField.push([])

		let rateSum = 0
		let validOres = []

		for (const ore in ores) {
			const min = ores[ore].depth[0]
			const max = ores[ore].depth[1]

			if (min <= i && max >= i){
				console.log('rate' + ores[ore].rate)
				console.log(ores[ore].percentIncrease)

				if ( i < min + (max - min) / 2){
					ores[ore].rate += ores[ore].percentIncrease
				} else {
					ores[ore].rate -= ores[ore].percentIncrease
				}
				validOres.push(ores[ore])
				rateSum += ores[ore].rate
			}
		}
		for (let j = 2; j < widthOfMap; j++) {
			randOreRate = Math.floor(Math.random() * rateSum)
		
			let oreIndex = 0;
			validOres.sort((prev, next) => next.rate - prev.rate)
			for (let s = validOres[0].rate; s <= randOreRate; s += validOres[oreIndex].rate) {
				oreIndex++
			}

			gameField[i].push(validOres[oreIndex].id)
		}
	}

	function calculateRateIncrease() {
		for(let ore in ores) {
			const min = ores[ore].depth[0]
			const max = ores[ore].depth[1]
			if (ores[ore].percentIncrease){
				const percentPerDepth = +(ores[ore].percentIncrease / ((max - min) / 2)).toFixed(1)
				ores[ore].percentIncrease = +(ores[ore].rate / 100 * percentPerDepth).toFixed(2)
			}
		}
	}
}
