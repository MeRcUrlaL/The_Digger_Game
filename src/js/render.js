import {fuelForMove, digger} from './movement'
import {gameField, light} from './map-genertor'


const screenHeight = document.documentElement.clientHeight
const game = document.getElementById('game')


export let startY = digger.posY - Math.ceil(screenHeight / 100 + 4)
export let endY = digger.posY + Math.ceil(screenHeight / 100 + 4) 

console.log(startY, endY)

export function renderOres() {
	let line = ''
	let gameHTML = ''
	startY = digger.posY - Math.ceil(screenHeight / 100 + 4)
	endY = digger.posY + Math.ceil(screenHeight / 100 + 4) 

	for( let y = startY; y <= endY; y++){
		if(y >= 0) {
			line += '<div class="line">'
			for(let x = 0; x < gameField[y].length; x++){
				if (light[y][x]){
					line += `<div class="block y${y}x${x} b${gameField[y][x]}"></div>`
				}else {
					line += `<div class="block y${y}x${x} b${gameField[y][x]}" style="filter: brightness(${y < 5 ? 125 - y * 25 : 0}%)"></div>`
				}
			}
			line += '</div>'
			gameHTML += line
			line = ''
		}
	}
	game.innerHTML = gameHTML
	endY++
}

export function renderDown() {
	if(startY >= 0){
		// console.log('removedDown ' + startY)
		// document.querySelector(`.y${startY}x0`).parentElement.remove()
		game.firstChild.remove()
	}
	startY++

	if(endY < gameField.length){
		let line = ''
		for(let x = 0; x < gameField[endY].length; x++){
			if (light[endY][x]){
				line += `<div class="block y${endY}x${x} b${gameField[endY][x]}"></div>`
			}else {
				line += `<div class="block y${endY}x${x} b${gameField[endY][x]}" style="filter: brightness(${endY < 5 ? 125 - endY * 25 : 0}%)"></div>`
			}
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
		// console.log('removedUp ' + endY)
		// document.querySelector(`.y${endY}x0`).parentElement.remove()
		game.lastChild.remove()
	}

	startY--
	if(startY >= 0){
		let line = ''
		for(let x = 0; x < gameField[startY].length; x++){
			if (light[startY][x]){
				line += `<div class="block y${startY}x${x} b${gameField[startY][x]}"></div>`
			} else {
				line += `<div class="block y${startY}x${x} b${gameField[startY][x]}" style="filter: brightness(${startY < 5 ? 125 - startY * 25 : 0}%)"></div>`
			}
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

export function renderBuildings(buildings) {
	const listElement = document.querySelector('.build-list')
	listElement.innerHTML = ''
	let count = 0

	for(let i = 0; i < buildings.length; i++){
		let resources = ''
		for(let ore in buildings[i].resources){
			resources += `${ore}: ${buildings[i].resources[ore]}<br>`
		}
		if(buildings[i].built != true){
			count++
			listElement.innerHTML += `<div class="build-item ${buildings[i].name}-build" style="background-image: url(${buildings[i].imageURL});"><span class="upgrade-title">${buildings[i].title}</span><span class="cost${i}">Cost: ${buildings[i].cost}$</span> <span class="inc${i}">Resources: ${resources}</span></div>`
		}
	}
	if (count == 0){
		listElement.innerHTML = '<div class="header">All buildings are built</div>'
	}
}

export function clearDarkness(x, y, radius) {
	for (let i = y - radius; i <= y + radius; i++) {
		for (let j = x - radius; j <= x + radius; j++) {
			const element = game.querySelector(`.y${i}x${j}`);
			try {
				element.style.filter = ''
				light[i][j] = 1
			} catch (err) {
				//light out of map border
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
