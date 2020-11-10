import {posX, posY} from './movement'
import {showShopMenu} from './stations/shop_sell'
import {showFuelMenu} from './stations/fuel'
import {showUpgradeMenu} from './stations/upgrade'


export function interact() {
	let current = game.querySelector(`.y${posY}x${posX}`)

	if (current.classList.contains('y0x10')) {
		showShopMenu()
	} else if (current.classList.contains('y0x11')) {
		showFuelMenu()
	} else if (current.classList.contains('y0x9')) {
	showUpgradeMenu()
  }
}
