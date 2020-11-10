import {increaseFuel} from './movement'
import {increaseMoney, money} from './stations/shop_sell'
import {increaseMaxStorage, storageAmount} from './digging'
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
	}
})