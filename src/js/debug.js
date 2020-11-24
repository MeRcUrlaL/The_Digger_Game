import {teleportTo, digger} from './movement'
import {renderMoney, renderCargo, renderFuel, renderOres} from './render'



window.addEventListener('keydown', (ev) => {
	switch (ev.keyCode) {
		case 97:
			digger.increaseFuel(100000)
			renderFuel()
			break
		case 98:
      digger.increaseMaxCargo(100000)
      renderCargo()
			break
		case 99:
      digger.increaseMoney(100000)
      renderMoney()
			break
		case 100:
			digger.increaseVision(1)
			break
		case 101:
			showTeleportMenu()
			break
		case 102:
			digger.increaseSpeed(100)
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