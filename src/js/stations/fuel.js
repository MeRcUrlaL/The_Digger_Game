import {money, decreaseMoney} from './shop_sell'
import {fuel, maxFuel, increaseFuel} from '../movement'
import {renderMoney, renderFuel} from '../render'


const oneFuelCost = 0.5
const fuelStation = document.querySelector('.fuel-station')

export function showFuelMenu() {
	let fuelRequired = maxFuel - fuel
	renderFuelCost()
	fuelStation.style.display = 'block'
	const cancelButton = fuelStation.querySelector('.fuel__cancel')
	const buyOneFuelButton = fuelStation.querySelector('.buy-piece-fuel')
	const buyFullTankButton = fuelStation.querySelector('.buy-fuel')

	cancelButton.addEventListener('click', hideFuelMenu)
	buyOneFuelButton.addEventListener('click', buyOneFuel)
	buyFullTankButton.addEventListener('click', buyFullTank)

	function buyOneFuel() {
		if (money >= oneFuelCost && fuelRequired > 0) {
			increaseFuel(1)
			decreaseMoney(oneFuelCost)
		}
		renderFuel(fuel, maxFuel)
		renderFuelCost()
	}

	function buyFullTank() {
		if (money >= fuelRequired * oneFuelCost && fuelRequired > 0) {
			increaseFuel(fuelRequired)
			decreaseMoney(fuelRequired * oneFuelCost)
		}
		renderFuel(fuel, maxFuel)
		renderFuelCost()
		hideFuelMenu()
	}
	
	function hideFuelMenu() {
		fuelStation.style.display = 'none'
		cancelButton.removeEventListener('click', hideFuelMenu)
		buyOneFuelButton.removeEventListener('click', buyOneFuel)
		buyFullTankButton.removeEventListener('click', buyFullTank)
	}

	function renderFuelCost() {
		const fuelCost = fuelStation.querySelector('.fuel-cost')
		fuelRequired = maxFuel - fuel
		renderMoney(money)
		fuelCost.innerText = `fuel cost: ${fuelRequired * oneFuelCost}$`
	}
}
