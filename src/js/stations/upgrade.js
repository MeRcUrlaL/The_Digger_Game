import {increaseMaxFuel, fuel, maxFuel} from '../movement'
import {money, decreaseMoney} from './shop_sell'
import {renderStorage, renderFuel, renderMoney} from '../render'
import {increaseMaxStorage, storageAmount, maxStorage} from '../digging'

const upgradeStation = document.querySelector('.upgrade-station')
let fuelLevel = 1
let storageLevel = 1

export function showUpgradeMenu() {
	const cancelButton = upgradeStation.querySelector('.upgrade__cancel')
	const upTankBtn = upgradeStation.querySelector('.upgrade-tank')
	const upStorageBtn = upgradeStation.querySelector('.upgrade-storage')

	upgradeStation.style.display = 'block'

	cancelButton.addEventListener('click', hideUpgradeMenu)
	upTankBtn.addEventListener('click', upgradeTank)
	upStorageBtn.addEventListener('click', upgradeStorage)

	function hideUpgradeMenu() {
		upgradeStation.style.display = 'none'
		cancelButton.removeEventListener('click', hideUpgradeMenu)
		upTankBtn.removeEventListener('click', upgradeTank)
		upStorageBtn.removeEventListener('click', upgradeStorage)
	}

	function upgradeTank() {
		const requiredMoney = 90 * fuelLevel
		if (money >= requiredMoney) {
			decreaseMoney(requiredMoney)
			increaseMaxFuel(50 + 10 * fuelLevel)
			renderFuel(fuel, maxFuel)
			renderMoney(money)
			fuelLevel++
		}
	}

	function upgradeStorage() {
		const requiredMoney = 90 * storageLevel - 20
		if (money >= requiredMoney) {
			decreaseMoney(requiredMoney)
			increaseMaxStorage(20 + 10 * storageLevel)
			renderStorage(storageAmount, maxStorage)
			renderMoney(money)
			storageLevel++
		}
	}
}
