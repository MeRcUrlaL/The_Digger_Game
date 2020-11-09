// (function () {

const game = document.getElementById('game')
const storageView = document.querySelector('.storage')
const moneyView = document.querySelector('.money')
const fuelView =document.querySelector('.fuel')
const shop = document.querySelector('.shop')
const fuelStation = document.querySelector('.fuel-station')
const upgradeStation = document.querySelector('.upgrade-station')
const oneFuelCost = 0.5
let money = 0
let moneyFromSelling = 0
let fuel = 40
let maxFuel = 40
let storage = {
	dirt: 0,
	stone: 0,
	copper: 0,
	tin: 0,
	iron: 0,
	coal: 0,
}
let storageAmount = 0
let maxStorage = 10
let gameField = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
]
let line = ''
let gameHTML = ''
let posX = 12
let posY = 0
let current = game.querySelector(`.y${posY}x${posX}`)


//temp
// game.addEventListener('click', (ev) => {
// 	ev.target.classList.add('b1')
// })

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

function move(current, next, direction) {
	if (!isDiggable(next) && fuel >= 1) {
		current.classList.remove('b999')
		next.classList.add('b999')
    moveDirection(current, next, direction)
    camFollow()
    if(posY > 0) {
      fuel--
      renderFuel()
    }
	} else if (!isFullStorage() && fuel >=2) {
		dig(current, next)
		current.classList.remove('b999')
		next.classList.add('b999')
    moveDirection(current, next, direction)
    camFollow()
    if(posY > 0) {
      fuel -= 2
      renderFuel()
    }
	} else {
    preventMove(direction)
    if (fuel <= 0) {
      // gameOver()
    }
	}
}

function renderFuel() {
  if (fuel > posY - fuel / 10){
    fuelView.innerHTML = `<progress class="fuel-prog" value="${fuel}" max="${maxFuel}">Fuel</progress>`
  } else if (fuel >= posY) {
    fuelView.innerHTML = `<progress class="fuel-prog-warning" value="${fuel}" max="${maxFuel}">Low fuel</progress>`
  } else {
    fuelView.innerHTML = `<progress class="fuel-prog-danger" value="${fuel}" max="${maxFuel}">Not enough fuel</progress>`
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

function dig(current, next) {
	switch (next.classList[2]) {
		case 'b2':
      storage.dirt += 1
      moneyFromSelling += 1
			break
		case 'b3':
      storage.stone += 1
      moneyFromSelling += 3
				break
		case 'b4':
      storage.coal += 1
      moneyFromSelling += 5
			break
		case 'b5':
      storage.copper += 1
      moneyFromSelling += 6
			break
		case 'b6':
      storage.tin += 1
      moneyFromSelling += 6
			break
		case 'b7':
      storage.iron += 1
      moneyFromSelling += 7
			break
	}
	next.className = `block y${posY}x${posX} b0`
	++storageAmount
	
	renderStorage()
}

function isDiggable(next) {
	if(next.classList.contains('b0') || next.classList.contains('b1')) {
		return false
	}
	return true
}

function isFullStorage() {
	if (storageAmount >= maxStorage) {
		return true
	}
	return false
}

function generateMapArray() {
	for (let i = 2; i < 100; i++){ 
		gameField.push([])
		for (let j = 2; j < 42; j++) {
			rnd = parseInt(Math.random() * 5 + 3)
			gameField[i].push(rnd)
		}
	}
}

function interact() {
	current = game.querySelector(`.y${posY}x${posX}`)
	if (current.classList.contains('y0x10')) {
		showShopMenu()
	} else if (current.classList.contains('y0x11')) {
		showFuelMenu()
	} else if (current.classList.contains('y0x9')) {
    showUpgradeMenu()
  }
}

function showUpgradeMenu() {
  const cancelButton = upgradeStation.querySelector('.upgrade__cancel')
  upgradeStation.style.display = 'block'

  cancelButton.addEventListener('click', hideUpgradeMenu)

  function hideUpgradeMenu() {
    upgradeStation.style.display = 'none'
    cancelButton.removeEventListener('click', hideUpgradeMenu)
  }
}

function showFuelMenu() {
  let fuelRequired = maxFuel - fuel
  renderFuelCost()
  fuelStation.style.display = 'block'
  const cancelButton = fuelStation.querySelector('.fuel__cancel')
  const buyOneFuelButton = fuelStation.querySelector('.buy-piece-fuel')
  const buyFullTankButton = fuelStation.querySelector('.buy-fuel')

  cancelButton.addEventListener('click', hideFuelMenu)
  buyOneFuelButton.addEventListener('click', buyOneFuel)
  buyFullTankButton.addEventListener('click', buyFullTank)

  function buyOneFuel() {
    if (money >= oneFuelCost && fuelRequired > 0) {
      ++fuel
      money -= oneFuelCost
    }
    renderFuel()
    renderFuelCost()
  }

  function buyFullTank() {
    if (money >= fuelRequired * oneFuelCost && fuelRequired > 0) {
      fuel += fuelRequired
      money -= fuelRequired * oneFuelCost
    }
    renderFuel()
    renderFuelCost()
    hideFuelMenu()
  }
  
  function hideFuelMenu() {
    fuelStation.style.display = 'none'
    cancelButton.removeEventListener('click', hideFuelMenu)
    buyOneFuelButton.removeEventListener('click', buyOneFuel)
    buyFullTankButton.removeEventListener('click', buyFullTank)
  }

  function renderFuelCost() {
    const fuelCost = fuelStation.querySelector('.fuel-cost')
    fuelRequired = maxFuel - fuel
    renderMoney()
    fuelCost.innerText = `fuel cost: ${fuelRequired * oneFuelCost}$`
  }
}

function showShopMenu() {
  renderCountOfOres()
  shop.style.display = 'block'
  const cancelButton = shop.querySelector('.shop__cancel')
  const sellButton = shop.querySelector('.shop__sell')

  cancelButton.addEventListener('click', hideShopMenu)
  sellButton.addEventListener('click', sellOres)
  shop.querySelector('.shop__info').innerText = `Sell for: ${moneyFromSelling}$`
  
  function sellOres() {
    money += moneyFromSelling
    renderMoney()
  
    moneyFromSelling = 0
    shop.querySelector('.shop__info').innerText = `Sell for: ${moneyFromSelling}$`
  
    storageAmount = 0
    renderStorage()
    hideShopMenu()
    clearCountOfOres()
  }
  
  function hideShopMenu() {
    shop.style.display = 'none'
    cancelButton.removeEventListener('click', hideShopMenu)
    sellButton.removeEventListener('click', sellOres)
  }
}

function renderStorage() {
  storageView.innerText = `${storageAmount}/${maxStorage}`
}

function renderMoney() {
  moneyView.innerText = `${money}$`
}

function renderCountOfOres() {
  let oreList = ''
  for (const ore in storage) {
    if (storage[ore] > 0) {
      oreList += `<div><div  class="shop__element ${ore}"><span>${ore}: ${storage[ore]}</span></div></div>`
    }
  }
  shop.querySelector('.shop__container').innerHTML = oreList
}

function clearCountOfOres() {
  for (const ore in storage) {
    if (storage[ore] > 0) {
      storage[ore] = 0
    }
  }
}

function renderOres() {
	for (let i = 0; i < gameField.length; i++) {

		line += '<div class="line">'
		for (let j = 0; j < gameField[i].length; j++) {
			line += `<div class="block y${i}x${j} b${gameField[i][j]}"></div>`
		}	
		line += '</div>'

		gameHTML += line
		line = ''
	}
}

function generateObjects() {
  game.querySelector(`.y${posY}x${posX}`).classList.add('b999')
}

function generateMap() {
	generateMapArray()
	renderOres()
	game.innerHTML = game.innerHTML + gameHTML
  generateObjects()
  renderFuel()
  renderStorage()
  renderMoney()
}

generateMap()



// })()
