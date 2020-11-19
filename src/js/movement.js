import {gameField} from './map-genertor'
import {dig, isDiggable} from './digging'
import {renderFuel, renderDepth, clearDarkness, renderMoney, renderSpeed, renderCargo} from './render'
import {interact} from './interaction'
import {oneFuelCost} from './stations/fuel'
import {openMenu} from './game'


export let digger = {
	posX: 12,
	posY: 0,
	money: 0,
	fuel: 12,
	maxFuel: 40,
	cargo: 0,
	maxCargo: 10,
	speed: 10,
	profit: 0,
	visionRadius: 1,
	storage: {
		dirt: 0,
		stone: 0,
		coal: 0,
		copper: 0,
		tin: 0,
		iron: 0,
		silver: 0,
		gold: 0,
		platinum: 0,
	},
	increaseMoney(value){
		this.money += value
	},
	decreaseMoney(value){
		this.money -= value
	},
	increaseFuel(value){
		this.fuel += value
	},
	increaseMaxFuel(value){
		this.maxFuel += value
	},
	decreaseFuel(value){
		this.fuel -= value
	},
	increaseCargo(value){
		this.cargo += value
	},
	clearCargo(){
		this.cargo = 0
	},
	increaseMaxCargo(value){
		this.maxCargo += value
	},
	isFullHold() {
		if (this.cargo >= this.maxCargo){
			return true
		}
		return false
	},
	increaseSpeed(value) {
		this.speed += value
		renderSpeed()
	},
	increaseProfit(value) {
		this.profit += value
	},
	clearProfit() {
		this.profit = 0
	},
	clearStorage() {
		for (const ore in this.storage) {
			this.storage[ore] = 0
		}
	},
	 increaseVision(value) {
		this.visionRadius += value
	 }
}

export function loadDigger(val) {
	for(const prop in val){
		digger[prop] = val[prop]
	}
}

export const fuelForMove = 0.5
export const fuelForDig = 2

const game = document.getElementById('game')


let current = game.querySelector(`.y${digger.posY}x${digger.posX}`)
let timer

function timeOut(timeout) {
	timer = setTimeout(() => timer = clearTimeout(timer), timeout)
}

window.addEventListener('keydown', listenerHandler)

export function listenerHandler (ev) {
	if (!timer && ev.keyCode == '87') {
		moveY(-1)
		timeOut(500 - digger.speed)
	} else if (!timer && ev.keyCode == '65') {
		moveX(-1)
		timeOut(500 - digger.speed)
	} else if (!timer && ev.keyCode == '83') {
		moveY(1)
		timeOut(500 - digger.speed)
	} else if (!timer && ev.keyCode == '68') {
		moveX(1)
		timeOut(500 - digger.speed)
	} else if (ev.keyCode == '69') {
		interact()
	} else if (ev.keyCode == '27'){
		openMenu()
	}
}

function moveX(direction) {
	current = game.querySelector(`.y${digger.posY}x${digger.posX}`)

	if (direction > 0 && digger.posX < gameField[0].length - 1) {
		let next = game.querySelector(`.y${digger.posY}x${++digger.posX}`)
		move(current, next, 'right')
	} else if(direction < 0 && digger.posX > 0) {
		let next = game.querySelector(`.y${digger.posY}x${--digger.posX}`)
		move(current, next, 'left')
	}
}

function moveY(direction) {
	current = game.querySelector(`.y${digger.posY}x${digger.posX}`)

	if (direction > 0 && digger.posY < gameField.length - 1) {
		let next = game.querySelector(`.y${++digger.posY}x${digger.posX}`)
		move(current, next, 'down')
	} else if(direction < 0 && digger.posY > 0) {
		let next = game.querySelector(`.y${--digger.posY}x${digger.posX}`)
		move(current, next, 'up')
	}
}

function move(current, next, direction) {
	if (!isDiggable(next) && digger.fuel >= fuelForMove) {
		renderCargo()
		current.classList.remove('b999')
		next.classList.add('b999')
		moveDirection(current, next, direction)
		camFollow()
		if(digger.posY > 0) {
			digger.decreaseFuel(fuelForMove)
			renderFuel()
		}
		clearDarkness(digger.posX, digger.posY, digger.visionRadius)
		renderDepth()
	} else if (!digger.isFullHold() && digger.fuel >= fuelForDig) {
		dig(current, next)
		current.classList.remove('b999')
		next.classList.add('b999')
		moveDirection(current, next, direction)
		camFollow()
		if(digger.posY > 0) {
			digger.decreaseFuel(fuelForDig)
			renderFuel()
		}
		clearDarkness(digger.posX, digger.posY, digger.visionRadius)
		renderDepth()
	} else {
		preventMove(direction)
		if (digger.fuel < fuelForMove) {
			outOfFuel()
		}
	}
}

export function camFollow() {
	const drill = document.querySelector('.b999')
	drill.scrollIntoView({block: "center",inline: "center", behavior: "smooth"})
	// window.scrollTo(document.querySelector('.b999').offsetLeft - window.visualViewport.width / 2 + 25, document.querySelector('.b999').offsetTop - window.visualViewport.height / 2 + 25)
}

function preventMove(direction) {
	switch (direction) {
		case 'up':
			++digger.posY
		break
		case 'left':
			++digger.posX
		break
		case 'down':
			--digger.posY
		break
		case 'right':
			--digger.posX
		break
	}
}

function moveDirection(current, next, direction) {
	if (digger.posY > 0){
		switch (direction) {
			case 'up':
				current.style.backgroundImage = ''
				next.style.backgroundImage = "url(./img/drillU.png)"
			break
			case 'left':
				current.style.backgroundImage = ''
				next.style.backgroundImage = "url(./img/drillL.png)"
			break
			case 'down':
				current.style.backgroundImage = ''
				next.style.backgroundImage = "url(./img/drillD.png)"
			break
			case 'right':
				current.style.backgroundImage = ''
				next.style.backgroundImage = "url(./img/drillR.png)"
			break
		}
	} else if(direction == 'right') {
		current.style.backgroundImage = ''
		next.style.backgroundImage = "url(./img/drillGroundR.png)"
	} else {
		current.style.backgroundImage = ''
		next.style.backgroundImage = "url(./img/drillGroundL.png)"
	}
}

export function teleportTo(x, y) {
	const current = game.querySelector(`.y${digger.posY}x${digger.posX}`)
	const next = game.querySelector(`.y${y}x${x}`)

	digger.posX = x
	digger.posY = y

	current.classList.remove('b999')
	next.classList.add('b999')

	moveDirection(current, next, 'left')
	camFollow()
	if (digger.posY >= digger.visionRadius) {
		next.removeAttribute('style')
		clearDarkness(digger.posX, digger.posY, digger.visionRadius)
	}
}

export function outOfFuel() {
	window.removeEventListener('keydown', listenerHandler)
	const outOfFuelBlock = document.querySelector('.out-of-fuel')
	const cancelBtn = outOfFuelBlock.querySelector('.out-of-fuel__cancel')
	const buyOneFuel = outOfFuelBlock.querySelector('.buy-one-fuel')
	const toSurface = outOfFuelBlock.querySelector('.to-surface')

	outOfFuelBlock.style.display = 'block'

	buyOneFuel.innerText = `Buy one fuel: ${oneFuelCost * 4}$`
	toSurface.innerText = `Onto the surface: ${digger.posY * 3}$`


	cancelBtn.addEventListener('click', hideMenu)
	buyOneFuel.addEventListener('click', buyFuel)
	toSurface.addEventListener('click', goToSurface)

	function hideMenu() {
		outOfFuelBlock.style.display = 'none'
		cancelBtn.removeEventListener('click', hideMenu)
		buyOneFuel.removeEventListener('click', buyFuel)
		toSurface.removeEventListener('click', goToSurface)
		window.addEventListener('keydown', listenerHandler)
	}

	function buyFuel() {
		if (digger.money >= oneFuelCost * 4) {
			digger.decreaseMoney(oneFuelCost * 4)
			digger.increaseFuel(1)
			renderFuel()
			renderMoney()
		}
	}

	function goToSurface() {
		hideMenu()
		if (digger.money >= digger.posY * 3) {
			digger.increaseFuel(fuelForMove)
			renderFuel()
			digger.decreaseMoney(digger.posY * 3)
			renderMoney()
			teleportTo(11, 0)
		}
	}
}
