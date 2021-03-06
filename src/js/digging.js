import {renderCargo} from './render'
import {gameField, ores} from './map-genertor'
import {digger} from './movement'

export function dig(current, next) {
	const dig = ores.find(({id}) => `b${id}` == next.classList[2])
	
	if (digger.storage[dig.name]) {
		digger.storage[dig.name] += 1
	} else {
		digger.storage[dig.name] = 1
	}
	
	next.className = `block y${digger.posY}x${digger.posX} b0`
	digger.increaseCargo(1)
	
	renderCargo()
	gameField[digger.posY][digger.posX] = 0
}

export function isDiggable(next) {
	const id = next.classList[2].split('b')[1]
	if(id <= 1) {
		return false
	}
	return true
}