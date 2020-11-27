import {renderMoney, renderCargo} from '../render'
import {listenerHandler, digger} from '../movement'


const shop = document.querySelector('.shop')

export const profitList = [
	{name: 'dirt',profit: 0.5},
	{name: 'stone', profit: 1.5},
	{name: 'coal', profit: 8},
	{name: 'copper', profit: 12},
	{name: 'tin', profit: 14},
	{name: 'iron', profit: 18},
	{name: 'silver', profit: 24},
	{name: 'gold', profit: 28,},
	{name: 'platinum', profit: 50},
	{name: 'steelIngot', profit: 45},
	{name: 'copperIngot', profit: 25},
	{name: 'ironIngot', profit: 35}
]


export function showShopMenu() {
	let profit = 0

	renderCountOfOres()
	
	shop.style.display = 'block'
	const cancelButton = shop.querySelector('.shop__cancel')
	const sellButton = shop.querySelector('.shop__sell')

	cancelButton.addEventListener('click', hideShopMenu)
	sellButton.addEventListener('click', sellOres)
	shop.querySelector('.shop__info').innerText = `Sell for: ${profit}$`
	
	function sellOres() {
		digger.increaseMoney(profit)
		renderMoney()

		digger.clearCargo()
		shop.querySelector('.shop__info').innerText = `Sell for: ${profit}$`
	
		renderCargo()
		hideShopMenu()
		digger.clearStorage()
	}
	
	function hideShopMenu() {
		shop.style.display = 'none'
		cancelButton.removeEventListener('click', hideShopMenu)
		sellButton.removeEventListener('click', sellOres)
		window.addEventListener('keydown', listenerHandler)
	}

	function renderCountOfOres() {
		let oreList = ''
		for (const ore in digger.storage) {
			if (digger.storage[ore] > 0) {
				oreList += `<div><div class="shop__element ${ore}"><span>${ore}: ${digger.storage[ore]}</span></div></div>`
				profit += profitList.find(el => el.name === ore).profit * digger.storage[ore]
			}
		}
		shop.querySelector('.shop__container').innerHTML = oreList
	}
}
