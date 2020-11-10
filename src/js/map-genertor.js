import {renderOres, renderObjects, renderFuel, renderStorage, renderMoney} from './render'
import {posX, posY} from './movement'
import {money} from './stations/shop_sell'
import {fuel, maxFuel} from './movement'
import {storageAmount, maxStorage} from './digging'

const genRate = [{id: 3, rate: 60}, {id: 4, rate: 15}, {id: 5, rate: 10}, {id: 6, rate: 10}, {id: 7, rate: 5}]

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

			let sum = 0
		
			for (let k = 0; k < genRate.length; k++) {
				sum += genRate[k].rate;
			}
		
			let rand = Math.floor(Math.random() * sum);
		
			let l = 0;
			for (let s = genRate[0].rate; s <= rand; s += genRate[l].rate) {
				l++;
			}

			gameField[i].push(genRate[l].id)
		}
	}
}
