import {generateMap} from './map-genertor'
import {listenerHandler} from './movement'
import {saveGame} from './saving'
import './debug'
import '../scss/index.scss'



const menuBtn = document.querySelector('.open-menu')
const getParams = window
  .location
  .search
  .replace('?','')
  .split('&').reduce(
    function(p, e){
      const a = e.split('=')
      p[decodeURIComponent(a[0])] = decodeURIComponent(a[1])
      return p;
    },{}
  )

const loadNum = getParams['loadNum']


menuBtn.addEventListener('click', openMenu)

export function openMenu() {
	const menuSettingsBtn = document.querySelector('.settings-btn')
	const menuSaveBtn = document.querySelector('.save-btn')
	const menu = document.querySelector('.menu')
  const cancelButton = menu.querySelector('.menu__cancel')
  
  let timerId
  let confirmRewrite
  
	
  menu.style.display = 'block'

	cancelButton.addEventListener('click', hideMenu)
	menuSaveBtn .addEventListener('click', openSaveMenu)
	window.removeEventListener('keydown', listenerHandler)

  function hideMenu() {
    menu.style.display = 'none'
		cancelButton.removeEventListener('click', hideMenu)
		menuSaveBtn.removeEventListener('click', openSaveMenu)
		window.addEventListener('keydown', listenerHandler)
  }

  function openSaveMenu() {
    clearTimeout(timerId)

    const saving = document.querySelector('.saving')
    const cancelSaveButton = document.querySelector('.save__cancel')
    const info = saving.querySelector('.info')

    hideMenu()
    saving.style.display = 'block'
    saving.addEventListener('click', checkSaveSlot)
    cancelSaveButton.addEventListener('click', hideSaveMenu)
    window.removeEventListener('keydown', listenerHandler)
    
    function checkSaveSlot(ev) {
      const saveKey = ev.target.classList[1]

      if (ev.target.classList.contains('save') && isEmptySlot()) {
        saveGame(saveKey)
        info.innerHTML = `<span style="color: darkgreen;">Game has been saved in slot ${saveKey}</span>`
        timerId = setTimeout(() => {
          info.innerHTML = ''
        }, 5000)
      } else if (ev.target.classList.contains('save') && !isEmptySlot()){
        if (saveKey === confirmRewrite && confirmRewrite !== 'canceled') {
          confirmRewrite = undefined
          saveGame(saveKey)
          info.innerHTML = `<span style="color: darkgreen;">Save ${saveKey} has been rewritten</span>`
          timerId = setTimeout(() => {
            info.innerHTML = ''
          }, 5000)
        } else {
          info.innerHTML = '<span style="color: darkred;">Slot is not empty. Click again to rewrite.</span>'
          timerId = setTimeout(() => {
            info.innerHTML = ''
            if(confirmRewrite != undefined) {
              confirmRewrite = 'canceled'
            }
          }, 5000)

          confirmRewrite = saveKey
        }
      }
      function isEmptySlot() {
        if (localStorage.getItem(`${saveKey}_gameField`) && localStorage.getItem(`${saveKey}_digger`)) {          
          return false
        }
        return true
      }
    }

    function hideSaveMenu() {
      saving.style.display = 'none'
      saving.removeEventListener('click', checkSaveSlot)
      cancelSaveButton.removeEventListener('click', hideSaveMenu)
		  window.addEventListener('keydown', listenerHandler)

    } 
  }
}




// game.addEventListener('click', (ev) => {
// ev.target.classList.add('b1')
// })

generateMap(loadNum)
