import {fuelForMove, digger} from './movement'
import {gameField} from './map-genertor'


const screenHeight = document.documentElement.clientHeight
const game = document.getElementById('game')


let startY = digger.posY - Math.ceil(screenHeight / 100 + 7)
let endY = digger.posY + Math.ceil(screenHeight / 100 + 7) 

console.log(startY, endY)

export function renderOres(gameField) {
	// const game = document.getElementById('game')

	// let line = ''
	// let gameHTML = ''

	// for (let i = 0; i < gameField.length; i++) {

	// 	line += '<div class="line">'
	// 	for (let j = 0; j < gameField[i].length; j++) {
	// 		line += `<div class="block y${i}x${j} b${gameField[i][j]}" style="filter: brightness(${i < 5 ? 125 - i * 25 : 0}%)"></div>`
	// 	}	
	// 	line += '</div>'

	// 	gameHTML += line
	// 	line = ''
	// }
	// game.innerHTML = game.innerHTML + gameHTML
	let line = ''
	let gameHTML = ''

	for( let y = startY; y <= endY; y++){
		if(y >= 0) {
			line += '<div class="line">'
			for(let x = 0; x < gameField[y].length; x++){
				line += `<div class="block y${y}x${x} b${gameField[y][x]}" style="filter: brightness(${y < 5 ? 125 - y * 25 : 0}%)"></div>`
			}
			line += '</div>'
			gameHTML += line
			line = ''
		}
	}
	game.innerHTML = gameHTML
	startY--
	endY++
}

export function renderDown() {
	if(startY >= 0){
		// document.querySelector(`.y${startY}x0`).parentElement.remove()
		game.firstChild.remove()
	}
	startY++

	if(endY < gameField.length){
		let line = ''
		for(let x = 0; x < gameField[endY].length; x++){
			// if (gameField[endY][x + 1] != 0 && gameField[endY][x - 1] != 0){
				line += `<div class="block y${endY}x${x} b${gameField[endY][x]}" style="filter: brightness(${endY < 5 ? 125 - endY * 25 : 0}%)"></div>`
			// } else {
			// 	line += `<div class="block y${endY}x${x} b${gameField[endY][x]}"></div>`
			// }
		}

		const lastEl = document.createElement('div')
		lastEl.classList.add('line')
		lastEl.innerHTML = line
		game.appendChild(lastEl)
	}
	endY++
}

export function renderUp() {
	endY--

	if(endY < gameField.length){
		// document.querySelector(`.y${endY}x0`).parentElement.remove()
		game.lastChild.remove()
	}

	startY--
	if(startY >= 0){
		let line = ''
		for(let x = 0; x < gameField[startY].length; x++){
			// if (gameField[startY][x + 1] != 0 && gameField[startY][x - 1] != 0){
				line += `<div class="block y${startY}x${x} b${gameField[startY][x]}" style="filter: brightness(${startY < 5 ? 125 - startY * 25 : 0}%)"></div>`
			// } else {
			// 	line += `<div class="block y${startY}x${x} b${gameField[startY][x]}"></div>`
			// }
		}


		const firstEl = document.createElement('div')
		firstEl.classList.add('line')
		firstEl.innerHTML = line

		game.insertBefore(firstEl, game.firstChild)
	}
}

export function renderUpgrades(upgradeList) {
	const listElement = document.querySelector('.upgrade-list')
	listElement.innerHTML = ''

	for(let i = 0; i < upgradeList.length; i ++) {
		listElement.innerHTML += `<div class="upgrade-item ${upgradeList[i].name}-upgrade" style="background-image: url(${upgradeList[i].imageURL});"><span class="upgrade-title">${upgradeList[i].title}</span><span class="cost${i}">Cost: ${upgradeList[i].cost}$</span> <span class="inc${i}">Increase: ${upgradeList[i].increase}</span></div>`
	}
}

export function updateUpgradeItems(upgradeList) {
	for(let i = 0; i < upgradeList.length; i++){
		const itemCost = document.querySelector(`.cost${i}`)
		const itemIncrease = document.querySelector(`.inc${i}`)

		itemCost.innerText = `Cost: ${upgradeList[i].cost}$`
		itemIncrease.innerText = `Increase: ${upgradeList[i].increase}`
	}
}

export function clearDarkness(x, y, radius) {
	for (let i = y - radius; i <= y + radius; i++) {
		for (let j = x - radius; j <= x + radius; j++) {
			const element = game.querySelector(`.y${i}x${j}`);
			try {
				element.style.filter = ''
			} catch (err) {
				//light out of map border
			}
		}
	}
}

export function renderLightOnLoad(gameField) {
	for (let y = 1; y < gameField.length; y++) {
		for (let x = 0; x < gameField[y].length; x++) {
			if (gameField[y][x] == 0) {
				clearDarkness(x, y, digger.visionRadius)
			}
		}
	}
}

export function renderObjects() {
	// if (digger.posY > 0) {
	// 	const dgr = game.querySelector(`.y${digger.posY}x${digger.posX}`)
	// 	dgr.style.backgroundImage = "url(./img/drillU.png)"
	// 	console.log(dgr)
	// 	dgr.classList.add('b999')
	// 	console.log(dgr)
	// } else {
	game.querySelector(`.y${digger.posY}x${digger.posX}`).classList.add('b999')
}

export function renderFuel() {
	const fuelView = document.querySelector('.fuel')
	const alertText = document.querySelector('.alert')

	
	if (digger.fuel / fuelForMove + fuelForMove < digger.posY) {
		fuelView.outerHTML = `<div class="fuel stat-item fuel-danger">Fuel: ${digger.fuel}/${digger.maxFuel}</div>`
		alertText.outerHTML = '<div class="alert" style="color: darkred;">← Not enough fuel to go up</div>'
  } else if (digger.posY > 0 && digger.fuel / fuelForMove - fuelForMove * 15 < digger.posY) {
		fuelView.outerHTML = `<div class="fuel stat-item fuel-warning">Fuel: ${digger.fuel}/${digger.maxFuel}</div>`
		alertText.outerHTML = '<div class="alert">← Fuel is running out!</div>'
  } else {
		fuelView.outerHTML = `<div class="fuel stat-item">Fuel: ${digger.fuel}/${digger.maxFuel}</div>`
		alertText.innerText = ''
	}
}

export function renderCargo() {
	const cargoView = document.querySelector('.cargo')

  cargoView.innerText = `${digger.cargo}/${digger.maxCargo}`
}

export function renderMoney() {
	const moneyView = document.querySelector('.money')

  moneyView.innerText = `${digger.money}$`
}

export function renderDepth() {
	const  depthView = document.querySelector('.depth')

	depthView.innerText = `Depth: ${digger.posY}`
}

export function renderSpeed() {
	const speedView = document.querySelector('.speed')

	speedView.innerText = `Speed: ${digger.speed}`
}
