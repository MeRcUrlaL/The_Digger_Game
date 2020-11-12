export function renderOres(gameField) {
	const game = document.getElementById('game')

	let line = ''
	let gameHTML = ''

	for (let i = 0; i < gameField.length; i++) {

		line += '<div class="line">'
		for (let j = 0; j < gameField[i].length; j++) {
			line += `<div class="block y${i}x${j} b${gameField[i][j]}" style="filter: brightness(${125 - i * 25}%)"></div>`
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
				element.removeAttribute('style')
			}
		}
	}
}

export function renderObjects(posX, posY) {
	game.querySelector(`.y${posY}x${posX}`).classList.add('b999')
}

export function renderFuel(fuel, maxFuel, posY) {
	const fuelView = document.querySelector('.fuel')

  if (fuel > posY - fuel / 10){
    fuelView.innerHTML = `<progress class="fuel-prog" value="${fuel}" max="${maxFuel}">Fuel</progress>`
  } else if (fuel >= posY) {
    fuelView.innerHTML = `<progress class="fuel-prog-warning" value="${fuel}" max="${maxFuel}">Low fuel</progress>`
  } else {
    fuelView.innerHTML = `<progress class="fuel-prog-danger" value="${fuel}" max="${maxFuel}">Not enough fuel</progress>`
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
