import {increaseFuel, increaseVision, teleportTo} from './movement'
import {increaseMoney, money} from './stations/shop_sell'
import {increaseMaxStorage, storageAmount, maxStorage} from './digging'
import {renderMoney, renderStorage} from './render'


window.addEventListener('keydown', (ev) => {
	switch (ev.keyCode) {
		case 97:
			increaseFuel(100000)
			break
		case 98:
      increaseMaxStorage(100000)
      renderStorage(storageAmount, maxStorage)
			break
		case 99:
      increaseMoney(100000)
      renderMoney(money)
			break
		case 100:
			increaseVision(1)
			break
		case 101:
			showTeleportMenu()
			break
	}
})

function showTeleportMenu() {
	const teleportMenu = document.querySelector('.teleport')
	const cancelTeleport = document.querySelector('.teleport__cancel')
	const teleportBtn = document.querySelector('.teleport-button')

	teleportMenu.style.display = 'block'

	cancelTeleport.addEventListener('click', hideTeleport)
	teleportBtn.addEventListener('click', teleportToPoint)

	function hideTeleport() {
		teleportMenu.style.display = 'none'
		cancelTeleport.removeEventListener('click', hideTeleport)
		teleportBtn.removeEventListener('click', teleportToPoint)
	}

	function teleportToPoint() {
		const xCoord = teleportMenu.querySelector('.x-coord').value
		const yCoord = teleportMenu.querySelector('.y-coord').value
		hideTeleport()
		teleportTo(+xCoord, +yCoord)
	}
}