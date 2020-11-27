import {listenerHandler, digger} from './movement'
import {showShopMenu} from './stations/shop_sell'
import {showFuelMenu} from './stations/fuel'
import {showUpgradeMenu} from './stations/upgrade'
import {showBuildMenu, buildings} from './stations/build'
import {showFactoryMenu} from './stations/factory'



export function interact() {
	if(digger.posY == 0){
		if (digger.posX == 10) {
			showShopMenu()
			window.removeEventListener('keydown', listenerHandler)
		} else if (digger.posX == 11) {
			showFuelMenu()
			window.removeEventListener('keydown', listenerHandler)
		} else if (digger.posX == 9) {
			showUpgradeMenu()
			window.removeEventListener('keydown', listenerHandler)
		} else if (digger.posX == 16) {
			showBuildMenu()
		} else if ((digger.posX == 18 || digger.posX == 19) && digger.buildings[buildings[0].name]) {
			showFactoryMenu()
		}
	}
}
