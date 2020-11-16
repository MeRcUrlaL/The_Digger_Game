//images
import storageImgSrc from '@/img/upgrade_storage.png'
import tankImgSrc from '@/img/upgrade_fuel.png'
import speedImgSrc from '@/img/upgrade_speed.png'

import {increaseMaxFuel, fuel, maxFuel, listenerHandler, speed, increaseSpeed} from '../movement'
import {money, decreaseMoney} from './shop_sell'
import {renderStorage, renderFuel, renderMoney, renderUpgrades, updateUpgradeItems} from '../render'
import {increaseMaxStorage, storageAmount, maxStorage} from '../digging'


// Array containing upgrades for Upgrade Station
const upgradeList = [{
	name: "tank",
	title: "Tank Upgrade",
	level: 1,
	imageURL: tankImgSrc,
	get cost() {
		return 90 * this.level
	},
	get increase() {
		return 50 + 10 * this.level
	},
	upgrade: function () {
		if (money >= this.cost) {
			decreaseMoney(this.cost)
			increaseMaxFuel(this.increase)
			renderFuel(fuel, maxFuel)
			renderMoney(money)
			this.level++
			updateUpgradeItems(upgradeList)
		}
	} 
},
{
	name: "storage",
	title: "Storage Upgrade",
	level: 1,
	imageURL: storageImgSrc,
	get cost() {
		return 90 * this.level - 20
	},
	get increase() {
		return 10 + 10 * this.level
	},
	upgrade() {
		if (money >= this.cost) {
			decreaseMoney(this.cost)
			increaseMaxStorage(this.increase)
			renderStorage(storageAmount, maxStorage)
			renderMoney(money)
			this.level++
			updateUpgradeItems(upgradeList)
		}
	},
},
{
	name: "speed",
	title: "Speed Upgrade",
	level: 1,
	imageURL: speedImgSrc,
	get cost() {
		return 90 * this.level - 30
	},
	get increase() {
		return 10 * this.level
	},
	upgrade() {
		if (money >= this.cost && speed <= 1350) {
			decreaseMoney(this.cost)
			increaseSpeed(this.increase)
			renderMoney(money)
			this.level++
			updateUpgradeItems(upgradeList)
		}
	}
}]


export function showUpgradeMenu() {
	renderUpgrades(upgradeList)

	const upgradeStation = document.querySelector('.upgrade-station')
	const cancelButton = upgradeStation.querySelector('.upgrade__cancel')

	upgradeStation.addEventListener('click', eventHandler)
	cancelButton.addEventListener('click', hideUpgradeMenu)
	window.removeEventListener('keydown', listenerHandler)

	function eventHandler(ev) {
		if (ev.target.classList.contains('upgrade-item')) {
			const upgradeName = ev.target.classList[1].split('-', 1)[0]
			upgradeList.find(el => el.name === upgradeName).upgrade()
		}
	}

	upgradeStation.style.display = 'block'

	function hideUpgradeMenu() {
		upgradeStation.style.display = 'none'
		upgradeStation.removeEventListener('click', eventHandler)
		window.addEventListener('keydown', listenerHandler)
		cancelButton.removeEventListener('click', hideUpgradeMenu)
	}
}
