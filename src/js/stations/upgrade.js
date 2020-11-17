//images
import hullImgSrc from '@/img/upgrade_hull.png'
import tankImgSrc from '@/img/upgrade_fuel.png'
import speedImgSrc from '@/img/upgrade_speed.png'

import {listenerHandler, digger} from '../movement'
import {renderCargo, renderFuel, renderMoney, renderUpgrades, updateUpgradeItems} from '../render'



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
		if (digger.money >= this.cost) {
			digger.decreaseMoney(this.cost)
			digger.increaseMaxFuel(this.increase)
			renderFuel()
			renderMoney()
			this.level++
			updateUpgradeItems(upgradeList)
		}
	} 
},
{
	name: "hull",
	title: "Hull Upgrade",
	level: 1,
	imageURL: hullImgSrc,
	get cost() {
		return 90 * this.level - 20
	},
	get increase() {
		return 10 + 10 * this.level
	},
	upgrade() {
		if (digger.money >= this.cost) {
			digger.decreaseMoney(this.cost)
			digger.increaseMaxCargo(this.increase)
			renderCargo()
			renderMoney()
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
		if (digger.money >= this.cost && digger.speed <= 1350) {
			digger.decreaseMoney(this.cost)
			digger.increaseSpeed(this.increase)
			renderMoney()
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
