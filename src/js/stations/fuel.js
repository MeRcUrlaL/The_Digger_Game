import {listenerHandler, digger} from '../movement'
import {renderMoney, renderFuel} from '../render'


export const oneFuelCost = 0.5
const fuelStation = document.querySelector('.fuel-station')

export function showFuelMenu() {
	let fuelRequired = digger.maxFuel - digger.fuel
	renderFuelCost()
	fuelStation.style.display = 'block'
	const cancelButton = fuelStation.querySelector('.fuel__cancel')
	const buyOneFuelButton = fuelStation.querySelector('.buy-piece-fuel')
	const buyFullTankButton = fuelStation.querySelector('.buy-fuel')

	cancelButton.addEventListener('click', hideFuelMenu)
	buyOneFuelButton.addEventListener('click', buyOneFuel)
	buyFullTankButton.addEventListener('click', buyFullTank)

	function buyOneFuel() {
		if (digger.money >= oneFuelCost && fuelRequired > 0) {
			digger.increaseFuel(1)
			digger.decreaseMoney(oneFuelCost)
		}
		renderFuel()
		renderMoney()
		renderFuelCost()
	}

	function buyFullTank() {
		if (digger.money >= fuelRequired * oneFuelCost && fuelRequired > 0) {
			digger.increaseFuel(fuelRequired)
			digger.decreaseMoney(fuelRequired * oneFuelCost)
		}
		renderFuel()
		renderMoney()
		hideFuelMenu()
	}
	
	function hideFuelMenu() {
		fuelStation.style.display = 'none'
		cancelButton.removeEventListener('click', hideFuelMenu)
		buyOneFuelButton.removeEventListener('click', buyOneFuel)
		buyFullTankButton.removeEventListener('click', buyFullTank)
		window.addEventListener('keydown', listenerHandler)
	}

	function renderFuelCost() {
		const fuelCost = fuelStation.querySelector('.fuel-cost')
		fuelRequired = digger.maxFuel - digger.fuel
		renderMoney()
		fuelCost.innerText = `fuel cost: ${fuelRequired * oneFuelCost}$`
	}
}
