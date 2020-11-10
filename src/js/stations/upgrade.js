const upgradeStation = document.querySelector('.upgrade-station')

export function showUpgradeMenu() {
	const cancelButton = upgradeStation.querySelector('.upgrade__cancel')
	upgradeStation.style.display = 'block'

	cancelButton.addEventListener('click', hideUpgradeMenu)

	function hideUpgradeMenu() {
		upgradeStation.style.display = 'none'
		cancelButton.removeEventListener('click', hideUpgradeMenu)
	}
}
