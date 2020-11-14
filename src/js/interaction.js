import {posX, posY, listenerHandler} from './movement'
import {showShopMenu} from './stations/shop_sell'
import {showFuelMenu} from './stations/fuel'
import {showUpgradeMenu} from './stations/upgrade'


export function interact() {
	const current = game.querySelector(`.y${posY}x${posX}`)

	if (current.classList.contains('y0x10')) {
		showShopMenu()
		window.removeEventListener('keydown', listenerHandler)
	} else if (current.classList.contains('y0x11')) {
		showFuelMenu()
		window.removeEventListener('keydown', listenerHandler)
	} else if (current.classList.contains('y0x9')) {
		showUpgradeMenu()
		window.removeEventListener('keydown', listenerHandler)
  }
}
