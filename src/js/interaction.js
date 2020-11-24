import {listenerHandler, digger} from './movement'
import {showShopMenu} from './stations/shop_sell'
import {showFuelMenu} from './stations/fuel'
import {showUpgradeMenu} from './stations/upgrade'
import {showBuildMenu, buildings} from './stations/build'
// import {showFactoryMenu} from './stations/factory'



export function interact() {
	const current = game.querySelector(`.y${digger.posY}x${digger.posX}`)

	if (current.classList.contains('y0x10')) {
		showShopMenu()
		window.removeEventListener('keydown', listenerHandler)
	} else if (current.classList.contains('y0x11')) {
		showFuelMenu()
		window.removeEventListener('keydown', listenerHandler)
	} else if (current.classList.contains('y0x9')) {
		showUpgradeMenu()
		window.removeEventListener('keydown', listenerHandler)
  } else if (current.classList.contains('y0x16')) {
		showBuildMenu()
	} else if (current.classList.contains('y0x18') && buildings[0].built) {
		// showFactoryMenu()
	}
}
