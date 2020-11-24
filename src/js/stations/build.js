import factoryIcon from '@/img/factory_icon.png'
import {digger, listenerHandler} from '../movement'
import {renderMoney, renderBuildings, renderCargo} from '../render'
import {insertBuilding} from '../map-genertor'

export let buildings = [{
  id: 800,
  name: 'factory',
  title: "Build factory",
  location: 18,
  built: false,
	imageURL: factoryIcon,
  cost: 200,
  resources: {
    stone: 20,
    iron: 5
	},
	build() {
    if (digger.money >= this.cost &&
    digger.storage.stone >= this.resources.stone && 
    digger.storage.iron >= this.resources.iron) 
    {
      digger.decreaseMoney(this.cost)
      digger.reduceStorage(this.resources)
      renderMoney()
      this.built = true
      renderBuildings(this)
      renderCargo()
      // insertBuilding(this.id, this.location)
		}
	} 
}]

export function showBuildMenu() {
	renderBuildings(buildings)

	const buildStation = document.querySelector('.build-station')
	const cancelButton = buildStation.querySelector('.build__cancel')

	buildStation.addEventListener('click', eventHandler)
	cancelButton.addEventListener('click', hideBuildMenu)
	window.removeEventListener('keydown', listenerHandler)

	function eventHandler(ev) {
		if (ev.target.classList.contains('build-item')) {
			const buildName = ev.target.classList[1].split('-', 1)[0]
			buildings.find(el => el.name === buildName).build()
		}
	}

	buildStation.style.display = 'block'

	function hideBuildMenu() {
		buildStation.style.display = 'none'
		buildStation.removeEventListener('click', eventHandler)
		window.addEventListener('keydown', listenerHandler)
		cancelButton.removeEventListener('click', hideBuildMenu)
	}
}
