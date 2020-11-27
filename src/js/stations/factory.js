import {digger, listenerHandler} from '../movement'

class Recipe {
  constructor(name, title, time, input, output) {
    this.name = name;
    this.title = title
    this.time = time;
    this.input = input;
    this.output = output;
  }
}

Recipe.prototype.craft = function() {
  for(let ore in this.input) {
    if (digger.storage[ore] >= this.input[ore]){
    } else {
      return
    }
  }
  digger.reduceStorage(this.input)
  digger.addToStorage(this.output)

}

let recipes = []


const steelIngot = new Recipe('steelIngot', 'steel ingot', 45, {coal: 2, iron: 1}, {steelIngot: 1})
const copperIngot = new Recipe('copperIngot', 'copper ingot', 25, {coal: 1, copper: 1}, {copperIngot: 1})
const ironIngot = new Recipe('ironIngot', 'iron ingot', 20, {coal: 1, iron: 1}, {ironIngot: 1})
recipes.push(steelIngot)
recipes.push(copperIngot)
recipes.push(ironIngot)




export function showFactoryMenu() {
	renderRecipes(recipes)

	const factoryStation = document.querySelector('.factory-station')
	const cancelButton = factoryStation.querySelector('.factory__cancel')

	factoryStation.addEventListener('click', eventHandler)
	cancelButton.addEventListener('click', hideFactoryMenu)
	window.removeEventListener('keydown', listenerHandler)

	function eventHandler(ev) {
		if (ev.target.classList.contains('recipe-item')) {
			const recipeName = ev.target.classList[1]
      recipes.find(el => el.name === recipeName).craft()
		}
	}

	factoryStation.style.display = 'block'

	function hideFactoryMenu() {
		factoryStation.style.display = 'none'
		factoryStation.removeEventListener('click', eventHandler)
		window.addEventListener('keydown', listenerHandler)
		cancelButton.removeEventListener('click', hideFactoryMenu)
  }
  
  function renderRecipes() {
    const listElement = document.querySelector('.recipe-list')
    listElement.innerHTML = ''
  
    for(let i = 0; i < recipes.length; i++){
      let resources = ''
      for(let ore in recipes[i].input){
        resources += `${ore}: ${recipes[i].input[ore]}<br>`
      }
      listElement.innerHTML += `<div class="recipe-item ${recipes[i].name}"><span class="recipe-title">${recipes[i].title}</span><br><span>Resources: ${resources}</span></div>`
    }
  }
}
