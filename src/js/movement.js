import {gameField} from './map-genertor'
import {dig, isDiggable, isFullStorage} from './digging'
import {renderFuel} from './render'
import {interact} from './interaction'

export let posX = 12
export let posY = 0

const game = document.getElementById('game')

export let fuel = 40
export function increaseFuel(value) {
	fuel += value
}

export let maxFuel = 40
export function increaseMaxFuel(value) {
	maxFuel =+ value
}

let current = game.querySelector(`.y${posY}x${posX}`)

window.addEventListener('keydown', (ev) => {
	switch (ev.keyCode) {
		case 87:
			moveY(-1)
			break
		case 65:
			moveX(-1)
			break
		case 83:
			moveY(1)
			break
		case 68:
			moveX(1)
			break
		case 69:
			interact()
			break
	}
})

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
	if (!isDiggable(next) && fuel >= 1) {
		current.classList.remove('b999')
		next.classList.add('b999')
		moveDirection(current, next, direction)
		camFollow()
		if(posY > 0) {
			fuel--
			renderFuel(fuel, maxFuel, posY)
		}
	} else if (!isFullStorage() && fuel >=2) {
		dig(current, next)
		current.classList.remove('b999')
		next.classList.add('b999')
		moveDirection(current, next, direction)
		camFollow()
		if(posY > 0) {
			fuel -= 2
			renderFuel(fuel, maxFuel, posY)
		}
	} else {
		preventMove(direction)
		if (fuel <= 0) {
			// gameOver()
		}
	}
}

function camFollow() {
	window.scrollTo(document.querySelector('.b999').offsetLeft - window.visualViewport.width / 2 + 25, document.querySelector('.b999').offsetTop - window.visualViewport.height / 2 + 25)
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
