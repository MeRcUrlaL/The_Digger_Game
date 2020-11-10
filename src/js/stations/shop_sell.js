import {storageAmount, maxStorage, profit, clearStorage, clearProfit, storage} from '../digging'
import {renderMoney, renderStorage} from '../render'

export let money = 0

const shop = document.querySelector('.shop')

export function increaseMoney(value) {
	money += value
}

export function decreaseMoney(value) {
	money -= value
}

export function showShopMenu() {
	renderCountOfOres()
	shop.style.display = 'block'
	const cancelButton = shop.querySelector('.shop__cancel')
	const sellButton = shop.querySelector('.shop__sell')

	cancelButton.addEventListener('click', hideShopMenu)
	sellButton.addEventListener('click', sellOres)
	shop.querySelector('.shop__info').innerText = `Sell for: ${profit}$`
	
	function sellOres() {
		money += profit
		renderMoney(money)

		clearStorage()
		clearProfit()
		shop.querySelector('.shop__info').innerText = `Sell for: ${profit}$`
	
		renderStorage(storageAmount, maxStorage)
		hideShopMenu()
		clearCountOfOres()
	}
	
	function hideShopMenu() {
		shop.style.display = 'none'
		cancelButton.removeEventListener('click', hideShopMenu)
		sellButton.removeEventListener('click', sellOres)
	}

	function renderCountOfOres() {
		let oreList = ''
		for (const ore in storage) {
			if (storage[ore] > 0) {
				oreList += `<div><div class="shop__element ${ore}"><span>${ore}: ${storage[ore]}</span></div></div>`
			}
		}
		shop.querySelector('.shop__container').innerHTML = oreList
	}
	
	function clearCountOfOres() {
		for (const ore in storage) {
			if (storage[ore] > 0) {
				storage[ore] = 0
			}
		}
	}
}
