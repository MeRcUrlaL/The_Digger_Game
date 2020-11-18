import {fuelForMove, listenerHandler, visionRadius, digger} from './movement'
import {saveGame} from './saving'



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

export function renderLightOnLoad(gameField) {
	for (let y = 1; y < gameField.length; y++) {
		for (let x = 0; x < gameField[y].length; x++) {
			if (gameField[y][x] == 0) {
				clearDarkness(x, y, visionRadius)
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

export function openMenu() {
	const menuSettingsBtn = document.querySelector('.settings')
	const menuSaveBtn = document.querySelector('.save')
	const menu = document.querySelector('.menu')
	const cancelButton = menu.querySelector('.menu__cancel')
	
  menu.style.display = 'block'

	cancelButton.addEventListener('click', hideMenu)
	menuSaveBtn .addEventListener('click', saveGame)
	window.removeEventListener('keydown', listenerHandler)

  function hideMenu() {
    menu.style.display = 'none'
		cancelButton.removeEventListener('click', hideMenu)
		menuSaveBtn.removeEventListener('click', saveGame)
		window.addEventListener('keydown', listenerHandler)
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
