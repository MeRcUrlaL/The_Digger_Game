import {renderCargo} from './render'
import {gameField} from './map-genertor'
import {digger} from './movement'

export function dig(current, next) {
	switch (next.classList[2]) {
		case 'b2':
      digger.storage.dirt += 1
      digger.increaseProfit(0.5)
			break
		case 'b3':
      digger.storage.stone += 1
      digger.increaseProfit(1.5)
				break
		case 'b4':
      digger.storage.coal += 1
      digger.increaseProfit(5)
			break
		case 'b5':
      digger.storage.copper += 1
      digger.increaseProfit(6)
			break
		case 'b6':
      digger.storage.tin += 1
      digger.increaseProfit(6)
			break
		case 'b7':
      digger.storage.iron += 1
      digger.increaseProfit(7)
			break
		case 'b8':
			digger.storage.silver += 1
			digger.increaseProfit(15)
		case 'b9':
			digger.storage.gold += 1
			digger.increaseProfit(18)
	}
	next.className = `block y${digger.posY}x${digger.posX} b0`
	digger.increaseCargo(1)
	
	renderCargo()
	gameField[digger.posY][digger.posX] = 0
}

export function isDiggable(next) {
	if(next.classList.contains('b0') || next.classList.contains('b1')) {
		return false
	}
	return true
}