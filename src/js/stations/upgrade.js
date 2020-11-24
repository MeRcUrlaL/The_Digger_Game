//images
import hullImgSrc from '@/img/upgrade_hull.png'
import tankImgSrc from '@/img/upgrade_fuel.png'
import speedImgSrc from '@/img/upgrade_speed.png'
import radarImgSrc from '@/img/upgrade_radar.png'


import {listenerHandler, digger} from '../movement'
import {renderCargo, renderFuel, renderMoney, renderUpgrades, updateUpgradeItems} from '../render'



// Array containing upgrades for Upgrade Station
const upgradeList = [{
	name: "tank",
	title: "Tank Upgrade",
	imageURL: tankImgSrc,
	get cost() {
		return (10 + Math.floor(digger.maxFuel / 10)) * (3 + Math.floor(digger.maxFuel / 13))
	},
	get increase() {
		return 10 + Math.floor(digger.maxFuel / 10)
	},
	upgrade: function () {
		if (digger.money >= this.cost) {
			digger.decreaseMoney(this.cost)
			digger.increaseMaxFuel(this.increase)
			renderFuel()
			renderMoney()
			updateUpgradeItems(upgradeList)
		}
	} 
},
{
	name: "hull",
	title: "Hull Upgrade",
	imageURL: hullImgSrc,
	get cost() {
		return (5 + Math.floor(digger.maxCargo / 10)) * (7 + Math.floor(digger.maxCargo / 5))
	},
	get increase() {
		return 5 + Math.floor(digger.maxCargo / 20)
	},
	upgrade() {
		if (digger.money >= this.cost) {
			digger.decreaseMoney(this.cost)
			digger.increaseMaxCargo(this.increase)
			renderCargo()
			renderMoney()
			updateUpgradeItems(upgradeList)
		}
	},
},
{
	name: "speed",
	title: "Speed Upgrade",
	imageURL: speedImgSrc,
	get cost() {
		if(digger.speed <= 350) {
			return (10 + Math.floor(digger.speed / 10)) * (1 + Math.floor(digger.speed / 7))
		}
		return '---'
	},
	get increase() {
		if(digger.speed <= 300) {
			return 10 + Math.floor(digger.speed / 5)
		}
		return 'MAX'
	},
	upgrade() {
		if (digger.money >= this.cost && digger.speed <= 300) {
			digger.decreaseMoney(this.cost)
			digger.increaseSpeed(this.increase)
			renderMoney()
			updateUpgradeItems(upgradeList)
		}
	}
},
{
	name: "vision",
	title: "Radar Upgrade",
	imageURL: radarImgSrc,
	get cost() {
		if(digger.visionRadius <= 5) {
			return digger.visionRadius * 500
		}
		return '---'
	},
	get increase() {
		if(digger.visionRadius <= 5) {
			return 1
		}
		return 'MAX'
	},
	upgrade() {
		if (digger.money >= this.cost && digger.visionRadius <= 5) {
			digger.decreaseMoney(this.cost)
			digger.increaseVision(this.increase)
			renderMoney()
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
