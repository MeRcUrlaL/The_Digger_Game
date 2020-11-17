import {renderStorage} from './render'
import {digger} from './movement'
import {gameField} from './map-genertor'

export let storageAmount = 0
export let maxStorage = 10
export let profit= 0
export let storage = {
	dirt: 0,
	stone: 0,
	coal: 0,
	copper: 0,
	tin: 0,
	iron: 0,
	silver: 0,
	gold: 0,
}

export function clearStorage() {
	storageAmount = 0
}

export function clearProfit() {
	profit = 0
}

export function increaseMaxStorage(value) {
	maxStorage += value
}

export function dig(current, next) {
	switch (next.classList[2]) {
		case 'b2':
      storage.dirt += 1
      profit += 0.5
			break
		case 'b3':
      storage.stone += 1
      profit += 1.5
				break
		case 'b4':
      storage.coal += 1
      profit += 5
			break
		case 'b5':
      storage.copper += 1
      profit += 6
			break
		case 'b6':
      storage.tin += 1
      profit += 6
			break
		case 'b7':
      storage.iron += 1
      profit += 7
			break
		case 'b8':
			storage.silver += 1
			profit += 15
		case 'b9':
			storage.gold += 1
			profit += 18
	}
	next.className = `block y${digger.posY}x${digger.posX} b0`
	++storageAmount
	
	renderStorage(storageAmount, maxStorage)
	gameField[digger.posY][digger.posX] = 0
}

export function isDiggable(next) {
	if(next.classList.contains('b0') || next.classList.contains('b1')) {
		return false
	}
	return true
}

export function isFullStorage() {
	if (storageAmount >= maxStorage) {
		return true
	}
	return false
}
