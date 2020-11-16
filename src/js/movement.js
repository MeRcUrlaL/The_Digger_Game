import {gameField} from './map-genertor'
import {dig, isDiggable, isFullStorage} from './digging'
import {renderFuel, renderDepth, clearDarkness, renderMoney} from './render'
import {interact} from './interaction'
import {decreaseMoney, money} from './stations/shop_sell'
import {oneFuelCost} from './stations/fuel'

export const fuelForMove = 0.5
export const fuelForDig = 2

export let speed = 1000

export function increaseSpeed(value) {
	speed += value
}

const game = document.getElementById('game')

let visionRadius = 1
export function increaseVision(value) {
	visionRadius += value
}

export let posX = 12
export let posY = 0

export let fuel = 40
export function increaseFuel(value) {
	fuel += value
}

export let maxFuel = 40
export function increaseMaxFuel(value) {
	maxFuel += value
}

let current = game.querySelector(`.y${posY}x${posX}`)
let timer

function timeOut(timeout) {
	timer = setTimeout(() => timer = clearTimeout(timer), timeout)
}

window.addEventListener('keydown', listenerHandler)

export function listenerHandler (ev) {
	if (!timer && ev.keyCode == '87') {
		moveY(-1)
		timeOut(1500 - speed)
	} else if (!timer && ev.keyCode == '65') {
		moveX(-1)
		timeOut(1500 - speed)
	} else if (!timer && ev.keyCode == '83') {
		moveY(1)
		timeOut(1500 - speed)
	} else if (!timer && ev.keyCode == '68') {
		moveX(1)
		timeOut(1500 - speed)
	} else if (ev.keyCode == '69') {
		interact()
	}
}

function moveX(direction) {
	current = game.querySelector(`.y${posY}x${posX}`)

	if (direction > 0 && posX < gameField[0].length - 1) {
		let next = game.querySelector(`.y${posY}x${++posX}`)
		move(current, next, 'right')
	} else if(direction < 0 && posX > 0) {
		let next = game.querySelector(`.y${posY}x${--posX}`)
		move(current, next, 'left')
	}
}

function moveY(direction) {
	current = game.querySelector(`.y${posY}x${posX}`)

	if (direction > 0 && posY < gameField.length - 1) {
		let next = game.querySelector(`.y${++posY}x${posX}`)
		move(current, next, 'down')
	} else if(direction < 0 && posY > 0) {
		let next = game.querySelector(`.y${--posY}x${posX}`)
		move(current, next, 'up')
	}
}

function move(current, next, direction) {
	if (!isDiggable(next) && fuel >= fuelForMove) {
		current.classList.remove('b999')
		next.classList.add('b999')
		moveDirection(current, next, direction)
		camFollow()
		if(posY > 0) {
			fuel -= fuelForMove
			renderFuel(fuel, maxFuel, posY)
		}
		clearDarkness(posX, posY, visionRadius)
		renderDepth(posY)
	} else if (!isFullStorage() && fuel >= fuelForDig) {
		dig(current, next)
		current.classList.remove('b999')
		next.classList.add('b999')
		moveDirection(current, next, direction)
		camFollow()
		if(posY > 0) {
			fuel -= fuelForDig
			renderFuel(fuel, maxFuel, posY)
		}
		clearDarkness(posX, posY, visionRadius)
		renderDepth(posY)
	} else {
		preventMove(direction)
		if (fuel < fuelForMove) {
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
			++posY
		break
		case 'left':
			++posX
		break
		case 'down':
			--posY
		break
		case 'right':
			--posX
		break
	}
}

function moveDirection(current, next, direction) {
	if (posY > 0){
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
	const current = game.querySelector(`.y${posY}x${posX}`)
	const next = game.querySelector(`.y${y}x${x}`)

	posX = x
	posY = y

	current.classList.remove('b999')
	next.classList.add('b999')

	moveDirection(current, next, 'left')
	camFollow()
	if (posY >= visionRadius) {
		next.removeAttribute('style')
		clearDarkness(posX, posY, visionRadius)
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
	toSurface.innerText = `Onto the surface: ${posY * 3}$`


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
		if (money >= oneFuelCost * 4) {
			decreaseMoney(oneFuelCost * 4)
			increaseFuel(1)
			renderFuel(fuel, maxFuel, posY)
			renderMoney(money)
		}
	}

	function goToSurface() {
		hideMenu()
		if (money >= posY * 3) {
			increaseFuel(fuelForMove)
			renderFuel(fuel, maxFuel)
			decreaseMoney(posY * 3)
			renderMoney(money)
			teleportTo(11, 0)
		}
	}
}
