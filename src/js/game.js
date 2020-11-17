import {generateMap} from './map-genertor'
import {openMenu} from './render'
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


// game.addEventListener('click', (ev) => {
// ev.target.classList.add('b1')
// })

generateMap(loadNum)


