import {fuelForMove} from './movement'

export function renderOres(gameField) {
	const game = document.getElementById('game')

	let line = ''
	let gameHTML = ''

	for (let i = 0; i < gameField.length; i++) {

		line += '<div class="line">'
		for (let j = 0; j < gameField[i].length; j++) {
			line += `<div class="block y${i}x${j} b${gameField[i][j]}" style="filter: brightness(${i < 5 ? 125 - i * 25 : 0}%)"></div>`
		}	
		line += '</div>'

	gameHTML += line
		line = ''
	}
	game.innerHTML = game.innerHTML + gameHTML
}

export function clearDarkness(x, y, radius) {
	for (let i = y - radius; i <= y + radius; i++) {
		for (let j = x - radius; j <= x + radius; j++) {
			const element = game.querySelector(`.y${i}x${j}`);
			if (i != y || j != x) {
				try {
					element.removeAttribute('style')
				} catch (err) {
					//err
				}
			}
		}
	}
}

export function renderObjects(posX, posY) {
	game.querySelector(`.y${posY}x${posX}`).classList.add('b999')
}

export function renderFuel(fuel, maxFuel, posY) {
	const fuelView = document.querySelector('.fuel')
	const alertText = document.querySelector('.alert')

	
	if (fuel / fuelForMove + fuelForMove < posY) {
		fuelView.outerHTML = `<div class="fuel stat-item fuel-danger">Fuel: ${fuel}/${maxFuel}</div>`
		alertText.outerHTML = '<div class="alert" style="color: darkred;">← Not enough fuel to go up</div>'
  } else if (posY > 0 && fuel / fuelForMove - fuelForMove * 15 < posY) {
		fuelView.outerHTML = `<div class="fuel stat-item fuel-warning">Fuel: ${fuel}/${maxFuel}</div>`
		alertText.outerHTML = '<div class="alert">← Fuel is running out!</div>'
  } else {
		fuelView.outerHTML = `<div class="fuel stat-item">Fuel: ${fuel}/${maxFuel}</div>`
		alertText.innerText = ''
	}
}

export function renderStorage(storage, maxStorage) {
	const storageView = document.querySelector('.storage')

  storageView.innerText = `${storage}/${maxStorage}`
}

export function renderMoney(money) {
	const moneyView = document.querySelector('.money')

  moneyView.innerText = `${money}$`
}

export function renderDepth(posY) {
	const  depthView = document.querySelector('.depth')

	depthView.innerText = `Depth: ${posY}`
}
