import {renderOres, renderObjects, renderFuel, renderStorage, renderMoney} from './render'
import {posX, posY} from './movement'
import {money} from './stations/shop_sell'
import {fuel, maxFuel} from './movement'
import {storageAmount, maxStorage} from './digging'


export let gameField = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
]

export function generateMap() {
	generateMapArray(gameField)
  renderOres(gameField)
  renderObjects(posX, posY)
  renderFuel(fuel, maxFuel, posY)
  renderStorage(storageAmount, maxStorage)
  renderMoney(money)
}

function generateMapArray(gameField) {
	let rnd
	for (let i = 2; i < 100; i++){ 
		gameField.push([])
		for (let j = 2; j < 42; j++) {
			rnd = parseInt(Math.random() * 5 + 3)
			gameField[i].push(rnd)
		}
	}
}
