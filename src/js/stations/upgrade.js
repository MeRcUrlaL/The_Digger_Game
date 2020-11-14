import {increaseMaxFuel, fuel, maxFuel, listenerHandler} from '../movement'
import {money, decreaseMoney} from './shop_sell'
import {renderStorage, renderFuel, renderMoney} from '../render'
import {increaseMaxStorage, storageAmount, maxStorage} from '../digging'

const upgradeStation = document.querySelector('.upgrade-station')
const tankUpgradeBtn = document.querySelector('.upgrade-tank')
const storageUpgradeBtn = document.querySelector('.upgrade-storage')

let fuelLevel = 1
let storageLevel = 1


export function showUpgradeMenu() {
	const cancelButton = upgradeStation.querySelector('.upgrade__cancel')

	upgradeStation.style.display = 'block'

	cancelButton.addEventListener('click', hideUpgradeMenu)
	tankUpgradeBtn.addEventListener('click', upgradeTank)
	storageUpgradeBtn.addEventListener('click', upgradeStorage)

	function hideUpgradeMenu() {
		upgradeStation.style.display = 'none'
		cancelButton.removeEventListener('click', hideUpgradeMenu)
		tankUpgradeBtn.removeEventListener('click', upgradeTank)
		storageUpgradeBtn.removeEventListener('click', upgradeStorage)
		window.addEventListener('keydown', listenerHandler)
	}

	function upgradeTank() {
		const upgradeTankCost = document.querySelector('.cost1')
		const upgradeTankIncrease = document.querySelector('.inc1')

		const requiredMoney = 90 * fuelLevel
		const increaseAmount = 50 + 10 * fuelLevel


		upgradeTankCost.innerText = `Cost: ${requiredMoney}$`
		upgradeTankIncrease.innerText = `Increase: ${increaseAmount}`
		if (money >= requiredMoney) {
			decreaseMoney(requiredMoney)
			increaseMaxFuel(increaseAmount)
			renderFuel(fuel, maxFuel)
			renderMoney(money)
			++fuelLevel
		}
	}

	function upgradeStorage() {
		const upgradeStorageCost = document.querySelector('.cost2')
		const upgradeStorageIncrease = document.querySelector('.inc2')

		
		const requiredMoney = 90 * storageLevel - 20
		const increaseAmount = 20 + 10 * storageLevel

		upgradeStorageCost.innerText = `Cost: ${requiredMoney}$`
		upgradeStorageIncrease.innerText = `Increase: ${increaseAmount}`

		if (money >= requiredMoney) {
			decreaseMoney(requiredMoney)
			increaseMaxStorage(increaseAmount)
			renderStorage(storageAmount, maxStorage)
			renderMoney(money)
			storageLevel++
		}
	}
}
