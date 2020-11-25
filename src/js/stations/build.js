import factoryIcon from '@/img/factory.png'
import {digger, listenerHandler} from '../movement'
import {renderMoney, renderBuildings, renderCargo, placeBuildings} from '../render'

export let buildings = [{
  id: 0,
  name: 'factory',
  title: "Build factory",
  location: 18,
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
			digger.buildings[this.name] = true
      renderMoney()
			renderBuildings(this)
			renderCargo()
			placeBuildings()
      // insertBuilding(this.id, this.location)
		}
	} 
},
{
  id: 1,
  name: 'sawmill',
  title: "Sawmill",
  location: 22,
	imageURL: factoryIcon,
  cost: 850,
  resources: {
    stone: 10,
		iron: 8,
		gold: 2
	},
	build() {
    if (digger.money >= this.cost &&
    digger.storage.stone >= this.resources.stone && 
		digger.storage.iron >= this.resources.iron &&
		digger.storage.gold >= this.resources.gold) 
    {
      digger.decreaseMoney(this.cost)
			digger.reduceStorage(this.resources)
			digger.buildings[this.name] = true
      renderMoney()
			renderBuildings(this)
			renderCargo()
			placeBuildings()
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
