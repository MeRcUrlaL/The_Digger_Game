import {renderMoney, renderCargo} from '../render'
import {listenerHandler, digger} from '../movement'


const shop = document.querySelector('.shop')


export function showShopMenu() {
	renderCountOfOres()
	shop.style.display = 'block'
	const cancelButton = shop.querySelector('.shop__cancel')
	const sellButton = shop.querySelector('.shop__sell')

	cancelButton.addEventListener('click', hideShopMenu)
	sellButton.addEventListener('click', sellOres)
	shop.querySelector('.shop__info').innerText = `Sell for: ${digger.profit}$`
	
	function sellOres() {
		digger.increaseMoney(digger.profit)
		renderMoney()

		digger.clearCargo()
		digger.clearProfit()
		shop.querySelector('.shop__info').innerText = `Sell for: ${digger.profit}$`
	
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
			}
		}
		shop.querySelector('.shop__container').innerHTML = oreList
	}
}
